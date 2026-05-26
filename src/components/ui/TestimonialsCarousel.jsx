import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, A11y } from 'swiper/modules'
import { FaStar, FaQuoteLeft } from 'react-icons/fa'
import 'swiper/css'
import 'swiper/css/pagination'

export default function TestimonialsCarousel({ testimonials = [] }) {
  if (!testimonials.length) return null

  return (
    <section aria-label="Testimonios de clientes" className="w-full">
      <Swiper
        modules={[Pagination, Autoplay, A11y]}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640:  { slidesPerView: 1 },
          768:  { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        a11y={{
          prevSlideMessage: 'Testimonio anterior',
          nextSlideMessage: 'Testimonio siguiente',
        }}
        watchOverflow={true}
        observer={true}
        observeParents={true}
        className="pb-12"
        role="list"
        aria-label="Lista de testimonios"
      >
        {testimonials.map((t) => (
          <SwiperSlide key={t.id} role="listitem" aria-label={`Testimonio de ${t.name}`}>
            <article className="card p-6 h-full flex flex-col gap-4 border border-neutral-100">
              <FaQuoteLeft className="text-primary-200 text-3xl" aria-hidden="true" />

              <div
                className="flex gap-1"
                role="img"
                aria-label={`Calificación: ${t.rating} de 5 estrellas`}
              >
                {Array.from({ length: t.rating }).map((_, i) => (
                  <FaStar key={i} className="text-accent-500 text-sm" aria-hidden="true" />
                ))}
              </div>

              <blockquote className="text-neutral-700 text-sm leading-relaxed flex-1 italic">
                "{t.text}"
              </blockquote>

              <footer className="flex items-center gap-3 pt-2 border-t border-neutral-100">
                <img
                  src={t.avatar}
                  alt={`Foto de ${t.name}`}
                  className="w-11 h-11 rounded-full object-cover"
                  loading="lazy"
                  width="44"
                  height="44"
                />
                <div>
                  <p className="font-semibold text-primary-800 text-sm">{t.name}</p>
                  <p className="text-neutral-500 text-xs">{t.role} — {t.company}</p>
                </div>
              </footer>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
