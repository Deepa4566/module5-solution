(function (global) {
  var dc = {};

  var homeHtmlUrl = "snippets/home-snippet.html";
  var allCategoriesUrl = "https://davids-restaurant.herokuapp.com/categories.json";

  var insertHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
  };

  var showLoading = function (selector) {
    var html = "<div class='text-center'><img src='images/ajax-loader.gif'></div>";
    insertHtml(selector, html);
  };

  // STEP 0: On page load, show home page
  document.addEventListener("DOMContentLoaded", function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      allCategoriesUrl,
      function (categories) {
        // STEP 1: Load home snippet
        $ajaxUtils.sendGetRequest(
          homeHtmlUrl,
          function (homeHtml) {
            // STEP 2: Pick a random category
            var randomIndex = Math.floor(Math.random() * categories.length);
            var randomCategoryShortName = "'" + categories[randomIndex].short_name + "'";

            // STEP 3: Replace placeholder with random category
            var finalHtml = homeHtml.replace("{{randomCategoryShortName}}", randomCategoryShortName);

            // STEP 4: Insert updated home page
            insertHtml("#main-content", finalHtml);
          },
          false
        );
      },
      true
    );
  });

  // Expose utility to global scope
  global.$dc = dc;

})(window);
