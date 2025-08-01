$(function () {
  $(".sidebar .font-weight-bold").on("click", function () {
    const $clicked = $(this);
    const $clickedItem = $clicked.closest("li");
    const $clickedSubCat = $clickedItem.find(".subCat").first();

    // Fecha todos os outros menus e remove rotação das setas
    $(".sidebar .subCat").not($clickedSubCat).removeClass("show");
    $(".sidebar .font-weight-bold").not($clicked).removeClass("icon-rotated");

    // Alterna menu e rotação da seta
    $clickedSubCat.toggleClass("show");
    $clicked.toggleClass("icon-rotated");
  });

  var carouselnonav = $(".tab-pane");
  carouselnonav.slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    dots: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 10000,
    responsive: [
      {
        breakpoint: 770,
        settings: {
          autoplay: true,
          slidesToShow: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 435,
        settings: {
          autoplay: true,
          slidesToShow: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  });
});
