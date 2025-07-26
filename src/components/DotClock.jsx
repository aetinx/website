import styles from "./DotClock.module.css"
import { useEffect, useState, useRef } from "react"

const glyphImages = import.meta.glob("/src/assets/dot_font/*.svg", {
  eager: true
})

let cachedWeather = null

export default function DotClock() {
  const [timeParts, setTimeParts] = useState([])
  const [glyphs, setGlyphs] = useState([])
  const [weather, setWeather] = useState(cachedWeather)
  const [units, setUnits] = useState({})
  const containerRef = useRef(null)

  const mapping = {
    "\u0080": { n: "blank", w: 5, sc: 1 },
    0: { n: "0", w: 5, sc: 1 },
    1: { n: "1", w: 5, sc: 1 },
    2: { n: "2", w: 5, sc: 1 },
    3: { n: "3", w: 5, sc: 1 },
    4: { n: "4", w: 5, sc: 1 },
    5: { n: "5", w: 5, sc: 1 },
    6: { n: "6", w: 5, sc: 1 },
    7: { n: "7", w: 5, sc: 1 },
    8: { n: "8", w: 5, sc: 1 },
    9: { n: "9", w: 5, sc: 1 },
    E: { n: "E", w: 5 },
    T: { n: "T", w: 5 },
    " ": { n: "spacer", w: 1 },
    ":": { n: "colon", w: 1 },
    ".": { n: "period", w: 1 },
    "+": { n: "plus", w: 5 },
    "-": { n: "minus", w: 5 },
    "°C": { n: "celsius", w: 9, sc: 1 },
    "°F": { n: "fahrenheit", w: 9, sc: 1 },
    "°K": { n: "kelvin", w: 9, sc: 1 },
    "℃": { n: "celsius", w: 9, sc: 1 },
    "℉": { n: "fahrenheit", w: 9, sc: 1 },
    K: { n: "kelvin", w: 9, sc: 1 }
  }

  const textToMapping = (str, options) => {
    return [...str]
      .reduce(
        (r, _, i, a) => (
          i < a.length &&
            (mapping[a[i]] ? r.push(a[i]) : mapping[a[i] + a[i + 1]] && r.push(a[i] + a[++i])),
          r
        ),
        []
      )
      .map((x) => {
        return {
          g: mapping[x],
          o: options,
          q: x
        }
      })
  }

  const sum = (arr) => arr.reduce((a, c) => a + c, 0)

  const measure = (arr) => {
    let calc = {}
    calc.dotAmount = sum(arr.map((x) => x.g.w)) + arr.length - 1
    calc.gapAmount = calc.dotAmount - 1
    return calc
  }

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "America/New_York"
      }
      const formatter = new Intl.DateTimeFormat("en-US", options)
      const parts = formatter.formatToParts(now)

      const hour = parts.find((p) => p.type === "hour")?.value || "00"
      const minute = parts.find((p) => p.type === "minute")?.value || "00"
      const second = parts.find((p) => p.type === "second")?.value || "00"
      const millisecond = now.getMilliseconds().toString().substr(0, 2).padStart(2, "0")

      const degrees = weather?.current?.temperature_2m

      setGlyphs([
        ...textToMapping(`${hour}:${minute}:${second}`, { sc: 0 }),
        ...textToMapping(weather ? Math.round(degrees)?.toString().padStart(4, "\u0080") + "℃"
    : "\u0080\u0080\u0080\u0080℃", { sc: 0 })
      ])
    }

    updateClock()
    const interval = setInterval(updateClock, 100)
    return () => clearInterval(interval)
  }, [weather])

  useEffect(() => {
    if (!containerRef.current) return
    const updateWidth = () => {
      document.documentElement.style.setProperty(
        "--container-width",
        `${containerRef.current.offsetWidth}px`
      )
    }
    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => {
      window.removeEventListener("resize", updateWidth)
    }
  }, [])

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=44.7988&longitude=-68.7726&current=temperature_2m&forecast_days=1"
      ).then((res) => res.json())
      cachedWeather = data
      setWeather(data)
      return data
    }
    if (!cachedWeather) fetchWeather()
    const interval = setInterval(fetchWeather, 30 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setTimeParts(
      glyphs.map(x => {
        return {
          ... x,
          src: `/src/assets/dot_font/${x.g.sc && x.o.sc ? x.g.n + "_sc" : x.g.n}.svg`
        }
      })
    )
  }, [glyphs])

  useEffect(() => {
    if (containerRef.current) {
      const m = measure(glyphs)
      document.documentElement.style.setProperty(
        "--container-width",
        `${containerRef.current.offsetWidth}px`
      )
      setUnits(m)
    }
  }, [timeParts])

  return (
    <div className={styles.digitArray} ref={containerRef} style={{
      "--bg": `url("${glyphImages["/src/assets/dot_font/pattern.svg"].default.src}")`,
      "--dot-a": units?.dotAmount,
      "--gap-a": units?.gapAmount
    }}>
      {timeParts.map((part, idx) => (
        <img key={idx} className={styles.digit} src={glyphImages[part.src].default.src} alt={part.q} />
      ))}
    </div>
  )
}
