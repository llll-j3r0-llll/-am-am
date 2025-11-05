// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  base: "./", // necesario para que las rutas funcionen en Vercel
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: "index.html",
        platoFuerte: "plato-fuerte.html",
        platoLiviano: "plato-liviano.html",
        desayunos: "desayunos.html",
        acompanantes: "acompañantes.html", // usa sin ñ para evitar errores
        frias: "frias.html",
        calientes: "calientes.html",
        dulces: "dulces.html",
        salado: "salado.html",
        sorprendeme: "sorpende.html", // cambia el nombre también en el href
      },
    },
  },
  server: {
    port: 3000,
  },
});
