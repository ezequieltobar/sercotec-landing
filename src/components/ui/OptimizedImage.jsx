import { useState } from 'react'

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
}) {
  const [loaded,  setLoaded]  = useState(false)
  const [errored, setErrored] = useState(false)

  const fallback = `https://placehold.co/${width}x${height}/e2e8f0/94a3b8?text=Imagen`

  return (
    <div className="relative overflow-hidden w-full h-full">
      {!loaded && !errored && (
        <div className="absolute inset-0 animate-pulse bg-neutral-200" aria-hidden="true" />
      )}
      <img
        src={errored ? fallback : src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      />
    </div>
  )
}