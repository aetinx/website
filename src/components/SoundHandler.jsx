import React, { useEffect, useRef } from "react"

const sounds = import.meta.glob("/src/assets/sfx/**/*.{wav,mp3}", {
  eager: true,
  import: "default"
})

export default function SoundHandler() {
  const audioCtx = useRef(null)
  const soundBufferCache = useRef(new Map())
  const defaultTapSoundBuffer = useRef(null)
  const carouselTapSoundBuffer = useRef(null)

  async function getSoundBuffer(url) {
    if (soundBufferCache.current.has(url)) {
      const cached = soundBufferCache.current.get(url)
      return cached instanceof Promise ? await cached : cached
    }

    const loadingPromise = fetch(url)
      .then((res) => res.arrayBuffer())
      .then((data) => audioCtx.current.decodeAudioData(data))

    soundBufferCache.current.set(url, loadingPromise)
    const buffer = await loadingPromise
    soundBufferCache.current.set(url, buffer)
    return buffer
  }

  function playBuffer(buffer) {
    if (audioCtx.current.state === "suspended") audioCtx.current.resume()
    const source = audioCtx.current.createBufferSource()
    const gain = audioCtx.current.createGain()
    gain.gain.value = 2
    gain.connect(audioCtx.current.destination)
    source.buffer = buffer
    source.connect(gain)
    source.start(0)
  }

  useEffect(() => {
    audioCtx.current = new window.AudioContext()

    async function setup() {
      defaultTapSoundBuffer.current = await getSoundBuffer(
        sounds["/src/assets/sfx/honk/Navigation & Toggles/ui general click.wav"]
      )
      carouselTapSoundBuffer.current = await getSoundBuffer(
        sounds["/src/assets/sfx/honk/Navigation & Toggles/toggle a.wav"]
      )
    }
    setup()

    async function onClick(event) {
      const target = event.target.closest(
        `a:not([disabled]), button:not([disabled]), [role="button"]`
      )
      if (!target) return

      const soundPath = target.getAttribute("data-click-sound")
      const soundUrl = soundPath ? sounds["/src/assets/sfx" + soundPath] : null

      const buffer = soundUrl ? await getSoundBuffer(soundUrl) : defaultTapSoundBuffer.current
      if (buffer) playBuffer(buffer)
    }

    document.addEventListener("click", onClick)

    return () => {
      document.removeEventListener("click", onClick)
      if (audioCtx.current) audioCtx.current.close()
    }
  }, [])

  return
}
