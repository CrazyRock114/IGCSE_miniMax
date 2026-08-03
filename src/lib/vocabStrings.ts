/**
 * UI chrome strings for the vocabulary concept-card system.
 *
 * Course copy (term definitions, mechanisms) lives in the lesson files. This
 * file is for the buttons, status labels, empty-state messages, etc. — the
 * strings the renderer owns and the lesson author should not need to think
 * about.
 *
 * Same `no-Chinese-in-components` rule as `lessonExtrasStrings.ts`.
 */

import type { Bilingual } from '@/content/types'

export const VOCAB = {
  // Tab labels
  tabAll: { en: 'All terms', zh: '全部词条' } satisfies Bilingual,
  tabBank: { en: 'Word bank', zh: '生词本' } satisfies Bilingual,
  tabStudy: { en: 'Study', zh: '记忆' } satisfies Bilingual,
  tabGame: { en: 'Game', zh: '小游戏' } satisfies Bilingual,

  // Page title
  pageTitle: { en: 'Vocabulary', zh: '词汇与概念' } satisfies Bilingual,
  pageSummary: {
    en: 'Glossary terms across all lessons. Mark what you don\'t know, study what you flagged, and play a quick game with words you\'re still on.',
    zh: '所有课程的术语。标记不认识的，重点记忆，玩个小游戏巩固还在学的。',
  } satisfies Bilingual,

  // Concept card controls
  addToBank: { en: '+ Add to word bank', zh: '+ 加入生词本' } satisfies Bilingual,
  removeFromBank: { en: 'Remove', zh: '移除' } satisfies Bilingual,
  markKnown: { en: 'I know it', zh: '我认识' } satisfies Bilingual,
  markLearning: { en: 'Still learning', zh: '在学' } satisfies Bilingual,
  expand: { en: 'Show details', zh: '展开详情' } satisfies Bilingual,
  collapse: { en: 'Hide details', zh: '收起详情' } satisfies Bilingual,

  // Status
  statusNew: { en: 'New', zh: '新词' } satisfies Bilingual,
  statusLearning: { en: 'Learning', zh: '在学' } satisfies Bilingual,
  statusKnown: { en: 'Known', zh: '已掌握' } satisfies Bilingual,

  // From-lesson caption
  fromLesson: { en: 'From', zh: '来源' } satisfies Bilingual,

  // Concept card sections
  mechanismTitle: { en: 'How / Why', zh: '原理' } satisfies Bilingual,
  clinicalTitle: { en: 'Symptoms & signs', zh: '症状与表现' } satisfies Bilingual,

  // Word bank
  bankEmpty: {
    en: 'Your word bank is empty. Open any term below and click "+ Add to word bank" to start collecting words to review.',
    zh: '生词本是空的。打开下方任一词条，点"+ 加入生词本"开始收录要复习的词。',
  } satisfies Bilingual,
  bankNoneInGroup: { en: 'Nothing here yet.', zh: '这里还没有。' } satisfies Bilingual,
  reviewedPrefix: { en: 'reviewed', zh: '已复习' } satisfies Bilingual,

  // Study mode
  studyEmpty: {
    en: 'Nothing to study right now. Add some words to your bank and come back.',
    zh: '现在没东西可记。先去生词本加几个词再来。',
  } satisfies Bilingual,
  studyDone: { en: 'Session done', zh: '本轮完成' } satisfies Bilingual,
  studyAgain: { en: '↻ Study again', zh: '↻ 再来一轮' } satisfies Bilingual,
  studyRight: { en: 'right on first try', zh: '一次就过' } satisfies Bilingual,
  studyProgress: { en: 'Card', zh: '当前' } satisfies Bilingual,
  studyFlipHint: { en: 'Click to flip and see the answer', zh: '点击翻面看答案' } satisfies Bilingual,
  know: { en: 'Know it', zh: '认识' } satisfies Bilingual,
  unsure: { en: 'Unsure', zh: '模糊' } satisfies Bilingual,
  dontKnow: { en: 'Don\'t know', zh: '不认识' } satisfies Bilingual,

  // Game
  gameEmpty: {
    en: 'Add at least 2 words to your word bank to play the game.',
    zh: '至少加 2 个词到生词本才能开始游戏。',
  } satisfies Bilingual,
  gameScore: { en: 'Score', zh: '得分' } satisfies Bilingual,
  gameStreak: { en: 'Streak', zh: '连胜' } satisfies Bilingual,
  gamePrompt: { en: 'Pick the definition of', zh: '选出它的释义' } satisfies Bilingual,
  gameRight: { en: 'Right — next card', zh: '答对——下一题' } satisfies Bilingual,
  gameWrong: { en: 'Not quite — try again', zh: '不对——再来' } satisfies Bilingual,

  // Filters
  filterAll: { en: 'All subjects', zh: '全部学科' } satisfies Bilingual,
} as const
