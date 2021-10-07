$(".tab-content")
  .find(".tab-pane")
  .each(function (idx, item) {
    var navTabs = $(this).closest(".tabs").find(".nav-tabs"),
      title = $(this).attr("title");
    navTabs.append(
      '<li class="nav-item"><a class="nav-link" href="#">' + title + "</a></li>"
    );
  });

$(".tabs ul.nav-tabs").each(function () {
  $(this).find("li:first").addClass("active");
});

$(".tabs .tab-content").each(function () {
  $(this).find("div:first").addClass("active");
});

$(".nav-tabs a").click(function (e) {
  e.preventDefault();
  var tab = $(this).parent(),
    tabIndex = tab.index(),
    tabPanel = $(this).closest(".tabs"),
    tabPane = tabPanel.find(".tab-pane").eq(tabIndex);
  tabPanel.find(".active").removeClass("active");
  tab.addClass("active");
  tabPane.addClass("active");
});
