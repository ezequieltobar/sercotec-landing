import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useSearchParams } from 'react-router-dom'
import { FaPaperPlane, FaShieldAlt } from 'react-icons/fa'
import { HONEYPOT_FIELD } from '../../utils/sanitize'

// ─── Zod schema (client-side validation) ───────────────────────────────────
const schema = z.object({
  nombre:   z.string().min(2, 'Ingresa tu nombre (mínimo 2 caracteres)').max(100),
  email:    z.string().email('Ingresa un correo electrónico válido'),
  telefono: z.string().regex(/^\+?[\d\s\-()]{7,15}$/, 'Número de teléfono inválido').optional().or(z.literal('')),
  servicio: z.string().min(1, 'Selecciona un servicio').max(100),
  mensaje:  z.string().min(10, 'El mensaje debe tener al menos 10 caracteres').max(1000),
  // Honeypot — must be empty
  [HONEYPOT_FIELD]: z.string().max(0, 'Bot detectado'),
})

const SERVICES = [
  'Diagnóstico Empresarial',
  'Asesoría Financiera',
  'Marketing Digital',
  'Innovación y Procesos',
  'Talleres de Capacitación',
  'Vinculación Empresarial',
  'Otro',
]

/**
 * ContactForm — Formulario de contacto con:
 * - Validación client-side (Zod + React Hook Form)
 * - Honeypot anti-bots
 * - Pre-fill del campo "servicio" desde query param ?servicio=
 * - Accesibilidad completa (aria-describedby, aria-invalid, roles)
 */
export default function ContactForm({ onSuccess }) {
  const [searchParams] = useSearchParams()
  const serviceFromURL = searchParams.get('servicio') || ''
  const successRef = useRef(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { nombre: '', email: '', telefono: '', servicio: '', mensaje: '', [HONEYPOT_FIELD]: '' },
  })

  // Pre-fill servicio from URL param
  useEffect(() => {
    if (serviceFromURL) setValue('servicio', serviceFromURL)
  }, [serviceFromURL, setValue])

  const onSubmit = async (data) => {
    // Honeypot check
    if (data[HONEYPOT_FIELD]) return

    // Simulate API submission (replace with real endpoint)
    await new Promise(r => setTimeout(r, 1200))
    console.info('Form submitted:', { ...data, [HONEYPOT_FIELD]: '[REDACTED]' })
    reset()
    onSuccess?.()
    // Move focus to success message for screen readers
    setTimeout(() => successRef.current?.focus(), 100)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Formulario de contacto"
      className="space-y-5"
    >
      {/* Honeypot — hidden from real users */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
        <label htmlFor={HONEYPOT_FIELD}>No rellenar</label>
        <input id={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" {...register(HONEYPOT_FIELD)} />
      </div>

      {/* Row: Nombre + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nombre" className="form-label">
            Nombre completo <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <input
            id="nombre"
            type="text"
            autoComplete="name"
            aria-required="true"
            aria-invalid={!!errors.nombre}
            aria-describedby={errors.nombre ? 'nombre-error' : undefined}
            className={`form-input ${errors.nombre ? 'border-red-400' : ''}`}
            placeholder="Juan Pérez"
            {...register('nombre')}
          />
          {errors.nombre && <p id="nombre-error" role="alert" className="form-error">{errors.nombre.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="form-label">
            Correo electrónico <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={`form-input ${errors.email ? 'border-red-400' : ''}`}
            placeholder="juan@empresa.cl"
            {...register('email')}
          />
          {errors.email && <p id="email-error" role="alert" className="form-error">{errors.email.message}</p>}
        </div>
      </div>

      {/* Row: Teléfono + Servicio */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="telefono" className="form-label">Teléfono (opcional)</label>
          <input
            id="telefono"
            type="tel"
            autoComplete="tel"
            aria-invalid={!!errors.telefono}
            aria-describedby={errors.telefono ? 'telefono-error' : undefined}
            className={`form-input ${errors.telefono ? 'border-red-400' : ''}`}
            placeholder="+56 9 1234 5678"
            {...register('telefono')}
          />
          {errors.telefono && <p id="telefono-error" role="alert" className="form-error">{errors.telefono.message}</p>}
        </div>

        <div>
          <label htmlFor="servicio" className="form-label">
            Servicio de interés <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <select
            id="servicio"
            aria-required="true"
            aria-invalid={!!errors.servicio}
            aria-describedby={errors.servicio ? 'servicio-error' : undefined}
            className={`form-input ${errors.servicio ? 'border-red-400' : ''}`}
            {...register('servicio')}
          >
            <option value="">Selecciona un servicio...</option>
            {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.servicio && <p id="servicio-error" role="alert" className="form-error">{errors.servicio.message}</p>}
        </div>
      </div>

      {/* Mensaje */}
      <div>
        <label htmlFor="mensaje" className="form-label">
          Mensaje <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <textarea
          id="mensaje"
          rows={4}
          aria-required="true"
          aria-invalid={!!errors.mensaje}
          aria-describedby={errors.mensaje ? 'mensaje-error' : 'mensaje-hint'}
          className={`form-input resize-none ${errors.mensaje ? 'border-red-400' : ''}`}
          placeholder="Cuéntanos sobre tu empresa y lo que necesitas..."
          {...register('mensaje')}
        />
        <p id="mensaje-hint" className="text-xs text-neutral-400 mt-1">
          {watch('mensaje')?.length || 0}/1000 caracteres
        </p>
        {errors.mensaje && <p id="mensaje-error" role="alert" className="form-error">{errors.mensaje.message}</p>}
      </div>

      {/* Security notice */}
      <div className="flex items-center gap-2 text-xs text-neutral-500">
        <FaShieldAlt className="text-primary-400 shrink-0" aria-hidden="true" />
        <span>Tus datos están protegidos. No los compartiremos con terceros.</span>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
        aria-busy={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
            Enviando...
          </>
        ) : (
          <>
            <FaPaperPlane aria-hidden="true" />
            Enviar mensaje
          </>
        )}
      </button>

      {/* Success */}
      {isSubmitSuccessful && (
        <div
          ref={successRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800 text-sm text-center"
        >
          ✅ ¡Mensaje enviado con éxito! Te contactaremos a la brevedad.
        </div>
      )}
    </form>
  )
}
