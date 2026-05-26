import { servicesAPI } from '../api/apiClient'
import { useFetch } from '../hooks/useFetch'
import ServiceCard from '../components/ui/ServiceCard'

export default function ServicesPage() {
  const { data: services, loading, error } = useFetch(servicesAPI.getAll)

  return (
    <main id="main-content" className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <header className="text-center mb-14">
          <h1 className="section-title">Nuestros Servicios</h1>
          <p className="section-subtitle mx-auto">
            Soluciones integrales para impulsar el crecimiento y la sostenibilidad de tu empresa.
          </p>
        </header>

        {/* Error state */}
        {error && (
          <div role="alert" className="text-center py-16 text-red-600">
            <p>No se pudieron cargar los servicios. Por favor intenta más tarde.</p>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            aria-label="Cargando servicios..."
            aria-busy="true"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card h-80 animate-pulse bg-neutral-100" aria-hidden="true" />
            ))}
          </div>
        )}

        {/* Content */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(services || []).map(s => <ServiceCard key={s.id} {...s} />)}
          </div>
        )}
      </div>
    </main>
  )
}
