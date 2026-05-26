import { Link } from 'react-router-dom'
import { FaEnvelope, FaMapMarkerAlt, FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-primary-900 text-white" role="contentinfo">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-display font-bold text-lg">S</span>
            </div>
            <div>
              <p className="font-display font-bold text-white leading-none text-sm">Centro de Negocios</p>
              <p className="text-primary-300 text-xs font-semibold">SERCOTEC Santiago</p>
            </div>
          </div>
          <p className="text-primary-300 text-sm leading-relaxed">
            Apoyo integral para micro, pequeñas y medianas empresas. Gestión, innovación y crecimiento.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="https://www.facebook.com/centrodnsantiago" target="_blank" rel="noopener noreferrer"
               aria-label="Facebook" className="text-primary-400 hover:text-white transition-colors">
              <FaFacebook size={20} />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-primary-400 hover:text-white transition-colors">
              <FaLinkedin size={20} />
            </a>
            <a href="#" aria-label="Instagram" className="text-primary-400 hover:text-white transition-colors">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <nav aria-label="Navegación del pie de página">
          <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Secciones</h3>
          <ul className="space-y-2" role="list">
            {[['/', 'Inicio'], ['/nosotros', 'Nosotros'], ['/servicios', 'Servicios'], ['/faq', 'FAQ'], ['/contacto', 'Contacto']].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-primary-300 hover:text-white text-sm transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact info */}
        <address className="not-italic">
          <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contacto</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-primary-300 text-sm">
              <FaMapMarkerAlt className="mt-1 shrink-0 text-accent-400" aria-hidden="true" />
              <span>Manuel Rodríguez Sur 749, Santiago (Metro Toesca)</span>
            </li>
            <li className="flex items-center gap-2 text-primary-300 text-sm">
              <FaEnvelope className="shrink-0 text-accent-400" aria-hidden="true" />
              <a href="mailto:centro.santiago@centrossercotec.cl" className="hover:text-white transition-colors break-all">
                centro.santiago@centrossercotec.cl
              </a>
            </li>
          </ul>
        </address>
      </div>

      <div className="border-t border-primary-800 py-4 text-center">
        <p className="text-primary-500 text-xs">
          © {year} Centro de Negocios Santiago — SERCOTEC. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
