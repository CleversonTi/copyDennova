$(function () {
  $(".sidebar .font-weight-bold").on("click", function () {
    const $clicked = $(this);
    const $clickedItem = $clicked.closest("li");
    const $clickedSubCat = $clickedItem.find(".subCat").first();

    $(".sidebar .subCat").not($clickedSubCat).removeClass("show");
    $(".sidebar .font-weight-bold").not($clicked).removeClass("icon-rotated");

    $clickedSubCat.toggleClass("show");
    $clicked.toggleClass("icon-rotated");
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
