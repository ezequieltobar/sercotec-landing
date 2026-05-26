# Centro de Negocios Santiago — SERCOTEC · Landing Page

> Landing page desarrollada con **React + Vite + Tailwind CSS** como evaluación sumativa U3 — Desarrollo Frontend.

---

## 🚀 Inicio rápido

### Requisitos previos
> ⚠️ Este proyecto usa **pnpm** como gestor de paquetes. No usar npm ni yarn.
>
> Instalar pnpm: `npm install -g pnpm` o `corepack enable`
- Node.js ≥ 18
- npm ≥ 9

### Instalación

```bash
git clone https://github.com/<tu-usuario>/sercotec-landing.git
cd sercotec-landing
pnpm install
```

### Ejecutar en desarrollo (frontend + API mock)

```bash
pnpm dev
```

Esto inicia simultáneamente:
- **Vite dev server** → http://localhost:5173
- **JSON Server (API mock)** → http://localhost:3001

Para ejecutarlos por separado:
```bash
pnpm dev:front   # Solo Vite
pnpm api         # Solo JSON Server
```

### Build de producción

```bash
pnpm build
pnpm preview
```

---

## 🗂️ Estructura del proyecto

```
sercotec-landing/
├── public/
│   └── images/                  # Imágenes estáticas optimizadas
├── src/
│   ├── api/
│   │   └── apiClient.js         # Axios client + endpoints por recurso
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx       # Navegación principal responsive y accesible
│   │   │   └── Footer.jsx       # Pie de página
│   │   ├── sections/            # (reservado para secciones reutilizables)
│   │   └── ui/
│   │       ├── ServiceCard.jsx         # Tarjeta de servicio reutilizable
│   │       ├── TestimonialsCarousel.jsx # Carrusel Swiper accesible
│   │       ├── FAQAccordion.jsx        # Acordeón de preguntas frecuentes
│   │       └── ContactForm.jsx         # Formulario con validación Zod
│   ├── context/                 # (reservado para Context API global)
│   ├── data/                    # (reservado para datos estáticos)
│   ├── hooks/
│   │   └── useFetch.js          # Hook genérico para llamadas a la API
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── ServicesPage.jsx
│   │   ├── FAQPage.jsx
│   │   └── ContactPage.jsx
│   ├── utils/
│   │   └── sanitize.js          # Sanitización de inputs y honeypot
│   ├── App.jsx                  # Router principal
│   ├── index.css                # Estilos globales + Tailwind
│   └── main.jsx                 # Entry point
├── db.json                      # Mock API (JSON Server)
├── .env                         # Variables de entorno
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🧩 Uso de componentes

### `<ServiceCard />`

Tarjeta reutilizable que muestra un servicio. Al hacer clic en "Contáctanos", redirige al formulario de contacto con el campo `servicio` pre-rellenado.

```jsx
import ServiceCard from './components/ui/ServiceCard'

<ServiceCard
  id={1}
  title="Diagnóstico Empresarial"
  description="Evaluamos el estado actual de tu negocio..."
  image="https://url-de-imagen.jpg"
  category="Preventivo"
/>
```

**Props:**

| Prop          | Tipo     | Descripción                        |
|---------------|----------|------------------------------------|
| `id`          | number   | ID único del servicio              |
| `title`       | string   | Nombre del servicio                |
| `description` | string   | Descripción breve (max ~200 chars) |
| `image`       | string   | URL de imagen representativa       |
| `category`    | string   | Badge de categoría                 |

---

### `<TestimonialsCarousel />`

Carrusel de testimonios con Swiper. Responsive (1/2/3 slides) y accesible.

```jsx
import TestimonialsCarousel from './components/ui/TestimonialsCarousel'

<TestimonialsCarousel testimonials={[
  {
    id: 1,
    name: "María González",
    company: "Panadería Artesanal",
    role: "Propietaria",
    text: "Excelente servicio...",
    avatar: "https://url-avatar.jpg",
    rating: 5
  }
]} />
```

---

### `<ContactForm />`

Formulario con validación Zod, honeypot anti-bots y pre-fill desde URL.

```jsx
import ContactForm from './components/ui/ContactForm'

// Pre-fill automático si la URL contiene ?servicio=Marketing Digital
<ContactForm onSuccess={() => console.log('Enviado!')} />
```

---

### `useFetch(fetchFn, deps?)`

Hook genérico para consumir la API.

```jsx
import { useFetch } from '../hooks/useFetch'
import { servicesAPI } from '../api/apiClient'

const { data, loading, error } = useFetch(servicesAPI.getAll)
```

---

## 🔌 API Endpoints (JSON Server)

| Método | Endpoint         | Descripción              |
|--------|------------------|--------------------------|
| GET    | `/services`      | Lista de servicios        |
| GET    | `/services/:id`  | Servicio por ID           |
| GET    | `/testimonials`  | Lista de testimonios      |
| GET    | `/faqs`          | Preguntas frecuentes      |
| GET    | `/team`          | Miembros del equipo       |

---

## ♿ Accesibilidad (WCAG 2.1)

- Skip-to-content link visible al tabular
- Todos los elementos interactivos tienen `focus:ring`
- Imágenes con `alt` descriptivo
- Formulario con `aria-required`, `aria-invalid`, `aria-describedby`
- Carrusel con roles ARIA y mensajes de navegación
- Acordeón FAQ con `aria-expanded`, `aria-controls`
- Navbar con `aria-expanded` en botón móvil

---

## 🔒 Seguridad

- **Honeypot field** en formularios de contacto (detección de bots)
- **Validación client-side** con Zod (tipos, longitudes, formatos)
- **Sanitización** de entradas con `sanitize.js`
- **Headers de referrer** en iframes externos

---

## 👥 Equipo

Proyecto desarrollado individual para la asignatura **Desarrollo Frontend** del Instituto Profesional San Sebastián.

---

## 📄 Licencia

Uso académico — Instituto Profesional San Sebastián · 2026
