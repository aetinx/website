import { useRef, useState, useEffect, Children } from "react"
import styles from "./Carousel.module.css"

export default function Carousel({ images }) {
  const [isLoading, setIsLoading] = useState(true)
  const [at, setAt] = useState(0)
  const containerRef = useRef(null)
  const itemRefs = useRef([])
  const count = images.length

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

  const stacked = (
    <div className={styles.stack} ref={containerRef}>
      {images.map((image, i) => (
        <div key={i} ref={(el) => (itemRefs.current[i] = el)} className={styles.itemWrapper}>
          <img className="aspect-16/9 object-cover" src={image.default.src} />
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
