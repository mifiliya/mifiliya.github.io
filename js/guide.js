function rotateBackground() {
  const slides = document.querySelectorAll('.slide');
  let current = document.querySelector('.slide.active');
  
  current.classList.remove('active');
  
  if (current.nextElementSibling && current.nextElementSibling.classList.contains('slide')) {
    current.nextElementSibling.classList.add('active');
  } else {
    slides[0].classList.add('active');
  }
}

// Меняем изображение каждые 5 секунд
setInterval(rotateBackground, 7000);