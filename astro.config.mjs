import { defineConfig } from "astro/config"
import { fileURLToPath, URL } from "node:url"
import tailwindcss from "@tailwindcss/vite"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"

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
    }),
    sitemap()
  ],
  server: {
    allowedHosts: true
  }
})
