import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from '@/components/HomePage'
import { LessonPage } from '@/components/lesson/LessonPage'

export default function App() {
  return (
    // Vite's base is '/' locally and '/<repo>/' on GitHub Pages; the router has to agree
    // or every in-app link 404s on the deployed site.
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/subject/:subject" element={<HomePage />} />
        <Route path="/lesson/:subject/:slug" element={<LessonPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}
