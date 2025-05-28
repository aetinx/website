import Script from "next/script"
import "./globals.css"
import NavigationBar from "@components/NavigationBar"
import type { Viewport } from "next"

export const metadata = {
  openGraph: {
    title: "Aetinx",
    description: "I’m an interdisciplinary designer with a passion to make computing friendlier and more enjoyable for everyone.",
    siteName: "Aetinx",
    url: "https://aetinx.dev"
  },
  title: {
    template: "%s | Aetinx",
    default: "Aetinx"
  },
  description: "I’m an interdisciplinary designer with a passion to make computing friendlier and more enjoyable for everyone.",
  generator: "Next.js",
  creator: "Aetinx"
}
 
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
  
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aetinx.dev" />
        <meta property="og:image" content="https://aetinx.dev/og.png" />
        
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://aetinx.dev" />
        <meta property="twitter:image" content="https://aetinx.dev/og.png" />
        
        <link rel="preload" as="style" href="/style.css" />
        <link rel="stylesheet" href="/style.css" />
        <link rel="icon" type="image/svg+xml" href="/brand/logo.svg"/>
      </head>
      <body>
        <div id="alert-0"><div id="alert-1">
          <div id="alert-2">
            <div>Site is still in development &mdash; sorry for any bugs!</div>
          </div>
        </div></div>
        <div id="body">
          <NavigationBar/>
          <Script src="/scripts/main.js" type="module" />
          <div>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}