document.addEventListener("DOMContentLoaded", async () => {
  // 1️⃣ Obtener parámetros del URL
  const params = new URLSearchParams(window.location.search);
  const seccion = params.get("seccion");
  const id = params.get("id");

  // Verificar que existan ambos parámetros
  if (!seccion || !id) {
    document.querySelector("#contenedor-receta").innerHTML =
      "<p>Error: Faltan parámetros en el enlace.</p>";
    return;
  }

  try {
    // 2️⃣ Cargar el archivo JSON según la sección
    // Importante: usar ruta relativa sin './' para que funcione en Vercel
    const response = await fetch(`data/${seccion}.json`);
    if (!response.ok) {
      throw new Error(`No se pudo cargar data/${seccion}.json`);
    }

    const data = await response.json();

    // 3️⃣ Buscar la receta por su ID
    const receta = data[id];

    // 4️⃣ Mostrar la receta o mensaje de error
    if (!receta) {
      document.querySelector("#contenedor-receta").innerHTML =
        "<p>Receta no encontrada 😢</p>";
      return;
    }

    // 5️⃣ Insertar los datos en el HTML
    document.querySelector("#titulo-receta").textContent = receta.titulo;
    document.querySelector("#dificultad").textContent = receta.dificultad;
    document.querySelector("#duracion").textContent = receta.duracion;
    document.querySelector("#descripcion").textContent = receta.descripcion || "";

    // Materiales e instrucciones (si existen)
    const materialesLista = document.querySelector("#materiales");
    const instruccionesLista = document.querySelector("#instrucciones");

    if (receta.materiales && materialesLista) {
      materialesLista.innerHTML = receta.materiales
        .map((item) => `<li>${item}</li>`)
        .join("");
    }

    if (receta.instrucciones && instruccionesLista) {
      instruccionesLista.innerHTML = receta.instrucciones
        .map((paso) => `<li>${paso}</li>`)
        .join("");
    }

    // Imagen (si existe)
    const imagen = document.querySelector("#imagen-receta");
    if (receta.imagen && imagen) {
      imagen.src = receta.imagen;
      imagen.alt = receta.titulo;
    }

  } catch (error) {
    console.error("Error cargando receta:", error);
    document.querySelector("#contenedor-receta").innerHTML =
      "<p>Ocurrió un error al cargar la receta 😔</p>";
  }
});
