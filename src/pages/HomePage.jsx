import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowRight, FaCheckCircle, FaBuilding, FaUsers, FaTrophy } from 'react-icons/fa'
import { servicesAPI, testimonialsAPI } from '../api/apiClient'
import { useFetch } from '../hooks/useFetch'
import ServiceCard from '../components/ui/ServiceCard'
import TestimonialsCarousel from '../components/ui/TestimonialsCarousel'

const STATS = [
  { icon: FaBuilding, value: '+1.200', label: 'Empresas atendidas' },
  { icon: FaUsers,    value: '+50',    label: 'Expertos disponibles' },
  { icon: FaTrophy,   value: '15+',    label: 'Años de experiencia' },
]

const FEATURES = [
  'Diagnóstico gratuito inicial',
  'Asesoría personalizada',
  'Acceso a financiamiento',
  'Talleres especializados',
  'Red de networking',
  'Seguimiento continuo',
]

export default function HomePage() {
  const { data: services,     loading: loadSrv  } = useFetch(servicesAPI.getAll)
  const { data: testimonials, loading: loadTest } = useFetch(testimonialsAPI.getAll)

  return (
    <main id="main-content">
      {/* ── Hero ────────────────────────────────────── */}
      <section
        className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden"
        aria-label="Hero - Centro de Negocios Santiago"
      >
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-600/20 blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 -left-16 w-72 h-72 rounded-full bg-accent-500/10 blur-2xl" aria-hidden="true" />

        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
              SERCOTEC · Santiago
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Hacemos crecer <br/>
              <span className="text-accent-400">tu negocio</span>
            </h1>
            <p className="text-primary-200 text-lg leading-relaxed mb-8 max-w-lg">
              Somos el aliado estratégico de las MiPyMEs. Acompañamiento integral en gestión,
              innovación y acceso a financiamiento para que tu empresa alcance su máximo potencial.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contacto" className="btn-accent">
                Agenda una asesoría <FaArrowRight aria-hidden="true" />
              </Link>
              <Link to="/servicios" className="btn-secondary border-white text-white hover:bg-white/10">
                Ver servicios
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-4"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center md:text-left flex md:flex-row flex-col md:items-center gap-4">
                <div className="w-12 h-12 bg-accent-500/20 rounded-xl flex items-center justify-center shrink-0 mx-auto md:mx-0">
                  <Icon className="text-accent-400 text-xl" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-white">{value}</p>
                  <p className="text-primary-300 text-sm">{label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────── */}
      <section className="bg-neutral-50 py-16" aria-labelledby="features-heading">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 id="features-heading" className="section-title">¿Por qué elegirnos?</h2>
              <p className="section-subtitle mb-8">
                Llevamos más de 15 años apoyando el desarrollo de empresas en la Región Metropolitana.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list">
                {FEATURES.map(f => (
                  <li key={f} className="flex items-center gap-2 text-neutral-700 text-sm">
                    <FaCheckCircle className="text-primary-500 shrink-0" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/nosotros" className="btn-primary mt-8 self-start">
                Conoce más <FaArrowRight aria-hidden="true" />
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=700&q=80"
                alt="Equipo de profesionales de SERCOTEC asesorando a empresarios"
                className="rounded-2xl shadow-xl w-full object-cover h-80"
                loading="lazy"
                width="700"
                height="320"
              />
              <div className="absolute -bottom-4 -left-4 bg-primary-600 text-white rounded-xl p-4 shadow-lg hidden sm:block">
                <p className="font-display font-bold text-2xl">98%</p>
                <p className="text-primary-200 text-xs">Satisfacción</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services preview ────────────────────────── */}
      <section className="py-20" aria-labelledby="services-heading">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 id="services-heading" className="section-title">Nuestros servicios</h2>
            <p className="section-subtitle mx-auto">
              Un ecosistema completo de apoyo empresarial diseñado para impulsar el crecimiento de tu negocio.
            </p>
          </div>

          {loadSrv ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card h-72 animate-pulse bg-neutral-100" aria-hidden="true" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(services || []).slice(0, 6).map(s => <ServiceCard key={s.id} {...s} />)}
            </div>
          )}

          <div className="text-center mt-10">
            <Link to="/servicios" className="btn-secondary">
              Ver todos los servicios <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────── */}
      <section className="bg-neutral-50 py-20" aria-labelledby="testimonials-heading">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 id="testimonials-heading" className="section-title">Lo que dicen nuestros clientes</h2>
            <p className="section-subtitle mx-auto">
              Historias reales de empresas que transformaron su futuro con nuestro apoyo.
            </p>
          </div>
          {loadTest
            ? <div className="h-48 animate-pulse bg-neutral-200 rounded-xl" aria-label="Cargando testimonios..." />
            : <TestimonialsCarousel testimonials={testimonials || []} />
          }
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────── */}
      <section className="bg-primary-700 text-white py-16" aria-labelledby="cta-heading">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 id="cta-heading" className="font-display text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para hacer crecer tu negocio?
          </h2>
          <p className="text-primary-200 text-lg mb-8">
            Da el primer paso. Agenda una asesoría gratuita y descubre cómo podemos ayudarte.
          </p>
          <Link to="/contacto" className="btn-accent text-lg px-8 py-4">
            Agendar asesoría gratuita <FaArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  )
}
