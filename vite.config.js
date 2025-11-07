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

      if (!existsSync(srcDir)) {
        console.error("❌ No se encontró la carpeta src/data");
        return;
      }

      if (!existsSync(destDir)) mkdirSync(destDir, { recursive: true });

      readdirSync(srcDir).forEach((file) => {
        if (file.endsWith(".json")) {
          copyFileSync(`${srcDir}/${file}`, `${destDir}/${file}`);
        }
      });

      console.log("✅ Archivos JSON copiados correctamente a dist/data");
    },
  };
}

export default defineConfig({
  base: "./",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        platoFuerte: resolve(__dirname, "plato-fuerte.html"),
        platoLiviano: resolve(__dirname, "plato-liviano.html"),
        desayunos: resolve(__dirname, "desayunos.html"),
        acompanantes: resolve(__dirname, "acompañantes.html"),
        friasBebidas: resolve(__dirname, "frias_bebidas.html"),
        plantillasRecetas: resolve(__dirname, "plantillas_recetas.html"),
        calientes: resolve(__dirname, "calientes.html"),
        dulces: resolve(__dirname, "dulces.html"),
        salado: resolve(__dirname, "salado.html"),
        sorprende: resolve(__dirname, "sorprende.html"),
      },
    },
  },
  server: { port: 3000 },
  plugins: [copyDataPlugin()],
});
