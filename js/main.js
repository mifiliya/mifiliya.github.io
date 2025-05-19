$(document).ready(function() {
    // --- Защита от DevTools и контекстного меню ---
    const disableDevTools = (e) => {
        const devToolsShortcuts = [
            e.key === 'F12',
            e.ctrlKey && e.shiftKey && e.key === 'I',
            e.ctrlKey && e.shiftKey && e.key === 'J',
            e.ctrlKey && e.shiftKey && e.key === 'C'
        ];
        
        if (devToolsShortcuts.some(condition => condition)) {
            e.preventDefault();
        }
    };

    document.addEventListener('keydown', disableDevTools);
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('selectstart', (e) => e.preventDefault());

    // --- Инициализация элементов ---
    const $boxDescription = $('.box-description');
    const $legendItems = $('.legend-item');
    let activeFilters = [];

    // --- Фильтрация меток ---
    const updateMapVisibility = () => {
        $(".part").hide();
        
        if (!activeFilters.length) return;
        
        activeFilters.forEach(filter => $(`.part.${filter}`).show());
    };

    // --- Обработчики событий ---
    $legendItems.on('click', function() {
        $(this).toggleClass('active');
        activeFilters = $('.legend-item.active').map((_, el) => $(el).attr('data-target')).get();
        updateMapVisibility();
    });

    $(document).on({
        mouseenter: function() {
            if ($(this).is(':visible')) {
                const description = $(this).attr('description-data');
                if (description) {
                    $('.description')
                        .html(description)
                        .stop(true, true)
                        .css({ 'display': 'block', 'opacity': 0 })
                        .animate({ 'opacity': 1 }, 200);
                }
            }
        },
        mouseleave: function() {
            $('.description')
                .stop(true, true)
                .animate({ 'opacity': 0 }, 500, function() {
                    $(this).css('display', 'none');
                });
        }
    }, '.part');

    $legendItems.hover(
        function() {
            const desc = $(this).attr('data-description');
            $boxDescription
                .text(desc)
                .css({ left: $(this).offset().left, top: $(this).offset().top - 5 })
                .css('visibility', 'visible');
        },
        function() {
            $boxDescription.css('visibility', 'hidden');
        }
    );

    // --- Оптимизированная функция для квестов ---
    const setupQuestHover = (questId, targetElements) => {
        let isHovered = false;
        let shownElements = [];

        $(questId).on({
            mouseover: function() {
                if (!isHovered) {
                    isHovered = true;
                    $(this).appendTo($(this).parents('svg'));

                    if ($(this).is(':visible')) {
                        shownElements = $(targetElements).filter(':hidden').toArray();
                        $(shownElements).css({ opacity: 1 }).show();
                    }
                }
            },
            mouseout: function() {
                isHovered = false;
                $(shownElements).hide();
                shownElements = [];
            }
        });
    };

    // Настройка квестов (можно вынести в конфиг)
    const questConfigs = [
        { id: "#quest-1", targets: "#quest-2, #quest-3, .quest-path-1, .quest-path-2" },
        { id: "#quest-4", targets: ".quest-path-3" },
        { id: "#gates", targets: ".quest-path-5" },
        { id: "#quest-shino", targets: "#quest-shino-1, .quest-path-shino" },
        { id: "#quest-giant", targets: ".gates, .quest-giant" },
        { id: "#quest-salli", targets: ".most, .gates, .quest-salli" },
        { id: "#quest-dalman", targets: ".quest-dalman" },
        { id: "#quest-reika", targets: "#quest-2, #quest-3, .quest-path-1, .quest-path-2, .quest-path-4" }
    ];

    questConfigs.forEach(({ id, targets }) => setupQuestHover(id, targets));
});

$(document).ready(function() {
  // Инициализация эффекта
  var $water = $('.ripples').ripples({
    resolution: 256,
    dropRadius: 20,
    perturbance: 0.04,
    interactive: true
  });
  
  // Состояние эффекта (включен по умолчанию)
  var ripplesEnabled = true;
  
  // Обработчик кнопки
  $('#ripple-toggle').click(function() {
    if(ripplesEnabled) {
      // Выключаем эффект
      $water.ripples('destroy');
      $(this).text('Включить рябь');
    } else {
      // Включаем эффект
      $water = $('.ripples').ripples({
        resolution: 256,
        dropRadius: 20,
        perturbance: 0.04,
        interactive: true
      });
      $(this).text('Выключить рябь');
    }
    ripplesEnabled = !ripplesEnabled;
  });
});