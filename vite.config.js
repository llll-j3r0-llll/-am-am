// vite.config.js
import { defineConfig } from "vite";
import { resolve } from "path";
import { copyFileSync, mkdirSync, existsSync, readdirSync } from "fs";

function copyExtraFilesPlugin() {
  return {
    name: "copy-json-and-template-js",
    closeBundle() {
      // === COPIAR JSONS DE src/data ===
      const srcDataDir = resolve(__dirname, "src/data");
      const destDataDir = resolve(__dirname, "dist/data");

      if (existsSync(srcDataDir)) {
        if (!existsSync(destDataDir)) mkdirSync(destDataDir, { recursive: true });

        readdirSync(srcDataDir).forEach((file) => {
          if (file.endsWith(".json")) {
            copyFileSync(`${srcDataDir}/${file}`, `${destDataDir}/${file}`);
            console.log(`📦 Copiado JSON: ${file}`);
          }
        });
      } else {
        console.error("❌ No se encontró la carpeta src/data");
      }

      // === COPIAR SOLO plantillas_recetas.js ===
      const srcJsFile = resolve(__dirname, "src/js/plantillas_recetas.js");
      const destJsDir = resolve(__dirname, "dist/js");

      if (existsSync(srcJsFile)) {
        if (!existsSync(destJsDir)) mkdirSync(destJsDir, { recursive: true });
        copyFileSync(srcJsFile, `${destJsDir}/plantillas_recetas.js`);
        console.log("📜 Copiado JS: plantillas_recetas.js");
      } else {
        console.error("❌ No se encontró src/js/plantillas_recetas.js");
      }

      console.log("✅ Archivos copiados correctamente a dist/");
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
  plugins: [copyExtraFilesPlugin()],
});
