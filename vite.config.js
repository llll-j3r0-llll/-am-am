// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3000,
    strictPort: true,
    allowedHosts: [
      'localhost',
      'e47c1ee6d55a.ngrok-free.app', // permite cualquier subdominio de ngrok
    ],
    hmr: {
      protocol: 'wss', // importante si usas ngrok HTTPS
    }
  }
})
