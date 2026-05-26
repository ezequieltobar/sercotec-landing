import { useNavigate } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import { motion } from 'framer-motion'

/**
 * ServiceCard — Componente reutilizable de tarjeta de servicio.
 * Props:
 *  - id          {number}  ID del servicio (se pasa al formulario de contacto)
 *  - title       {string}  Nombre del servicio
 *  - description {string}  Descripción breve
 *  - image       {string}  URL de imagen
 *  - category    {string}  Categoría badge
 */
export default function ServiceCard({ id, title, description, image, category }) {
  const navigate = useNavigate()

  const handleContact = () => {
    navigate(`/contacto?servicio=${encodeURIComponent(title)}`)
  }

  return (
    <motion.article
      className="card flex flex-col overflow-hidden group"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      aria-label={`Servicio: ${title}`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={`Imagen representativa del servicio ${title}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          width="600"
          height="400"
        />
        <span className="absolute top-3 left-3 bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        <h3 className="font-display text-xl font-bold text-primary-800 leading-tight">
          {title}
        </h3>
        <p className="text-neutral-600 text-sm leading-relaxed flex-1">
          {description}
        </p>

        {/* CTA Button — lleva al formulario de contacto con el campo servicio pre-rellenado */}
        <button
          onClick={handleContact}
          className="btn-primary mt-2 self-start text-sm focus:ring-2 focus:ring-primary-400"
          aria-label={`Contáctanos sobre el servicio ${title}`}
        >
          Contáctanos
          <FaArrowRight className="text-xs" aria-hidden="true" />
        </button>
      </div>
    </motion.article>
  )
}
