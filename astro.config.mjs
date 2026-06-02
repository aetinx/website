// @ts-check
import { defineConfig, fontProviders } from "astro/config"

import tailwindcss from "@tailwindcss/vite"

import react from "@astrojs/react"

import sitemap from "@astrojs/sitemap"

// https://astro.build/config
export default defineConfig({
  site: "https://aetinx.dev",

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react(), sitemap()],

  devToolbar: {
    enabled: false,
  },

  fonts: [
    {
      provider: fontProviders.local(),
      name: "Instrument Sans",
      cssVariable: "--font-instrument-sans",
      options: {
        variants: [
          {
            src: [
              "./src/assets/fonts/InstrumentSans-VariableFont_wdth,wght.ttf",
              "./src/assets/fonts/InstrumentSans-Italic-VariableFont_wdth,wght.ttf",
            ]
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Commit Mono",
      cssVariable: "--font-commit-mono",
      options: {
        variants: [
          {
            src: [
              "./src/assets/fonts/CommitMono VariableFont.woff2",
              "./src/assets/fonts/CommitMono VariableFont.ttf",
            ]
          },
        ],
      },
    }
  ],
})
