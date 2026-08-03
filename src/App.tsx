import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from '@/components/HomePage'
import { LessonPage } from '@/components/lesson/LessonPage'
import { VocabPage } from '@/pages/VocabPage'
import { SelectionTranslator } from '@/components/translator/SelectionTranslator'

export default function App() {
  return (
    // Vite's base is '/' locally and '/<repo>/' on GitHub Pages; the router has to agree
    // or every in-app link 404s on the deployed site.
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/subject/:subject" element={<HomePage />} />
        <Route path="/lesson/:subject/:slug" element={<LessonPage />} />
        <Route path="/vocab" element={<VocabPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      {/* The translator is page-level chrome, not part of any route — it lives
       * here so it works on every page without each one opting in. */}
      <SelectionTranslator />
    </BrowserRouter>
  )
}
