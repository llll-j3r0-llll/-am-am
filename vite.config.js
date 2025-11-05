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

      console.log("✅ Archivos JSON copiados a dist/data");
    },
  };
}

export default defineConfig({
  base: "./",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: "index.html",
        platoFuerte: "plato-fuerte.html",
        platoLiviano: "plato-liviano.html",
        desayunos: "desayunos.html",
        acompanantes: "acompañantes.html",
        frias: "Frias.html",
        plantillasRecetas: "plantillas_recetas.html",
        calientes: "calientes.html",
        dulces: "dulces.html",
        salado: "salado.html",
        sorprendeme: "sorpende.html",
      },
    },
  },
  server: { port: 3000 },
  plugins: [copyDataPlugin()], // 👈 Aquí agregas el plugin
});
