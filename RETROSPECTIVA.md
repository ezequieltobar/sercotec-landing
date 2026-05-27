# Acta de Retrospectiva — Sprint 1
## Proyecto: Landing Page Centro de Negocios SERCOTEC Santiago
**Fecha:** Mayo 2026   
**Metodología:** Start / Stop / Continue  

---

## 1. Participantes

| Nombre | Rol |
|--------|-----|
| Ezequiel Tobar | Desarrollador Frontend |

---

## 2. Resumen del Sprint

Durante este sprint se desarrolló la landing page completa para el Centro de Negocios Santiago de SERCOTEC, utilizando React + Vite + Tailwind CSS. Se implementaron 11 funcionalidades principales incluyendo componentes reutilizables, integración con API, accesibilidad WCAG 2.1 y optimización de rendimiento.

---

## 3. ¿Qué salió bien? (Continue)

- **Componentización efectiva:** La separación en componentes reutilizables (`ServiceCard`, `TestimonialsCarousel`, `ContactForm`) facilitó el desarrollo paralelo y redujo la duplicación de código.
- **Uso de pnpm:** La migración de npm a pnpm mejoró la velocidad de instalación y la seguridad de las dependencias.
- **Git Flow:** El uso de ramas por funcionalidad (`feature/service-card`, `feature/contact-form`, etc.) mantuvo el código organizado y facilitó las revisiones.
- **Tailwind CSS:** El sistema de design tokens centralizado en `tailwind.config.js` aseguró consistencia visual en toda la aplicación.
- **Accesibilidad:** La implementación de roles ARIA, skip links y manejo de foco desde el inicio evitó refactorizaciones costosas al final.

---

## 4. ¿Qué no funcionó? (Stop)

- **Swiper sin observer:** Inicialmente se configuró Swiper sin `observer` y `observeParents`, lo que causó inconsistencias de tamaño en distintas resoluciones. Costó varias iteraciones encontrar la causa raíz.
- **Code splitting con manualChunks:** Se intentó configurar `manualChunks` en Vite 8 pero no es compatible con rolldown. Hay que investigar la API correcta antes de implementar.
- **Commits tardíos:** Algunos cambios se acumularon antes de hacer commit, dificultando el seguimiento de cambios específicos.

---

## 5. ¿Qué mejorar? (Start)

- **Testing:** Incorporar tests unitarios con Vitest para componentes críticos como `ContactForm` y `ServiceCard`.
- **Storybook:** Documentar los componentes UI visualmente para facilitar su uso por otros desarrolladores del equipo.
- **Variables de entorno por ambiente:** Separar `.env.development` y `.env.production` para gestionar mejor las URLs de la API.
- **CI/CD:** Configurar GitHub Actions para ejecutar el build automáticamente en cada push a `main`.

---

## 6. Plan de acción — Próxima iteración

| Acción | Responsable | Prioridad | Plazo |
|--------|-------------|-----------|-------|
| Agregar tests unitarios con Vitest | Ezequiel Tobar | Alta | Sprint 2 |
| Configurar GitHub Actions para CI | Ezequiel Tobar | Alta | Sprint 2 |
| Implementar Storybook para componentes UI | Ezequiel Tobar | Media | Sprint 2 |
| Separar variables de entorno por ambiente | Ezequiel Tobar | Media | Sprint 2 |
| Optimizar bundle size con lazy loading avanzado | Ezequiel Tobar | Baja | Sprint 3 |
| Agregar PWA support (service worker) | Ezequiel Tobar | Baja | Sprint 3 |

---

## 7. Métricas del Sprint

| Métrica | Valor |
|---------|-------|
| Puntos completados | 11/11 |
| Componentes creados | 8 |
| Páginas implementadas | 5 |
| Commits realizados | 8 |
| Ramas de feature | 4 |
| Cobertura de accesibilidad | WCAG 2.1 AA |

---

## 8. Acuerdos

1. Incorporar `observer` y `observeParents` como configuración estándar en todos los usos futuros de Swiper.
2. Hacer commits pequeños y frecuentes siguiendo Conventional Commits.
3. Revisar compatibilidad de plugins de Vite antes de implementar optimizaciones de build.
4. Agregar tests antes de hacer merge a `main` en el próximo sprint.

---

*Documento generado como parte de la Evaluación Sumativa U3 — Desarrollo Frontend, Instituto Profesional San Sebastián.*