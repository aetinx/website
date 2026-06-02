import { useRef, useState, useEffect } from "react"

export default function Carousel({ images }) {
  const [slide, setSlide] = useState(0)
  const containerRef = useRef(null)
  const itemRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const activated = entries.reduce((max, entry) => (entry.intersectionRatio > max.intersectionRatio ? entry : max))
        if (activated?.isIntersecting) {
          const index = itemRefs.current.findIndex(ref => ref === activated.target)
          if (index !== -1) setSlide(index)
        }
      },
      {
        root: containerRef.current,
        threshold: 0.5,
      },
    )

    itemRefs.current.forEach(el => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const slides = (
    <div
      ref={containerRef}
      className="bg-metal-100 aspect-video flex w-full overflow-x-scroll overflow-y snap-x snap-mandatory scrollbar-none select-none"
      tabIndex="-1"
    >
      {images.map((x, i) => {
        if (!x?.image) {
          console.error("Broken image:", {
            index: i,
            image: x,
          })

          return (
            <div key={i} className="aspect-video object-cover h-full snap-center">
              Missing image data {JSON.stringify(x)}
            </div>
          )
        }

        return (
          <img
            className="aspect-video object-cover h-full snap-center"
            srcSet={x.image.srcSet.attribute}
            sizes={`${[...x.image.rawOptions.widths].map(w => `(max-width: ${w}px) ${w}px`).join(", ")}, ${x.image.attributes.width}px`}
            src={x.image.src}
            alt={x.alt}
            key={i}
            ref={el => (itemRefs.current[i] = el)}
            fetchPriority={i < 1 ? "high" : "auto"}
          />
        )
      })}
    </div>
  )

  return (
    <div className="group/slides relative overflow-hidden">
      <button
        aria-label="Go to previous item."
        className={`absolute top-1/2 -translate-y-1/2 left-4 grid place-items-center h-8 w-8 rounded-full bg-black/50 border border-white/25 backdrop-blur-sm text-white invisible scale-50 opacity-0 transition-[scale,opacity,visibility] duration-200 ease-[--ease-0001] cursor-pointer ${slide > 0 && "group-hover/slides:visible group-hover/slides:scale-100 group-hover/slides:opacity-100"}`}
        data-click-sound="/honk/Navigation & Toggles/toggle minor b.wav"
        onClick={() => {
          itemRefs.current[slide - 1]?.scrollIntoView({ behavior: "smooth", block: "nearest" })
        }}
        tabIndex="-1"
      >
        <svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M29 16H3M14 27L3 16L14 5" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square" />
        </svg>
      </button>
      <button
        aria-label="Go to next item."
        className={`absolute top-1/2 -translate-y-1/2 right-4 grid place-items-center h-8 w-8 rounded-full bg-black/50 border border-white/25 backdrop-blur-sm text-white invisible scale-50 opacity-0 transition-[scale,opacity,visibility] duration-200 ease-[--ease-0001] cursor-pointer ${slide < images.length - 1 && "group-hover/slides:visible group-hover/slides:scale-100 group-hover/slides:opacity-100"}`}
        data-click-sound="/honk/Navigation & Toggles/toggle minor b.wav"
        onClick={() => {
          itemRefs.current[slide + 1]?.scrollIntoView({ behavior: "smooth", block: "nearest" })
        }}
        tabIndex="-1"
      >
        <svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 16H29M18 27L29 16L18 5" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square" />
        </svg>
      </button>
      {images.length > 1 && (
        <div className="max-md:hidden group/markers absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/50 border border-white/25 backdrop-blur-sm p-2 rounded-full hover:gap-3 hover:px-2.25 transition-[gap,padding] duration-200 ease-[--ease-1001]">
          {Array.from({ length: images.length }).map((_, i) => (
            <button
              key={i}
              className={`${i == slide ? "bg-white" : "bg-white/40"} h-2 aspect-square rounded-full group-hover/markers:scale-200 transition-[scale,background-color] duration-200 ease-[inherit] cursor-pointer`}
              data-click-sound="/honk/Navigation & Toggles/toggle minor b.wav"
              onClick={() => {
                itemRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "nearest" })
              }}
              aria-label={`Switch to image #${i + 1}`}
            />
          ))}
        </div>
      )}
      {images.length > 1 && (
        <ul className="md:hidden absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1 bg-black/50 border-white/25 p-1.5 rounded-t-lg">
          {Array.from({ length: images.length }).map((_, i) => (
            <li
              key={i}
              className={`${i == slide ? "bg-white" : "bg-white/40"} h-1.5 aspect-square rounded-full cursor-pointer`}
              data-click-sound="/honk/Navigation & Toggles/toggle minor b.wav"
              onClick={() => {
                itemRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "nearest" })
              }}
              aria-label={`Switch to image #${i + 1}`}
            />
          ))}
        </ul>
      )}
      {slides}
      <div className="pointer-events-none absolute inset-0 mix-blend-darken shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.4)]" />
    </div>
  )
}
