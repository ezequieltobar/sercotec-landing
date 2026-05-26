import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * FAQAccordion — Componente de preguntas frecuentes accesible.
 * Usa roles ARIA: role="list", role="listitem", aria-expanded, aria-controls.
 */
export default function FAQAccordion({ faqs = [] }) {
  const [openId, setOpenId] = useState(null)

  const toggle = (id) => setOpenId(prev => prev === id ? null : id)

  return (
    <dl className="space-y-3" role="list">
      {faqs.map((faq) => {
        const isOpen   = openId === faq.id
        const panelId  = `faq-panel-${faq.id}`
        const buttonId = `faq-btn-${faq.id}`

        return (
          <div key={faq.id} className="border border-neutral-200 rounded-xl overflow-hidden" role="listitem">
            <dt>
              <button
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(faq.id)}
                className="w-full flex justify-between items-center px-6 py-4 text-left bg-white hover:bg-neutral-50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-400"
              >
                <span className="font-semibold text-primary-800 text-sm pr-4">{faq.question}</span>
                <FaChevronDown
                  aria-hidden="true"
                  className={`shrink-0 text-primary-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </dt>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.dd
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 pt-2 text-neutral-600 text-sm leading-relaxed border-t border-neutral-100 bg-white">
                    {faq.answer}
                  </p>
                </motion.dd>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </dl>
  )
}
