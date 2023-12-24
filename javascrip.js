let imgLength = $(".bxSlider__thumb").length;
let index = 0;
let html = "";

for (let i = 0; i < imgLength; i++) {
  html += `<div class="dot ${
    i === 0 ? "dot__active" : ""
  }" data-index=${i}></div>`;
}

$("#dot__list").html(html);
let $list__dot = $(".dot");

function addDotActive(index) {
  $(".dot.dot__active").removeClass("dot__active");
  $list__dot.each(function () {
    if (parseInt($(this).data("index")) === index) {
      $(this).addClass("dot__active");
    }
  });
}

function addImgActive(index) {
  $(".bxSlider__thumb.bxSlider__active").fadeOut(400, function () {
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
