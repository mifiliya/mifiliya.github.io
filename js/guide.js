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

document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      navLinks.classList.toggle('mobile-visible');
      this.textContent = navLinks.classList.contains('mobile-visible') ? '✕' : '☰';
    });

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-visible');
        toggleBtn.textContent = '☰';
      });
    });

    // Закрытие меню при клике вне его области
    document.addEventListener('click', function(e) {
      if (!navLinks.contains(e.target) && e.target !== toggleBtn) {
        navLinks.classList.remove('mobile-visible');
        toggleBtn.textContent = '☰';
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const guideItems = document.querySelectorAll('.mod-item');
  
  guideItems.forEach(item => {
    const link = item.querySelector('.mod-link');
    const hiddenContent = item.querySelector('.hidden-content');
    
    if (hiddenContent) {
      link.addEventListener('click', function(e) {
        // Проверяем, не является ли ссылка внешней
        if (this.getAttribute('href') && this.getAttribute('href') !== '#') {
          // Если это обычная ссылка, не предотвращаем переход
          return;
        }
        
        e.preventDefault();
        
        // Закрываем все открытые элементы
        document.querySelectorAll('.mod-item.expanded').forEach(openItem => {
          if (openItem !== item) {
            openItem.classList.remove('expanded');
          }
        });
        
        // Переключаем текущий элемент
        item.classList.toggle('expanded');
      });
    }
  });
});