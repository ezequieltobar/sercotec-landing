import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FaBars, FaTimes, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

const NAV_LINKS = [
  { to: '/',          label: 'Inicio'   },
  { to: '/nosotros',  label: 'Nosotros' },
  { to: '/servicios', label: 'Servicios'},
  { to: '/faq',       label: 'FAQ'      },
  { to: '/contacto',  label: 'Contacto' },
]

export default function Navbar() {
  const [open,      setOpen]      = useState(false)
  const [scrolled,  setScrolled]  = useState(false)
  const location = useLocation()

  // Close menu on route change
  useEffect(() => { setOpen(false) }, [location])

  // Scroll effect
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header role="banner">
      {/* Top bar */}
      <div className="bg-primary-800 text-white text-xs py-2 hidden md:block">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <FaMapMarkerAlt aria-hidden="true" />
              Manuel Rodríguez Sur 749, Santiago (Metro Toesca)
            </span>
            <span className="flex items-center gap-1">
              <FaEnvelope aria-hidden="true" />
              <a href="mailto:centro.santiago@centrossercotec.cl" className="hover:text-accent-400 transition-colors">
                centro.santiago@centrossercotec.cl
              </a>
            </span>
          </div>
          <span className="text-primary-300">Centro de Negocios Santiago — SERCOTEC</span>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
        }`}
        role="navigation"
        aria-label="Navegación principal"
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-primary-400 rounded" aria-label="Centro de Negocios Santiago - Inicio">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-display font-bold text-lg">S</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-display font-bold text-primary-800 leading-none text-sm">Centro de Negocios</p>
              <p className="text-primary-500 text-xs font-semibold">SERCOTEC Santiago</p>
            </div>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-primary-700 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-400"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            {open ? <FaTimes size={20} aria-hidden="true" /> : <FaBars size={20} aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-80' : 'max-h-0'}`}
          aria-hidden={!open}
        >
          <ul className="px-4 pb-4 flex flex-col gap-1 bg-white border-t border-neutral-100" role="list">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}
