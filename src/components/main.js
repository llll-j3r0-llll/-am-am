// Leer parámetros de la URL (?id= y ?seccion=)
const params = new URLSearchParams(window.location.search);
const recetaId = params.get("id");
const seccion = params.get("seccion"); // ejemplo: "desayunos", "dulces", etc.

// Ruta del JSON dinámico
const dataPath = `src/data/${seccion}.json`;

if (recetaId && seccion) {
  fetch(dataPath)
    .then(res => res.json())
    .then(data => {
      const receta = data[recetaId];

      if (!receta) {
        document.getElementById("titulo").textContent = "Receta no encontrada";
        return;
      }

      // 🔹 Título
      document.getElementById("titulo").textContent = receta.titulo;

      // 🔹 Imagen principal (si existe)
      const imgElement = document.getElementById("receta-img");
      if (receta.imagen) {
        imgElement.src = receta.imagen;
      } else {
        imgElement.style.display = "none"; // oculta si no hay
      }

      // 🔹 Info rápida
      document.getElementById("duracion").textContent = receta.duracion || "";
      document.getElementById("dificultad").textContent = receta.dificultad || "";

      // 🔹 Ingredientes
      const materialesList = document.getElementById("materiales");
      receta.materiales?.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        materialesList.appendChild(li);
      });

      // 🔹 Utensilios
      const utensiliosList = document.getElementById("receta-utensilios");
      receta.utensilios?.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        utensiliosList.appendChild(li);
      });

      // 🔹 Pasos (texto + imagen opcional en el mismo objeto)
      const pasosList = document.getElementById("receta-pasos");
      receta.pasos?.forEach((paso, index) => {
        const li = document.createElement("li");

        // Texto
        const pasoTexto = document.createElement("p");
        pasoTexto.textContent = `${index + 1}. ${paso.texto}`;
        li.appendChild(pasoTexto);

        // Imagen (si existe en el paso)
        if (paso.imagen) {
          const img = document.createElement("img");
          img.src = paso.imagen;
          img.alt = `Paso ${index + 1}`;
          img.classList.add("paso-img");
          li.appendChild(img);
        }

        pasosList.appendChild(li);
      });

    })
    .catch(err => {
      console.error("Error cargando JSON:", err);
      document.getElementById("titulo").textContent = "Error al cargar receta";
    });

} else {
  document.getElementById("titulo").textContent = "Receta no encontrada";
}
