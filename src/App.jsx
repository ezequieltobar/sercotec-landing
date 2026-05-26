import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar   from './components/layout/Navbar'
import Footer   from './components/layout/Footer'
import HomePage      from './pages/HomePage'
import AboutPage     from './pages/AboutPage'
import ServicesPage  from './pages/ServicesPage'
import FAQPage       from './pages/FAQPage'
import ContactPage   from './pages/ContactPage'

function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100]
                 focus:bg-primary-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg
                 focus:font-semibold focus:shadow-lg"
    >
      Saltar al contenido principal
    </a>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <SkipLink />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/"           element={<HomePage />}     />
            <Route path="/nosotros"   element={<AboutPage />}    />
            <Route path="/servicios"  element={<ServicesPage />} />
            <Route path="/faq"        element={<FAQPage />}      />
            <Route path="/contacto"   element={<ContactPage />}  />
            <Route path="*" element={
              <main id="main-content" className="flex flex-col items-center justify-center min-h-[50vh] text-center px-6">
                <h1 className="font-display text-6xl font-bold text-primary-800 mb-4">404</h1>
                <p className="text-neutral-600 mb-6">La página que buscas no existe.</p>
                <a href="/" className="btn-primary">Volver al inicio</a>
              </main>
            } />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
