let imgLength = $(".bxSlider__thumb").length;
let index = 0;
let html = "";
for (let i = 0; i < imgLength; i++) {
  html += `<div class="dot ${
    i === 0 ? "dot__active" : ""
  }" data-index=${i}></div>`;
}
document.getElementById("dot__list").innerHTML = html;
let list__dot = document.querySelectorAll(".dot");
function addDotActive(index) {
  document.querySelector(".dot.dot__active").classList.remove("dot__active");
  list__dot.forEach((dot) => {
    parseInt(dot.dataset.index) === index
      ? dot.classList.add("dot__active")
      : "";
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
prev.addEventListener("click", function () {
  index = --index < 0 ? imgLength - 1 : index;
  addImgActive(index);
});
next.addEventListener("click", function () {
  index = ++index == imgLength ? 0 : index;
  addImgActive(index);
});
$(document).on("click", ".dot", function () {
  addImgActive($(this).data("index"));
});
