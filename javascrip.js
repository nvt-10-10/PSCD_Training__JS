let imgLength = $(".bxSlider__thumb").length;
let index = 0;
let $dotList = $("#dot__list");

let html = "";
for (let i = 0; i < imgLength; i++) {
  let dotClass = i === 0 ? "dot__active" : "";
  html += `<div class="dot ${dotClass}" data-index=${i}></div>`;
}
$dotList.html(html);

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
  const slideWidth =
    parseFloat($(".bxSlider__thumb").width()) +
    parseFloat($(".bxSlider__thumb").css("border-width")) * 2;
  console.log(slideWidth);
  $(".bxSlider__thumb").animate({ translate: slideWidth * -index }, "slow");
  addDotActive(index);
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
  index = $(this).data("index");
  addImgActive(index);
});
