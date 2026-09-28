export const config = {
  runtime: 'edge',
}

interface QuestionPayload {
  stem: string
  options?: string[]
  answerIndex?: number
  markScheme?: Array<{ text: string; marks: number }>
  marks?: number
  commandWord?: string
  tier?: string
}

interface TutorRequestBody {
  mode?: 'explain' | 'mark'
  lang?: 'en' | 'zh'
  studentAnswer?: string
  question?: QuestionPayload
}

const SYSTEM_PROMPTS: Record<string, (lang: string) => string> = {
  explain: (lang) =>
    lang === 'zh'
      ? '你是一位 IGCSE 科学老师。学生会给你一道题和你已选/正确答案。请用简体中文简要讲解：为什么正确答案正确、常见错误选项错在哪（如有）。用 3-6 句话，可以用简短的要点。不要重复题目原文。'
      : 'You are an IGCSE science teacher. The student gives you a question plus the correct answer (and what they picked, if they did). Explain in 3-6 concise sentences, optionally with short bullet points: why the correct answer is right, and why tempting distractors are wrong. Do not restate the question.',
  mark: (lang) =>
    lang === 'zh'
      ? '你是一位 IGCSE 阅卷考官。学生给出了简答题答案，你手里有评分标准（mark scheme，每点 B1/B2…及分值）。请逐点批改：先给总得分（如 2/3），然后每个得分点一行——写明"得分"或"未得分"及原因。最后给一句最关键的改进建议。用简体中文。'
      : 'You are an IGCSE examiner. The student wrote a free-response answer; you have the mark scheme (B1/B2 points with marks). Mark it point by point: state the total first (e.g. 2/3), then one line per mark point — awarded or not, with a brief reason. End with the single most useful improvement tip.',
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  let body: TutorRequestBody
  try {
    body = (await req.json()) as TutorRequestBody
  } catch {
    return new Response('Bad JSON', { status: 400 })
  }

  const { mode = 'explain', lang = 'en', question, studentAnswer } = body
  if (!question?.stem) {
    return new Response('Missing question', { status: 422 })
  }

  const apiKey =
    process.env['TUTOR_API_KEY'] ||
    process.env['OPENAI_API_KEY'] ||
    process.env['DEEPSEEK_API_KEY'] ||
    process.env['COZE_API_KEY']

  let baseUrl =
    process.env['TUTOR_BASE_URL'] ||
    process.env['OPENAI_BASE_URL'] ||
    'https://api.openai.com/v1'

  // Strip trailing slashes
  baseUrl = baseUrl.replace(/\/+$/, '')

  const model =
    process.env['TUTOR_MODEL'] ||
    process.env['OPENAI_MODEL'] ||
    'gpt-4o-mini'

  const encoder = new TextEncoder()

  // Build prompts according to project contract
  const schemeLines = (question.markScheme ?? [])
    .map((mp, i) => `B${i + 1} (${mp.marks} mk): ${mp.text}`)
    .join('\n')
  const optionsLines = question.options
    ? question.options.map((o, i) => `  ${'ABCD'[i]}. ${o}`).join('\n')
    : null

  const userLines = [
    `Command word: ${question.commandWord ?? 'State'} · tier: ${question.tier ?? 'core'} · marks: ${question.marks ?? 1}`,
    `Question: ${question.stem}`,
    optionsLines ? `Options:\n${optionsLines}` : null,
    question.answerIndex !== undefined
      ? `Correct answer: ${'ABCD'[question.answerIndex]}. ${question.options?.[question.answerIndex] ?? ''}`
      : null,
    studentAnswer ? `Student's answer: ${studentAnswer}` : null,
    schemeLines ? `Mark scheme:\n${schemeLines}` : null,
    mode === 'mark'
      ? 'Mark the student answer against the scheme.'
      : 'Explain the answer to the student.',
  ].filter(Boolean)

  const systemPrompt =
    SYSTEM_PROMPTS[mode]?.(lang) ?? SYSTEM_PROMPTS['explain']!(lang)

  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj: { content?: string; error?: string }) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`))
      }

      if (!apiKey) {
        send({
          error:
            lang === 'zh'
              ? '服务端未配置 TUTOR_API_KEY 环境变量，请在 Vercel 中设置 TUTOR_API_KEY。'
              : 'TUTOR_API_KEY is not configured on the server. Please set TUTOR_API_KEY in Vercel.',
        })
        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        controller.close()
        return
      }

      try {
        const completionsUrl = baseUrl.endsWith('/chat/completions')
          ? baseUrl
          : `${baseUrl}/chat/completions`

        const response = await fetch(completionsUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model,
            stream: true,
            max_tokens: 800,
            temperature: 0.3,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userLines.join('\n') },
            ],
          }),
        })

        if (!response.ok || !response.body) {
          const errText = await response.text()
          send({
            error: `Upstream LLM error (${response.status}): ${errText.slice(0, 200)}`,
          })
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
          return
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() ?? ''

          for (const line of lines) {
            const trimmed = line.trim()
            if (!trimmed.startsWith('data:')) continue
            const rawData = trimmed.slice(5).trim()
            if (rawData === '[DONE]') continue
            try {
              const parsed = JSON.parse(rawData) as {
                choices?: Array<{ delta?: { content?: string } }>
              }
              const chunkText = parsed.choices?.[0]?.delta?.content
              if (chunkText) {
                send({ content: chunkText })
              }
            } catch {
              // Ignore partial JSON chunks
            }
          }
        }
      } catch (err) {
        send({
          error: err instanceof Error ? err.message : 'Tutor request failed',
        })
      } finally {
        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  })
}
