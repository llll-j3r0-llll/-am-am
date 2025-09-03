// Seleccionamos los elementos
const openMenuBtn = document.getElementById("openMenu");
const closeMenuBtn = document.getElementById("closeMenu");
const sidebar = document.getElementById("sidebar");

// Abrir menú
openMenuBtn.addEventListener("click", () => {
  sidebar.style.width = "250px";
});

// Cerrar menú
closeMenuBtn.addEventListener("click", () => {
  sidebar.style.width = "0";
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll(".sidebar a").forEach(link => {
  link.addEventListener("click", () => {
    sidebar.style.width = "0";
  });
});
