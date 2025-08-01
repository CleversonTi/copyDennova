$(function () {
  if ($(window).width() <= 768 && $(".header .header-profile").length) {
    // Adiciona botão hamburger ao final do .header-profile
    const $headerProfile = $(".header .header-profile");
    if ($headerProfile.length) {
      const $mobileToggle = $(`
        <div class="mobile-toggle d-md-none">
          <i class="fas fa-bars fa-2x"></i>
        </div>
      `);
      $headerProfile.append($mobileToggle);
    }
    // Adiciona botão close no início de .sidebar dentro do .nav-container
    const $sidebar = $(".nav-container .sidebar");
    if ($sidebar.length && $sidebar.find(".close-btn").length === 0) {
      const $closeBtn = $(`
        <div class="close-btn d-flex justify-content-end mb-3">
          <i class="fas fa-times fa-2x"></i>
        </div>
      `);
      $sidebar.prepend($closeBtn);
    }
  }
  // Toggle submenu da sidebar
  $(".sidebar .font-weight-bold").on("click", function () {
    const $clicked = $(this);
    const $item = $clicked.closest("li");
    const $submenu = $item.find(".subCat").first();

    $submenu.toggleClass("show");
    $clicked.toggleClass("icon-rotated");
  });

  // Toggle menu mobile
  $(".mobile-toggle").on("click", function () {
    $(".nav-container").toggleClass("open");
  });

  $(".close-btn").on("click", function () {
    $(".nav-container").removeClass("open");
  });
  function initSlickIfNeeded($carousel) {
    if (!$carousel.hasClass("slick-initialized")) {
      $carousel.slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 8000,
        swipeToSlide: true,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
              arrows: false,
            },
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              arrows: false,
            },
          },
        ],
      });
    }
  }
  function initSlickPosts($carousel) {
    if (!$carousel.hasClass("slick-initialized")) {
      $carousel.slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 8000,
        swipeToSlide: true,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
              arrows: false,
            },
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              arrows: false,
            },
          },
        ],
      });
    }
  }

  // Inicializa carrossel da aba ativa (normalmente "Todos")
  initSlickIfNeeded($("#todos .carousel-treinamentos"));

  // Inicializa carrossel da aba ativa (normalmente "Todos")
  initSlickPosts($("#posts .carousel-posts"));

  // Ao mudar de aba, espera a aba estar visível antes de inicializar slick
  $('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
    const target = $(e.target).attr("href");
    const $carousel = $(target).find(".carousel-treinamentos");

    setTimeout(() => {
      initSlickIfNeeded($carousel);
    }, 100); // Aguarda aba ser exibida
  });
});
$(window).on("scroll", function () {
  const $header = $(".header");
  const $main = $(".main-content");

  if ($(this).scrollTop() > 50) {
    if (!$header.hasClass("fixed-header")) {
      $header.addClass("fixed-header");

      // Adiciona margin-top baseado na altura real do header
      const headerHeight = $header.outerHeight();
      $main.css("margin-top", headerHeight + "px");
    }
  } else {
    $header.removeClass("fixed-header");
    $main.css("margin-top", "0");
  }
});
