import { defineConfig } from "astro/config"
import { fileURLToPath, URL } from "node:url"
import tailwindcss from "@tailwindcss/vite"

import react from "@astrojs/react"

export default defineConfig({
  site: "https://aetinx.dev",
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@assets": fileURLToPath(new URL("./src/assets", import.meta.url))
      }
    }
  },
  integrations: [
    react({
      experimentalReactChildren: true
    })
  ],
  server: {
    allowedHosts: true
  }
})
