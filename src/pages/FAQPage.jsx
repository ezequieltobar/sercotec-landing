import { faqsAPI } from '../api/apiClient'
import { useFetch } from '../hooks/useFetch'
import FAQAccordion from '../components/ui/FAQAccordion'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

export default function FAQPage() {
  const { data: faqs, loading, error } = useFetch(faqsAPI.getAll)

  return (
    <main id="main-content">
      {/* Header */}
      <section className="bg-primary-800 text-white py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Preguntas Frecuentes</h1>
          <p className="text-primary-200 text-lg">
            Resolvemos tus dudas sobre nuestros servicios, procesos y requisitos para acceder a nuestro apoyo.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto px-6">
          <h2 id="faq-heading" className="sr-only">Lista de preguntas frecuentes</h2>

          {loading && (
            <div className="space-y-3" aria-label="Cargando preguntas..." aria-busy="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-16 animate-pulse bg-neutral-100 rounded-xl" aria-hidden="true" />
              ))}
            </div>
          )}

          {error && (
            <p role="alert" className="text-center text-red-600 py-8">
              No se pudieron cargar las preguntas. Intenta más tarde.
            </p>
          )}

          {!loading && !error && <FAQAccordion faqs={faqs || []} />}

          {/* CTA */}
          <div className="mt-12 bg-primary-50 rounded-2xl p-8 text-center border border-primary-100">
            <h3 className="font-display text-xl font-bold text-primary-800 mb-2">
              ¿No encontraste lo que buscabas?
            </h3>
            <p className="text-neutral-600 text-sm mb-6">
              Nuestro equipo está disponible para resolver todas tus dudas de manera personalizada.
            </p>
            <Link to="/contacto" className="btn-primary">
              Contáctanos <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
