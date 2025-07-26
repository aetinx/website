import * as Symbols from "@latapals/symbols"
import { useEffect, useRef, useState } from "react"
import wordmark from "/assets/brand/wordmark.svg?url"

export default function Nav() {
  const elementRef = useRef(null)

  useEffect(() => {
    console.log("nav mounted")
  }, [])
  console.log("nav rendered")

  useEffect(() => {
    const el = elementRef.current
    if (!el) return
    el.classList.add("ani")
    el.addEventListener("animationend", (e) => {
      console.log("nav animation end")
      el.classList.remove("ani")
    })
  }, [])

  const toggleRef = useRef(null)
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen(!open)
  const close = () => setOpen(false)

  return (
    <nav
      ref={elementRef}
      className={`${
        open && "fixed inset-0 p-8 gap-8 overscroll-none z-100"
      } bg-asphalt inset-0 flex flex-col select-none md:flex-row md:items-center md:bg-none md:gap-12 md:static md:z-0 md:p-0`}
    >
      <div className="flex items-center justify-between">
        <a href="/" aria-label="Aetinx">
          <img className="max-w-none" src={wordmark} alt="Aetinx" />
        </a>
        <a
          className="md:hidden"
          onClick={toggleOpen}
          ref={toggleRef}
          id="nav-toggle"
          href="#"
          rel="nofollow"
          aria-label="Toggle menu"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            overflow="visible"
          >
            <path
              className={`${open && "rotate-270"} origin-center duration-500`}
              style={{
                transformBox: "fill-box"
              }}
              d="M9 1V17"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="square"
            ></path>
            <path
              className={`${open && "rotate-180"} origin-center duration-500`}
              style={{
                transformBox: "fill-box"
              }}
              d="M1 9H17"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="square"
            ></path>
          </svg>
        </a>
      </div>
      <div
        className={`${
          open ? "" : "hidden"
        } flex flex-col flex-1 gap-4 text-[2em]/[1em] w-full text-white/50 md:flex md:text-[1em] md:flex-row md:justify-end md:gap-8`}
      >
        <a onClick={close} href="/">Home</a>
        <a onClick={close} href="/about">About</a>
        <a onClick={close} href="/resume" target="_blank">
          Resume
        </a>
      </div>
      <div
        className={`${
          open ? "" : "hidden"
        } flex items-center gap-6 text-white/50 text-[18px] md:flex`}
      >
        <a onClick={close} href="//x.com/aetinx" target="_blank" aria-label="X/Twitter profile">
          <Symbols.BrandXcorp />
        </a>
        <a onClick={close} href="//discord.com/invite/gzUwRBDQBp" target="_blank" aria-label="Discord server">
          <Symbols.BrandDiscord />
        </a>
        <a onClick={close} href="//github.com/aetinx" target="_blank" aria-label="GitHub profile">
          <Symbols.BrandGithub />
        </a>
      </div>
    </nav>
  )

  /*


  return (
    <nav
      ref={elementRef}
      className={`flex items-center gap-12 select-none`}
    >
      <a href="/">
        <img className="max-w-none" src="../src/assets/brand/wordmark.svg" />
      </a>
      <div className="flex gap-8 w-full justify-end text-white/50">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/resume" target="_blank">
          Resume
        </a>
      </div>
      <div className="flex items-center gap-6 text-white/50 text-[18px]">
        <a href="//x.com/aetinx" target="_blank">
          <Symbols.BrandXcorp />
        </a>
        <a href="//discord.com/invite/gzUwRBDQBp" target="_blank">
          <Symbols.BrandDiscord />
        </a>
        <a href="//github.com/aetinx" target="_blank">
          <Symbols.BrandGithub />
        </a>
      </div>
    </nav>
  )

  */
}
