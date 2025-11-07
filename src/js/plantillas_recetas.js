// plantillas_recetas.js

// Obtiene los parámetros de la URL
const params = new URLSearchParams(window.location.search);
const seccion = params.get("seccion"); // ejemplo: acompañantes
const id = params.get("id"); // ejemplo: miel-picante

// Verifica que existan los parámetros
if (!seccion || !id) {
  console.error("❌ Faltan parámetros en la URL.");
} else {
  cargarReceta(seccion, id);
}

// Función principal para cargar la receta
async function cargarReceta(seccion, id) {
  try {
    // Ruta del archivo JSON (funciona en Vercel porque apunta a dist/data/)
    const response = await fetch(`./data/${seccion}.json`);
    if (!response.ok) throw new Error("No se encontró el archivo JSON");

    const data = await response.json();
    const receta = data[id];

    if (!receta) throw new Error(`No se encontró la receta con id '${id}'`);

    // Inyecta la información en el HTML
    document.getElementById("titulo").textContent = receta.titulo;
    document.getElementById("receta-img").src = receta.imagen;
    document.getElementById("duracion").textContent = receta.duracion;
    document.getElementById("dificultad").textContent = receta.dificultad;

    // Lista de materiales
    const materialesUl = document.getElementById("materiales");
    materialesUl.innerHTML = "";
    receta.materiales.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      materialesUl.appendChild(li);
    });

    // Lista de utensilios
    const utensiliosUl = document.getElementById("receta-utensilios");
    utensiliosUl.innerHTML = "";
    receta.utensilios.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      utensiliosUl.appendChild(li);
    });

    // Pasos
    const pasosOl = document.getElementById("receta-pasos");
    pasosOl.innerHTML = "";
    receta.pasos.forEach((paso, i) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <p>${i + 1}. ${paso.texto}</p>
        ${paso.imagen ? `<img src="${paso.imagen}" alt="Paso ${i + 1}" class="paso-img">` : ""}
      `;
      pasosOl.appendChild(li);
    });

    console.log(`✅ Receta cargada: ${receta.titulo}`);
  } catch (error) {
    console.error("⚠️ Error al cargar la receta:", error);
  }
}
