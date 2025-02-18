"use client"

import { useEffect, useRef } from "react"

export default function InfiniteScrollClient({ logos }) {
  const containerRef = useRef(null)
  const ulRef = useRef(null)
  
  useEffect(() => {
    if (containerRef.current && ulRef.current) {
      const clone = ulRef.current.cloneNode(true)
      clone.setAttribute("aria-hidden", "true")
      containerRef.current.appendChild(clone)
    }
  }, [])

  return (
    <div ref={containerRef} id="logos-container" class="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
      <ul ref={ulRef} id="logos" class="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
      {logos.map((logo, index) => (
          <li><img key={index} src={logo.src} alt={logo.alt} /></li>
        ))}
      </ul>
    </div>
  )
}