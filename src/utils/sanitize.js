// Client-side sanitization utility
export function sanitizeInput(str) {
  if (typeof str !== 'string') return ''
  return str
    .trim()
    .replace(/[<>]/g, '')        // strip < >
    .replace(/javascript:/gi, '') // strip js protocol
    .slice(0, 500)                // max length
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Honeypot field name for bot protection
export const HONEYPOT_FIELD = 'website_url'
