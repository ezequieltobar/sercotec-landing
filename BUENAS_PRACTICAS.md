# Guía de Buenas Prácticas — Desarrollo Frontend con React

> Documento elaborado para el proyecto Centro de Negocios SERCOTEC Santiago.
> Cubre convenciones de nomenclatura, estructura de archivos, variables, accesibilidad y usabilidad.

---

## 1. Convenciones de nomenclatura

### 1.1 Archivos y carpetas

| Tipo                        | Convención          | Ejemplo                     |
|-----------------------------|---------------------|-----------------------------|
| Componente React            | PascalCase          | `ServiceCard.jsx`           |
| Hook personalizado          | camelCase con `use` | `useFetch.js`               |
| Página                      | PascalCase + Page   | `HomePage.jsx`              |
| Utilidad / helper           | camelCase           | `sanitize.js`               |
| Estilos globales            | kebab-case          | `index.css`                 |
| Constantes de configuración | UPPER_SNAKE_CASE    | `API_BASE_URL`              |
| Carpetas                    | kebab-case          | `components/ui/`            |

**Regla de oro:** el nombre del archivo debe coincidir con el nombre del componente o función principal que exporta.

### 1.2 Variables y funciones

```js
// ✅ Correcto
const userProfile = {}         // camelCase para variables
const MAX_RETRIES = 3          // UPPER_SNAKE_CASE para constantes
function fetchUserData() {}    // camelCase para funciones
const handleFormSubmit = () => {} // handleXxx para event handlers

// ❌ Incorrecto
const UserProfile = {}
const maxretries = 3
function FetchUserData() {}
```

### 1.3 Componentes y Props

```jsx
// ✅ Correcto — PascalCase para componentes, camelCase para props
function ServiceCard({ serviceTitle, onContactClick }) { ... }

// ✅ Props booleanas sin valor implican true
<ServiceCard isHighlighted />

// ❌ Evitar props genéricas
<Card data={...} />   // ¿qué es "data"?
<Card info={...} />   // ambiguo
```

---

## 2. Estructura de archivos

### 2.1 Organización recomendada

```
src/
├── api/           # Clientes HTTP y definición de endpoints
├── assets/        # Imágenes, fuentes y recursos estáticos
├── components/
│   ├── layout/    # Navbar, Footer, Sidebar (estructura de página)
│   ├── sections/  # Secciones completas de página (Hero, Features…)
│   └── ui/        # Componentes reutilizables pequeños (Button, Card…)
├── context/       # Providers de React Context
├── data/          # Datos estáticos (JSON, constantes)
├── hooks/         # Custom hooks reutilizables
├── pages/         # Vistas completas mapeadas a rutas
└── utils/         # Funciones puras de ayuda
```

### 2.2 Estructura interna de un componente

```jsx
// 1. Imports externos
import { useState } from 'react'
import { motion } from 'framer-motion'

// 2. Imports internos (en orden: hooks > utils > components)
import { useFetch } from '../../hooks/useFetch'
import { sanitizeInput } from '../../utils/sanitize'
import Button from './Button'

// 3. Constantes locales (fuera del componente)
const MAX_LENGTH = 200

// 4. Componente principal (siempre export default al final)
function ServiceCard({ title, description }) {
  // 4a. Hooks (siempre al inicio)
  const [expanded, setExpanded] = useState(false)

  // 4b. Variables derivadas
  const shortDesc = description.slice(0, MAX_LENGTH)

  // 4c. Handlers
  const handleToggle = () => setExpanded(prev => !prev)

  // 4d. JSX
  return (
    <article>
      <h3>{title}</h3>
      <p>{expanded ? description : shortDesc}</p>
      <button onClick={handleToggle}>
        {expanded ? 'Ver menos' : 'Ver más'}
      </button>
    </article>
  )
}

export default ServiceCard
```

---

## 3. Variables CSS y Tailwind

### 3.1 Usar el sistema de tokens de Tailwind

```js
// tailwind.config.js — definir tokens una sola vez
theme: {
  extend: {
    colors: {
      primary: { 600: '#0069af', 700: '#00548c' },
      accent:  { 500: '#e8950f' },
    }
  }
}
```

```jsx
// ✅ Usar clases semánticas
<button className="bg-primary-600 hover:bg-primary-700 text-white">...</button>

// ❌ Evitar valores hardcodeados
<button style={{ backgroundColor: '#0069af' }}>...</button>
```

### 3.2 Variables CSS para valores dinámicos

```css
/* index.css */
:root {
  --color-brand: theme('colors.primary.600');
  --radius-card: 1rem;
  --shadow-card: 0 4px 24px rgb(0 0 0 / 0.08);
}
```

### 3.3 Clases de componente con @layer

```css
@layer components {
  .btn-primary {
    @apply bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg
           hover:bg-primary-700 transition-colors focus:ring-2 focus:ring-primary-400;
  }
}
```

---

## 4. Accesibilidad (WCAG 2.1)

### 4.1 Estructura semántica HTML

```jsx
// ✅ Correcto — HTML semántico
<main id="main-content">
  <section aria-labelledby="services-heading">
    <h2 id="services-heading">Servicios</h2>
    <ul role="list">
      <li><article>...</article></li>
    </ul>
  </section>
</main>

// ❌ Evitar
<div id="content">
  <div class="section">
    <div class="title">Servicios</div>
  </div>
</div>
```

### 4.2 Imágenes

```jsx
// ✅ Alt descriptivo y contextual
<img src="team.jpg" alt="Equipo de asesores de SERCOTEC en reunión de trabajo" />

// ✅ Imágenes decorativas
<img src="pattern.png" alt="" aria-hidden="true" />

// ❌ Alt genérico
<img src="team.jpg" alt="imagen" />
```

### 4.3 Formularios

```jsx
// ✅ Siempre vincular label con input
<label htmlFor="email" className="form-label">
  Correo electrónico <span aria-hidden="true">*</span>
</label>
<input
  id="email"
  type="email"
  aria-required="true"
  aria-invalid={!!errors.email}
  aria-describedby="email-error"
/>
{errors.email && (
  <p id="email-error" role="alert" className="form-error">
    {errors.email.message}
  </p>
)}
```

### 4.4 Botones y enlaces

```jsx
// ✅ Siempre con propósito claro
<button aria-label="Cerrar modal de contacto">
  <FaTimes aria-hidden="true" />
</button>

// ✅ Estado de carga accesible
<button aria-busy={isLoading} disabled={isLoading}>
  {isLoading ? 'Enviando...' : 'Enviar'}
</button>
```

### 4.5 Foco visible

Nunca eliminar el outline de foco sin proporcionar un reemplazo visible:

```css
/* ✅ Reemplazar outline por ring personalizado */
.btn-primary:focus {
  outline: none;
  box-shadow: 0 0 0 3px theme('colors.primary.400');
}

/* ❌ Nunca hacer esto */
*:focus { outline: none; }
```

---

## 5. Usabilidad

### 5.1 Feedback inmediato

- Los botones deben indicar estado de carga (`aria-busy`, spinner visual).
- Los formularios deben mostrar errores inline, en tiempo real o al perder foco.
- Las acciones destructivas deben pedir confirmación.

### 5.2 Estados de los componentes

Siempre gestionar los tres estados:

```jsx
if (loading) return <Skeleton />
if (error)   return <ErrorMessage message={error} />
return <DataComponent data={data} />
```

### 5.3 Mensajes de error comprensibles

```
❌ "Error 422"
✅ "El correo electrónico ingresado no es válido. Ejemplo: usuario@empresa.cl"

❌ "Required"
✅ "Este campo es obligatorio"
```

### 5.4 Navegación predecible

- El menú activo debe indicarse visualmente (`aria-current="page"` + estilo activo).
- Los links externos deben abrirse en pestaña nueva con `target="_blank" rel="noopener noreferrer"`.
- Proveer un "skip link" para usuarios de teclado: `<a href="#main-content">Saltar al contenido`.

---

## 6. Rendimiento

### 6.1 Imágenes optimizadas

```jsx
// ✅ Siempre especificar width/height y lazy loading
<img
  src="hero.jpg"
  alt="..."
  width="1200"
  height="600"
  loading="lazy"
/>

// ✅ Comprimir imágenes antes de subirlas (objetivo: <200KB por imagen)
// Herramientas: squoosh.app, tinypng.com, imageoptim
```

### 6.2 Code splitting con React Router

```jsx
import { lazy, Suspense } from 'react'
const ServicesPage = lazy(() => import('./pages/ServicesPage'))

<Suspense fallback={<div>Cargando...</div>}>
  <ServicesPage />
</Suspense>
```

### 6.3 Evitar renders innecesarios

```jsx
// Usar useMemo para cálculos costosos
const sortedServices = useMemo(
  () => services.sort((a, b) => a.title.localeCompare(b.title)),
  [services]
)

// Usar useCallback para funciones pasadas como prop
const handleSubmit = useCallback((data) => { ... }, [dependency])
```

---

## 7. Seguridad en formularios

### 7.1 Honeypot anti-bots

Agregar un campo oculto para humanos pero visible para bots:

```jsx
<div style={{ position: 'absolute', left: '-9999px', opacity: 0 }}>
  <input name="website_url" tabIndex={-1} autoComplete="off" />
</div>
// Si este campo tiene valor al enviar: ignorar el formulario
```

### 7.2 Validación client-side con Zod

```js
const schema = z.object({
  email:   z.string().email('Correo inválido'),
  mensaje: z.string().min(10).max(1000),
})
```

### 7.3 Sanitización de inputs

Siempre sanitizar antes de procesar o mostrar datos del usuario:

```js
import { sanitizeInput } from '../utils/sanitize'
const cleanName = sanitizeInput(formData.nombre) // Elimina < > y JS
```

---

## 8. Control de versiones (Git)

### 8.1 Convención de commits (Conventional Commits)

```
feat: agregar componente ServiceCard
fix: corregir validación de email en ContactForm
style: ajustar espaciado en Navbar para móvil
refactor: extraer lógica de fetch a useFetch hook
docs: actualizar README con instrucciones de instalación
chore: actualizar dependencias
```

### 8.2 Flujo de ramas

```
main           → producción (solo merge desde develop)
develop        → integración
feature/xxx    → nueva funcionalidad (desde develop)
fix/xxx        → corrección de bug
```

### 8.3 Pull Requests

- Nombre descriptivo: `feat: implementar carrusel de testimonios`
- Descripción con: qué hace, por qué, cómo probar
- Al menos 1 revisión antes de hacer merge

---

*Documento elaborado para Evaluación Sumativa U3 — Desarrollo Frontend, Instituto Profesional San Sebastián.*
