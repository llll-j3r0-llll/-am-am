function moverCarousel(id, direccion) {
  const carousel = document.getElementById(id);
  const track = carousel.querySelector(".carousel-track");
  const slides = track.querySelectorAll("img");
  const slideWidth = slides[0].clientWidth;

  // Guardar índice actual en dataset (si no existe lo inicializa en 0)
  let index = parseInt(track.dataset.index) || 0;

  // Actualizar índice
  index += direccion;

  // Control de límites (vuelve al inicio/fin como carrusel infinito)
  if (index < 0) {
    index = slides.length - 1;
  } else if (index >= slides.length) {
    index = 0;
  }

  // Guardar nuevo índice
  track.dataset.index = index;

  // Mover el track con transform
  track.style.transform = `translateX(-${index * slideWidth}px)`;
}
