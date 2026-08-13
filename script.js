document.addEventListener('DOMContentLoaded', () => {

  // --- LÓGICA DEL CARRUSEL DINÁMICO ---
  const track = document.getElementById('carouselTrack');
  const slides = Array.from(track.children);
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nav = document.getElementById('carouselNav');

  let currentIndex = 0;

  // 1. Limpiar e indicadores dinámicos según el número de diapositivas
  nav.innerHTML = ''; 
  const indicators = [];

  slides.forEach((_, index) => {
    const button = document.createElement('button');
    button.classList.add('indicator');
    if (index === 0) button.classList.add('active');
    
    button.addEventListener('click', () => {
      updateCarousel(index);
    });

    nav.appendChild(button);
    indicators.push(button);
  });

  // 2. Función para actualizar el estado activo
  const updateCarousel = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    indicators.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentIndex = index;
  };

  // 3. Eventos de los botones de navegación
  nextBtn.addEventListener('click', () => {
    const nextIndex = (currentIndex + 1) % slides.length;
    updateCarousel(nextIndex);
  });

  prevBtn.addEventListener('click', () => {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel(prevIndex);
  });

  // --- LÓGICA DE LAS CARTAS DESPLEGABLES ---
  const toggleButtons = document.querySelectorAll('.toggle-btn');

  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const content = document.getElementById(targetId);
      const article = btn.closest('.paper-note');
      const btnText = btn.querySelector('span');

      const isOpen = article.classList.contains('open');

      if (isOpen) {
        content.style.maxHeight = null;
        article.classList.remove('open');
        btnText.textContent = 'Abrir';
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        article.classList.add('open');
        btnText.textContent = 'Cerrar';
      }
    });
  });

});