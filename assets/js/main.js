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
});
