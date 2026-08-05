# Supabase

Per-user state for the IGCSE Science site. The frontend has localStorage
backed stores for `word_bank` and `mistakes`; this directory adds a
server-side home for the same data, scoped per Supabase auth user via
Row Level Security.

## What lives here

- `migrations/0001_init.sql` — schema for `profiles`, `word_bank`,
  `mistakes`, `hook_ratings`. Run once in the Supabase SQL Editor.
- `migrations/0002_statement_progress.sql` — schema for
  `statement_progress` (per-user, per-syllabus-statement learning
  state — seen / attempts / wrong counts). Run after 0001.

## How to set up (one-time)

1. **Create the Supabase project** (free tier is plenty).
   - https://supabase.com → New project
   - Pick the closest region
   - Save the database password somewhere safe (you'll need it for the
     SQL editor but the app never sees it)

2. **Run the migrations in order.** Open the SQL Editor in the
   Supabase dashboard and paste the contents of each file in
   `migrations/` (0001, then 0002). Click "Run" after each. You
   should see 4 tables from 0001 and 1 table from 0002, plus RLS
   policies for all of them.

3. **Configure Auth.** Project Settings → Authentication:
   - Enable "Email" provider (default)
   - For local dev, disable "Confirm email" so you can sign in immediately
   - Set the Site URL to `http://localhost:5173` for dev, and the
     GitHub Pages URL for prod

4. **Get the keys** from Project Settings → API:
   - `Project URL` — looks like `https://abcdefg.supabase.co`
   - `anon public` key — the long `eyJ...` string
   - Do NOT copy the `service_role` key; the app never needs it

5. **Hand the URL + anon key to the agent** so it can wire the frontend.

## What the app does once wired

- `src/lib/supabaseClient.ts` — singleton client
- `src/lib/authTypes.ts` + `authStore.ts` — sign-up / sign-in / sign-out,
  current-user session
- `src/lib/mistakeStore.ts` and `src/lib/vocabStore.ts` — refactored
  to use Supabase when signed in, fall back to localStorage when not
- One-time **migration prompt**: on first sign-in, the app detects
  existing localStorage data, asks "Import your local data?", and if
  yes, bulk-inserts it into the user's Supabase tables

## Local dev env

```bash
# .env.local
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

`.env.local` is gitignored; the production build reads from GitHub
Actions secrets.

## What stays local-only

Some things are intentionally not moved to Supabase:
- Translator mode (zh hint / hover / inline) — pure UI preference
- The story-quality scores and the lesson-stories index — those are
  static data, not per-user

Anything that doesn't follow the student across devices stays in
localStorage. Only "the things I worked on" move to Supabase.
