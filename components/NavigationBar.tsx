"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import styles from "./NavigationBar.module.css"
import * as Symbols from "@latapals/symbols"

export default function NavigationBar() {
  const toggleBtnRef = useRef(null)

  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen(!open)
  }

  const close = () => {
    setOpen(false)
  }

  return (<nav className={styles.nav + (open ? " open" : "")}>
    <div id="nav-main">
      <Link onClick={close}href="/">
      <svg className={styles.logo} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 0H8.5L12 5L10.5 10.5L5 12L0 8.5V4H4V0Z"/>
        <path d="M0 20V15.5L5 12L10.5 13.5L12 19L8.5 24H4V20H0Z"/>
        <path d="M20 24H15.5L12 19L13.5 13.5L19 12L24 15.5V20H20V24Z"/>
        <path d="M24 4V8.5L19 12L13.5 10.5L12 5L15.5 0H20V4H24Z"/>
      </svg>
    </Link>
      <a onClick={toggleOpen} ref={toggleBtnRef} id="nav-toggle" href="#" rel="nofollow" aria-label="Toggle menu">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" overflow="visible">
          <path d="M9 1V17" stroke="white" stroke-width="2" stroke-linecap="square"></path>
          <path d="M1 9H17" stroke="white" stroke-width="2" stroke-linecap="square"></path>
        </svg>
      </a>
    </div>
    <div id="nav-links" className={styles.list}>
      <Link onClick={close} href="/about">About</Link>
      <Link onClick={close} href="//read.cv/aetinx" target="_blank">Resume</Link>
      <Link onClick={close} href="//vgen.co/aetinx" target="_blank">Services</Link>
    </div>
    <div id="nav-socials" className={styles.socials}>
      <Link onClick={close} href="//x.com/aetinx" target="_blank"  aria-label="X">
        <Symbols.BrandXcorp className={styles.symbol}/>
      </Link>
      <Link onClick={close} href="//discord.com/invite/gzUwRBDQBp" target="_blank"  aria-label="Discord">
        <Symbols.BrandDiscord className={styles.symbol}/>
      </Link>
      <Link onClick={close} href="//bsky.app/profile/aetinx.dev" target="_blank"  aria-label="Bluesky">
        <Symbols.BrandBluesky className={styles.symbol}/>
      </Link>
      <Link onClick={close} href="//github.com/aetinx" target="_blank"  aria-label="GitHub">
        <Symbols.BrandGithub className={styles.symbol}/>
      </Link>
    </div>
  </nav>)
}