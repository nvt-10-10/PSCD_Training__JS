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
  const slideWidth =
    parseFloat($(".bxSlider__thumb").width()) +
    parseFloat($(".bxSlider__thumb").css("border-width")) * 2;
  console.log(slideWidth);
  $(".bxSlider__thumb").animate({ translate: slideWidth * -index }, "slow");
  addDotActive(index);
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
