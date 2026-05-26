import { motion } from 'framer-motion'
import { teamAPI } from '../api/apiClient'
import { useFetch } from '../hooks/useFetch'
import { FaLeaf, FaHandshake, FaRocket } from 'react-icons/fa'

const VALUES = [
  { icon: FaLeaf,      title: 'Sostenibilidad',  desc: 'Apoyamos modelos de negocio que equilibran crecimiento económico con responsabilidad social.' },
  { icon: FaHandshake, title: 'Compromiso',       desc: 'Nos involucramos de manera genuina con cada empresa para lograr resultados concretos.' },
  { icon: FaRocket,    title: 'Innovación',       desc: 'Fomentamos la adopción de nuevas tecnologías y metodologías para mantenerse competitivo.' },
]

export default function AboutPage() {
  const { data: team, loading } = useFetch(teamAPI.getAll)

  return (
    <main id="main-content">
      {/* Hero */}
      <section className="bg-primary-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h1
            className="font-display text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          >
            Quiénes Somos
          </motion.h1>
          <p className="text-primary-200 text-lg leading-relaxed max-w-2xl mx-auto">
            El Centro de Negocios Santiago de SERCOTEC es una institución pública dedicada a fortalecer
            el ecosistema empresarial de la región, con foco en la micro, pequeña y mediana empresa.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20" aria-labelledby="mission-heading">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 id="mission-heading" className="section-title">Nuestra Misión</h2>
            <p className="text-neutral-600 leading-relaxed mb-6">
              Garantizar el correcto funcionamiento, sostenibilidad y eficiencia de los negocios de
              nuestros clientes, mediante servicios integrales de acompañamiento, gestión e innovación.
            </p>
            <h2 className="section-title text-2xl">Nuestra Visión</h2>
            <p className="text-neutral-600 leading-relaxed">
              Ser el referente de apoyo empresarial en Chile, reconocidos por transformar positivamente
              la vida de miles de emprendedores y empresarios a través de soluciones de alto impacto.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&q=80"
            alt="Profesionales de SERCOTEC trabajando en equipo"
            className="rounded-2xl shadow-xl w-full object-cover h-80"
            loading="lazy"
            width="700"
            height="320"
          />
        </div>
      </section>

      {/* Values */}
      <section className="bg-neutral-50 py-16" aria-labelledby="values-heading">
        <div className="max-w-6xl mx-auto px-6">
          <h2 id="values-heading" className="section-title text-center mb-10">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-8 text-center">
                <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-primary-600 text-2xl" aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl font-bold text-primary-800 mb-2">{title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20" aria-labelledby="team-heading">
        <div className="max-w-6xl mx-auto px-6">
          <h2 id="team-heading" className="section-title text-center mb-10">Nuestro Equipo</h2>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="card h-56 animate-pulse bg-neutral-100" aria-hidden="true" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {(team || []).map(member => (
                <article key={member.id} className="card p-6 text-center">
                  <img
                    src={member.avatar}
                    alt={`Foto de ${member.name}`}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-primary-100"
                    loading="lazy"
                    width="80"
                    height="80"
                  />
                  <h3 className="font-display font-bold text-primary-800">{member.name}</h3>
                  <p className="text-primary-500 text-sm font-semibold mb-2">{member.role}</p>
                  <p className="text-neutral-600 text-xs leading-relaxed">{member.bio}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
