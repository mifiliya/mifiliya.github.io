$(document).ready(function() {
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
        $(questId).on({
            mouseover: function() {
                if ($(this).is(':visible')) {
                    $(targetElements).css({
                        opacity: 1,
                        transition: 'opacity 0.25s ease-in-out'
                    }).show();
                }
            },
            mouseout: function() {
                $(targetElements).css({opacity: 0});
            }
        });
    }

    // Настройка обработчиков для всех квестов
    setupQuestHover("#quest-1", "#quest-2, #quest-3, .quest-path-1, .quest-path-2");
    setupQuestHover("#quest-4", ".quest-path-3");
    setupQuestHover("#quest-5", ".quest-path-5");
    setupQuestHover("#quest-shino", "#quest-shino-1, .quest-path-shino");
    setupQuestHover("#quest-giant", ".quest-giant");
    setupQuestHover("#quest-salli", ".quest-salli");
    setupQuestHover("#quest-dalman", ".quest-dalman");
    setupQuestHover("#quest-reika", "#quest-2, #quest-3, .quest-path-1, .quest-path-2, .quest-path-4");
});