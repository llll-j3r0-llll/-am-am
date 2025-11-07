// vite.config.js
import { defineConfig } from "vite";
import { resolve } from "path";
import { copyFileSync, mkdirSync, existsSync, readdirSync, cpSync } from "fs";

// 🔹 Plugin mejorado: copia JSON y JS automáticamente
function copyDataPlugin() {
  return {
    name: "copy-extra-files",
    closeBundle() {
      const foldersToCopy = [
        { src: "src/data", dest: "dist/data" },
        { src: "src/js", dest: "dist/js" }, // 👈 ahora también copia tu carpeta js
      ];

      foldersToCopy.forEach(({ src, dest }) => {
        const srcDir = resolve(__dirname, src);
        const destDir = resolve(__dirname, dest);

        if (!existsSync(srcDir)) {
          console.warn(`⚠️ Carpeta no encontrada: ${src}`);
          return;
        }

        mkdirSync(destDir, { recursive: true });
        cpSync(srcDir, destDir, { recursive: true }); // copia todo el contenido
        console.log(`✅ Carpeta copiada correctamente: ${src} → ${dest}`);
      });
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
