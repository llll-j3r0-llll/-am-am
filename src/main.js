// 🔹 Script para el menú lateral
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active"); // Abre o cierra el menú
});

// 🔹 Cierra el menú al hacer clic en una sección
const links = sidebar.querySelectorAll("a");
links.forEach(link => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("active");
  });
});
