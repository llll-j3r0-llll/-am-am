// src/components/menu.js
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const closeBtn = document.getElementById("close-btn");
  const sidebar = document.getElementById("sidebar");
  const submenuToggles = document.querySelectorAll(".submenu > .toggle");

  // Abrir sidebar
  menuBtn.addEventListener("click", () => {
    sidebar.classList.add("active");
  });

  // Cerrar sidebar
  closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("active");
  });

  // Abrir / cerrar submenús (varios al mismo tiempo)
  submenuToggles.forEach(toggle => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      // Solo alterna el actual, no cierra los demás
      toggle.parentElement.classList.toggle("open");
    });
  });
});
