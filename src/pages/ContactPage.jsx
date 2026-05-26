import { useState } from 'react'
import { FaMapMarkerAlt, FaEnvelope, FaClock } from 'react-icons/fa'
import ContactForm from '../components/ui/ContactForm'

const INFO = [
  {
    icon: FaMapMarkerAlt,
    title: 'Dirección',
    lines: ['Manuel Rodríguez Sur 749', 'Santiago (Metro Toesca)'],
  },
  {
    icon: FaEnvelope,
    title: 'Correo',
    lines: ['centro.santiago@centrossercotec.cl'],
    link: 'mailto:centro.santiago@centrossercotec.cl',
  },
  {
    icon: FaClock,
    title: 'Horario de atención',
    lines: ['Lunes a Viernes', '09:00 – 18:00 hrs.'],
  },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <main id="main-content">
      {/* Header */}
      <section className="bg-primary-800 text-white py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Contáctanos</h1>
          <p className="text-primary-200 text-lg">
            Estamos aquí para ayudarte. Escríbenos y un asesor se pondrá en contacto contigo a la brevedad.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20" aria-labelledby="contact-heading">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-5 gap-12">
          {/* Info */}
          <aside className="md:col-span-2 space-y-6" aria-label="Información de contacto">
            <h2 id="contact-heading" className="section-title text-2xl">Información de contacto</h2>
            {INFO.map(({ icon: Icon, title, lines, link }) => (
              <div key={title} className="flex gap-4">
                <div className="w-11 h-11 bg-primary-50 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="text-primary-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-primary-800 text-sm">{title}</p>
                  {lines.map(l =>
                    link
                      ? <a key={l} href={link} className="text-neutral-600 text-sm hover:text-primary-600 transition-colors block break-all">{l}</a>
                      : <p key={l} className="text-neutral-600 text-sm">{l}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Map embed */}
            <div className="rounded-2xl overflow-hidden border border-neutral-200 h-48 mt-4">
              <iframe
                title="Mapa de ubicación del Centro de Negocios Santiago SERCOTEC"
                src="https://maps.google.com/maps?q=Manuel+Rodr%C3%ADguez+Sur+749+Santiago&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Mapa de ubicación"
              />
            </div>
          </aside>

          {/* Form */}
          <div className="md:col-span-3">
            <div className="card p-8">
              <h2 className="font-display text-2xl font-bold text-primary-800 mb-6">Envíanos un mensaje</h2>
              <ContactForm onSuccess={() => setSubmitted(true)} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
