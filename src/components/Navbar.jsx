import { useEffect, useRef, useState } from "react"
import Wordmark from "../assets/wordmark.svg?raw"

const links = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" }
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const menuRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    console.log("Navbar has been mounted")
  }, [])

  useEffect(() => {
    const handleClick = e => {
      if (!isOpen) return

      if (menuRef.current?.contains(e.target) || buttonRef.current?.contains(e.target)) {
        return
      }

      setIsOpen(false)
    }

    const handleKeyDown = e => {
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClick)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("mousedown", handleClick)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen)
    document.body.classList.toggle("relative", isOpen)
    document.body.classList.toggle("touch-none", isOpen)

    return () => {
      document.body.classList.remove("overflow-hidden", "relative", "touch-none")
    }
  }, [isOpen])

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <>
      <nav className="z-2 flex h-4 items-center justify-between text-metal-500">
        <a href="/" aria-label="Home" className="[&_svg]:h-3.5 [&_svg]:w-auto [&_path]:fill-current">
          <div dangerouslySetInnerHTML={{ __html: Wordmark }} />
        </a>

        <button ref={buttonRef} type="button" aria-expanded={isOpen} aria-label="Toggle navigation" onClick={() => setIsOpen(x => !x)} className="nav-toggle block md:hidden"></button>

        <ul className="flex items-center gap-8 text-xs leading-none font-bold tracking-widest uppercase max-md:hidden">
          {links.map(link => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={["z-1 fixed grid inset-0 top-20 place-items-center bg-white p-8 pt-0 pb-22 transition duration-200 ease md:hidden", isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"].join(" ")}>
        <ul ref={menuRef} className={["flex origin-[50%_100%] flex-col items-center justify-center gap-4 text-2xl transition duration-300 ease", isOpen ? "scale-100" : "scale-95"].join(" ")}>
          {links.map(link => (
            <li key={link.href}>
              <a href={link.href} {...(!isOpen && { tabIndex: -1 })} onClick={closeMenu}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
