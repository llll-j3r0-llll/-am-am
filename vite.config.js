// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  base: './', // 🔥 esto es crucial para que las rutas funcionen en producción (Vercel)
  build: {
    outDir: 'dist', // carpeta que Vercel va a servir
  },
  server: {
    port: 3000,
  },
})
