$(document).ready(function() {
    document.addEventListener('keydown', function(e) {
  if (e.key === 'F12' || 
      (e.ctrlKey && e.shiftKey && e.key === 'I') || 
      (e.ctrlKey && e.shiftKey && e.key === 'J') ||
      (e.ctrlKey && e.shiftKey && e.key === 'C')) {
    e.preventDefault();
    
  }
});

// Запрет контекстного меню (правой кнопки мыши)
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
 
});

// Дополнительно: блокировка выделения текста (опционально)
document.addEventListener('selectstart', function(e) {
  e.preventDefault();
});


    
    // --- Инициализация ---
    const $boxDescription = $('.box-description');
    const $legendItems = $('.legend-item');
    let activeFilters = [];
    

        
    //     // Классифицируем все метки по цветам
    //     $(".part").each(function() {
    //         const fillColor = $(this).attr('fill');
    //         switch(fillColor) {
    //             case '#3ef757': $(this).addClass('green'); break;  // Места интереса
    //             case '#ec3159': $(this).addClass('red'); break;    // Квесты Йоны
    //             case '#4061ef': $(this).addClass('blue'); break;   // Квесты Парня
    //             case '#ffd65c': $(this).addClass('yellow'); break; // Сундуки
    //             case '#9d6b61': $(this).addClass('brown'); break;  // Торговец
    //             case '#423e3e': $(this).addClass('black'); break;  // Боссы
    //             case '#940000': $(this).addClass('camp'); break;   // Лагеря
    //         }
    //     });
    // }
   

    // --- Клик по элементам легенды ---
    $legendItems.click(function() {
        const targetClass = $(this).attr('data-target');
        $(this).toggleClass('active');
        
        // Обновляем активные фильтры
        activeFilters = $('.legend-item.active').map(function() {
            return $(this).attr('data-target');
        }).get();
        
        updateMapVisibility();
    });

    // --- Управление видимостью меток ---
    function updateMapVisibility() {
        // Сначала скрываем все метки
        $(".part").hide();
        
        // Если нет активных фильтров - ничего не показываем
        if (activeFilters.length === 0) return;
        
        // Показываем метки по выбранным фильтрам
        activeFilters.forEach(filter => {
            $(`.part.${filter}`).show();
        });
    }

    // --- Обработчик наведения для панели описания ---
    $(document).on({
        mouseenter: function() {
            // Показываем описание только для видимых меток
            if ($(this).is(':visible')) {
                const description = $(this).attr('description-data');
                if (description) {
                    $('.description')
                        .html(description)
                        .stop(true, true)
                        .css({
                            'display': 'block',
                            'opacity': 0
                        })
                        .animate({'opacity': 1}, 200);
                }
            }
        },
        mouseleave: function() {
            $('.description')
                .stop(true, true)
                .animate({'opacity': 0}, 100, function() {
                    $(this).css('display', 'none');
                });
        }
    }, '.part');

    // --- Описание при наведении на элементы легенды ---
    $legendItems.hover(
        function() {
            const desc = $(this).attr('data-description');
            $boxDescription.text(desc)
                .css({
                    left: $(this).offset().left,
                    top: $(this).offset().top - 5
                })
                .css('visibility', 'visible');
        },
        function() {
            $boxDescription.css('visibility', 'hidden');
        }
    );

    // --- Обработчики для квестов ---
    function setupQuestHover(questId, targetElements) {
        let mouse = 0;
        $(questId).on({
            
            mouseover: function() {
             if (mouse == 0){
                mouse = 1;
                // Поднимаем маркер на передний план
                const $this = $(this);
                 const svgParent = $this.parents('svg');
                 console.log("ID квеста: " + questId);
                 console.log("Класс квеста: " + targetElements);
                 $this.appendTo(svgParent);

                if ($(this).is(':visible')) {
                    $(targetElements).css({opacity: 1}).show();
                }
            }
            },
            mouseout: function() {
                mouse = 0;
                //console.log("Уход " + targetElements);
                $(targetElements).css({opacity: 1}).hide();
            }
        });
    }

    // Настройка обработчиков для всех квестов
    setupQuestHover("#quest-1", "#quest-2, #quest-3, .quest-path-1, .quest-path-2");
    setupQuestHover("#quest-4", ".quest-path-3");
    setupQuestHover("#gates", ".quest-path-5");
    setupQuestHover("#quest-shino", "#quest-shino-1, .quest-path-shino");
    setupQuestHover("#quest-giant", ".gates, .quest-giant");
    setupQuestHover("#quest-salli", ".most, .gates, .quest-salli");
    setupQuestHover("#quest-dalman", ".quest-dalman");
    setupQuestHover("#quest-reika", "#quest-2, #quest-3, .quest-path-1, .quest-path-2, .quest-path-4");
});