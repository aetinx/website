import { useRef, useState, useEffect, Children } from "react"
import styles from "./Carousel.module.css"

export default function Carousel({ images }) {
  const [isLoading, setIsLoading] = useState(true)
  const [at, setAt] = useState(0)
  const containerRef = useRef(null)
  const itemRefs = useRef([])
  const count = images.length
  
  // Swipe state
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const isDragging = useRef(false)

  useEffect(() => {
    setIsLoading(false)

    const observer = new IntersectionObserver(
      (entries) => {
        const activated = entries.reduce((max, entry) =>
          entry.intersectionRatio > max.intersectionRatio ? entry : max
        )
        if (activated?.isIntersecting) {
          const index = itemRefs.current.findIndex((ref) => ref === activated.target)
          if (index !== -1) setAt(index)
        }
      },
      {
        root: containerRef.current,
        threshold: 0.5
      }
    )

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

    // Swipe events
  useEffect(() => {
    const slider = containerRef.current
    if (!slider) return

    const handlePointerDown = (e) => {
      isDragging.current = true
      startX.current = e.pageX || e.touches?.[0]?.pageX
      scrollLeft.current = slider.scrollLeft
    }

    const handlePointerMove = (e) => {
      if (!isDragging.current) return
      const x = e.pageX || e.touches?.[0]?.pageX
      const walk = (startX.current - x)
      slider.scrollLeft = scrollLeft.current + walk
    }

    const handlePointerUp = () => {
      isDragging.current = false
    }

    slider.addEventListener("pointerdown", handlePointerDown)
    slider.addEventListener("pointermove", handlePointerMove)
    slider.addEventListener("pointerup", handlePointerUp)
    slider.addEventListener("pointerleave", handlePointerUp)

    // Touch support
    slider.addEventListener("touchstart", handlePointerDown)
    slider.addEventListener("touchmove", handlePointerMove)
    slider.addEventListener("touchend", handlePointerUp)

    return () => {
      slider.removeEventListener("pointerdown", handlePointerDown)
      slider.removeEventListener("pointermove", handlePointerMove)
      slider.removeEventListener("pointerup", handlePointerUp)
      slider.removeEventListener("pointerleave", handlePointerUp)
      slider.removeEventListener("touchstart", handlePointerDown)
      slider.removeEventListener("touchmove", handlePointerMove)
      slider.removeEventListener("touchend", handlePointerUp)
    }
  }, [])

  const stacked = (
    <div className={styles.stack} ref={containerRef}>
      {images.map((image, i) => (
        <div key={i} ref={(el) => (itemRefs.current[i] = el)} className={styles.itemWrapper}>
          <img className="aspect-16/9 object-cover h-full" src={image.default.src} />
        </div>
      ))}
    </div>
  )

  const markers = (
    <div className={styles.markerGroup} data-hover-effect>
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          className={`${styles.marker} ${i === at ? styles["marker--active"] : ""}`}
          data-click-sound="/honk/Navigation & Toggles/toggle a.wav"
          onClick={() => {
            itemRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "nearest" })
          }}
          aria-label={`Switch to image #${i}`}
        />
      ))}
    </div>
  )

  return (
    <div className={`${styles.main} carousel`}>
      {stacked}
      {count > 1 && <div className={styles.markersPositioner}>{markers}</div>}
    </div>
  )
}
