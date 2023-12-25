let imgLength = $(".bxSlider__thumb").length;
let index = 0;
let $dotList = $("#dot__list");
let $list__dot = $(".dot");
let html = "";
for (let i = 0; i < imgLength; i++) {
  html += `<div class="dot ${
    i === 0 ? "dot__active" : ""
  }" data-index="${i}"></div>`;
  $dotList.append(dotElement);
}

function addDotActive(index) {
  $(".dot__active").removeClass("dot__active");
  $(`.dot:eq(${index + 1})`).addClass("dot__active");
}

function addImgActive(index) {
  $(".bxSlider__active").fadeOut(400, function () {
    $(this).removeClass("bxSlider__active");
    $(".bxSlider__thumb:eq(" + index + ")")
      .addClass("bxSlider__active")
      .fadeIn(500);
    addDotActive(index);
  });
}

$("#prev").on("click", function () {
  index = --index < 0 ? imgLength - 1 : index;
  addImgActive(index);
});

$("#next").on("click", function () {
  index = ++index == imgLength ? 0 : index;
  addImgActive(index);
});

$(document).on("click", ".dot", function () {
  addImgActive($(this).data("index"));
});
