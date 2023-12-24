let arrInit = [];
let html = "";
let page = 0;
let entriesNumber = 10;
let pageNumber = arrInit.length / entriesNumber;
let keyword = "";
let arrSearch = [];
let propertySort = "RenderingEngine";
let order = "ASC";

function generateRandomData() {
  const renderingEngines = ["WebKit", "Blink", "Gecko", "Trident"];
  const browsers = ["Chrome", "Firefox", "Safari", "Edge", "Internet Explorer"];
  const platforms = ["Windows", "macOS", "Linux", "Android", "iOS"];

  const randomRenderingEngine =
    renderingEngines[Math.floor(Math.random() * renderingEngines.length)];
  const randomBrowser = browsers[Math.floor(Math.random() * browsers.length)];
  const randomPlatform =
    platforms[Math.floor(Math.random() * platforms.length)];

  const dataObject = {
    RenderingEngine: randomRenderingEngine,
    Browser: randomBrowser,
    Platform: randomPlatform,
    EngineVersion: (Math.random() * 10).toFixed(1), // Tạo phiên bản động cơ ngẫu nhiên từ 0 đến 9.99
    CssGrade: String.fromCharCode(65 + Math.floor(Math.random() * 26)), // Tạo hạng CSS ngẫu nhiên từ A đến Z
  };

  return dataObject;
}

function initData(entriesNumber, page, keyword, propertySort, order) {
  html = "";
  let arr = search(keyword);
  sortArrayByProperty(arr, propertySort, order);
  entriesNumber = arr.length > entriesNumber ? entriesNumber : arr.length;
  i = page * entriesNumber;
  let n =
    page * entriesNumber + entriesNumber > arr.length
      ? arr.length
      : i + entriesNumber;
  for (i; i < n; i++) {
    console.log(`${arr[i].RenderingEngine}`);
    html += `
  <tr>
    <td>${arr[i].RenderingEngine}</td>
    <td>${arr[i].Browser}</td>
    <td>${arr[i].Platform}</td>
    <td>${arr[i].EngineVersion}</td>
    <td>${arr[i].CssGrade}</td>
  </tr>`;
  }
  $(".table-body").html(html);
  pageNumber = arr.length / entriesNumber;
  initPage(arr, entriesNumber, page);
}

function initPage(arr, entriesNumber, page) {
  html = "";
  for (i = 0; i < pageNumber; i++) {
    let pageIndex = i + 1;
    html +=
      i == page
        ? ` <li class="page__item page__active" data-page=${i}>${pageIndex}</li>`
        : ` <li class="page__item " data-page=${i}>${pageIndex}</li>`;
  }
  if (arr.length > entriesNumber) {
    $(".page").css("display", "flex");
    $(".page__list").html(html);
    $(".dataTables_info").html(
      `Showing ${entriesNumber * page + 1} to ${
        entriesNumber * (page + 1)
      } of ${arr.length} entries`
    );
  } else {
    $(".page").css("display", "none");
  }
}

function search(keyword) {
  if (keyword.trim().length === 0) return arrInit;
  else {
    arrSearch = [];
    arrInit.forEach((element) => {
      if (
        element.RenderingEngine.toLowerCase().includes(keyword) ||
        element.Browser.toLowerCase().includes(keyword) ||
        element.Platform.toLowerCase().includes(keyword) ||
        element.EngineVersion.toLowerCase().includes(keyword) ||
        element.CssGrade.toLowerCase().includes(keyword)
      )
        arrSearch.push(element);
    });
  }
  return arrSearch;
}

function sortArrayByProperty(arr, property, order) {
  const sortOrder = order === "DESC" ? -1 : 1;
  if (property === "EngineVersion") {
    return arr.sort((a, b) => {
      const valueA = a[property];
      const valueB = b[property];

      if (valueA < valueB) return -1 * sortOrder;
      if (valueA > valueB) return 1 * sortOrder;
      return 0;
    });
  } else {
    return arr.sort((a, b) => {
      const valueA = a[property].toLowerCase();
      const valueB = b[property].toLowerCase();

      if (valueA < valueB) return -1 * sortOrder;
      if (valueA > valueB) return 1 * sortOrder;
      return 0;
    });
  }
}

for (let i = 0; i < 100; i++) {
  arrInit.push(generateRandomData());
}

initData(entriesNumber, page, "", propertySort, order);

$("#entries").change(function () {
  entriesNumber = parseInt($(this).val());
  initData(entriesNumber, 0, keyword, propertySort, order);
});

$(".search").on("input", function () {
  keyword = $(this).val().toLowerCase();
  initData(entriesNumber, 0, keyword, propertySort, order);
});

$(document).on("click", ".page__item", function () {
  page = parseInt($(this).data("page"));
  entriesNumber = parseInt($("#entries").val());
  initData(entriesNumber, page, keyword, propertySort, order);
});

$(document).on("click", ".table-title", function () {
  let sort = $(this).data("sort");
  let arrSort = sort.split("__");
  let newSort = sort.endsWith("__ASC")
    ? sort.replace("__ASC", "__DESC")
    : sort.replace("__DESC", "__ASC");
  propertySort = arrSort[0];
  order = arrSort[1];
  console.log(propertySort + "\t" + order);
  initData(entriesNumber, 0, keyword, propertySort, order);
  $(this).data("sort", newSort);
  $(".table-title").removeClass("reverse");
  $(this).hasClass("reverse")
    ? $(this).removeClass("reverse")
    : $(this).addClass("reverse");
});

$(".prev").on("click", function () {
  page = parseInt($(".page__active").data("page")) - 1 < 0 ? page : --page;
  initData(entriesNumber, page, keyword, propertySort, order);
});

$(".next").on("click", function () {
  page =
    parseInt($(".page__active").data("page")) + 1 == pageNumber ? page : ++page;
  initData(entriesNumber, page, keyword, propertySort, order);
});

$(".next").hover(function () {
  parseInt($(".page__active").data("page")) + 1 == pageNumber
    ? $(this).css("cursor", "no-drop")
    : $(this).css("cursor", "pointer");
});

$(".prev").hover(function () {
  parseInt($(".page__active").data("page")) == 0
    ? $(this).css("cursor", "no-drop")
    : $(this).css("cursor", "pointer");
});
