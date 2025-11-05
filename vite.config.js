// vite.config.js
import { defineConfig } from "vite";
import { resolve } from "path";
import { copyFileSync, mkdirSync, existsSync, readdirSync } from "fs";

function copyDataPlugin() {
  return {
    name: "copy-data-json",
    closeBundle() {
      const srcDir = resolve(__dirname, "src/data");
      const destDir = resolve(__dirname, "dist/data");

      if (!existsSync(destDir)) mkdirSync(destDir, { recursive: true });

      readdirSync(srcDir).forEach((file) => {
        if (file.endsWith(".json")) {
          copyFileSync(`${srcDir}/${file}`, `${destDir}/${file}`);
        }
      });

      console.log("✅ Archivos JSON copiados de src/components/data a dist/data");
    },
  };
}

export default defineConfig({
  base: "./", // importante para Vercel y rutas relativas
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        platoFuerte: resolve(__dirname, "plato-fuerte.html"),
        platoLiviano: resolve(__dirname, "plato-liviano.html"),
        desayunos: resolve(__dirname, "desayunos.html"),
        acompanantes: resolve(__dirname, "acompañantes.html"),
        Frias: resolve(__dirname, "Frias.html"),
        plantillasRecetas: resolve(__dirname, "plantillas_recetas.html"),
        calientes: resolve(__dirname, "calientes.html"),
        dulces: resolve(__dirname, "dulces.html"),
        salado: resolve(__dirname, "salado.html"),
        sorprendeme: resolve(__dirname, "sorpende.html"),
      },
    },
  },
  server: { port: 3000 },
  plugins: [copyDataPlugin()],
});
