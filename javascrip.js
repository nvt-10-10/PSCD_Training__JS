let imgLength = $(".bxSlider__thumb").length;
let index = 0;
let html = "";
let check = false;
let check1 = false;
for (let i = 0; i < imgLength; i++) {
  html += `<div class="dot ${i === 0 ? "dot__active" : ""}" data-index=${i}></div>`;
}
$("#dot__list").html(html);
function addDotActive(indexDot) {
  $(".dot__active").removeClass("dot__active");
  $(`#dot__list .dot:eq(${indexDot})`).addClass("dot__active");
}
function resetSlider(slideWidth) {
  if (check) {
    $("#bxSlider__list").css("left", 0);
    for (let i = 0; i < imgLength - 1; i++) {
      $("#bxSlider__list .bxSlider__thumb:eq(0)").appendTo("#bxSlider__list");
    }
    check = false;
  }
  if (check1) {
    $("#bxSlider__list").css("left", -(imgLength - 1) * slideWidth);
    for (let i = 0; i < imgLength - 1; i++) {
      $("#bxSlider__list figure:last()").prependTo("#bxSlider__list");
    }
    check1 = false;
  }
}
function addImgActive(indexImage) {
  const slideWidth = parseFloat($(".bxSlider__thumb").width());
  resetSlider(slideWidth);
  if (indexImage == -1) {
    $("#bxSlider__list figure:last()").prependTo("#bxSlider__list");
    $("#bxSlider__list").css("left", -slideWidth);
    $("#bxSlider__list").animate({ left: 0 }, "slow");
    check1 = true;
    index = imgLength - 1;
  } else if (indexImage == imgLength) {
    $("#bxSlider__list figure:first()").appendTo("#bxSlider__list");
    $("#bxSlider__list").css("left", -(imgLength - 2) * slideWidth);
    $("#bxSlider__list").animate({ left: -(imgLength - 1) * slideWidth }, "slow");
    check = true;
    index = 0;
  } else {
    $("#bxSlider__list").animate({ left: slideWidth * -index }, "slow");
  }
  addDotActive(index);
}
$("#prev").on("click", function () {
  addImgActive(--index);
});
$("#next").on("click", function () {
  addImgActive(++index);
});
$("#dot__list").on("click", ".dot", function () {
  index = $(this).data("index");
  addImgActive(index);
});
