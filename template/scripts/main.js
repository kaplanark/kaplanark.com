//clock
function clock() {
  var topclock, time, h, m;
  time = new Date();
  h = time.getHours();
  m = time.getMinutes();
  topclock = h + " : " + (m < 10 ? "0" : "") + m;
  document.getElementById("clock").innerHTML = topclock;
  setTimeout("clock()", 1000);
  if (h >= 20 && h <= 24) {
    document.getElementById("day").innerHTML =
      "<i class='bi bi-moon-fill'></i>";
    //document.getElementById("css").href="http://127.0.0.1:5500/src/css/dark.css"
  } else if (h >= 00 && h <= 7) {
    document.getElementById("day").innerHTML =
      "<i class='bi bi-moon-fill'></i>";
    //document.getElementById("css").href="http://127.0.0.1:5500/src/css/dark.css"
  } else {
    document.getElementById("day").innerHTML = "<i class='bi bi-sun-fill'></i>";
  }
}
//search post
function findpost() {
  var input, filter, cards, container, div, title, i;
  input = document.getElementById("postsearch");
  filter = input.value.toUpperCase();
  container = document.getElementById("postcontainer");
  cards = container.getElementsByClassName("post-card");
  for (i = 0; i < cards.length; i++) {
    title = cards[i].querySelector(".card-body div.card-title");
    if (title.innerText.toUpperCase().indexOf(filter) > -1) {
      cards[i].style.display = "";
    } else {
      cards[i].style.display = "none";
    }
  }
}
//navigation bar
// window.onscroll = function () {
//   scrollFunction();
// };
function test() {
  var tabsNewAnim = $("#navbarcontent");
  var selectorNewAnim = $("#navbarcontent").find("li").length;
  var activeItemNewAnim = tabsNewAnim.find(".active");
  var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
  var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
  var itemPosNewAnimTop = activeItemNewAnim.position();
  var itemPosNewAnimLeft = activeItemNewAnim.position();
  $(".hori-selector").css({
    top: itemPosNewAnimTop.top + "px",
    left: itemPosNewAnimLeft.left + "px",
    height: activeWidthNewAnimHeight + "px",
    width: activeWidthNewAnimWidth + "px",
  });
  $("#navbarcontent").on("click", "li", function (e) {
    $("#navbarcontent ul li").removeClass("active");
    $(this).addClass("active");
    var activeWidthNewAnimHeight = $(this).innerHeight();
    var activeWidthNewAnimWidth = $(this).innerWidth();
    var itemPosNewAnimTop = $(this).position();
    var itemPosNewAnimLeft = $(this).position();
    $(".hori-selector").css({
      top: itemPosNewAnimTop.top + "px",
      left: itemPosNewAnimLeft.left + "px",
      height: activeWidthNewAnimHeight + "px",
      width: activeWidthNewAnimWidth + "px",
    });
  });
}
$(document).ready(function () {
  setTimeout(function () {
    test();
  });
});
$(window).on("resize", function () {
  setTimeout(function () {
    test();
  }, 500);
});
$(".navbar-toggler").click(function () {
  setTimeout(function () {
    test();
  });
});
window.onscroll = function () {
  scrollFunction();
};
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("mainnav").style.top = "0";

    document.getElementById("brand").innerHTML =
      "<i class='bi bi-chevron-up'></i>";
  } else {
    document.getElementById("mainnav").style.top = "33px";

    document.getElementById("brand").innerHTML =
      "<i class='bi bi-chevron-down'></i>";
  }
}
//ready jquery function
$(document).ready(function () {
  var allcard = document.getElementsByClassName("blog-post");
  for (i = 3; i < allcard.length; i++) {
    $(allcard[i]).hide();
    allcard[i].classList.add("hide");
  }
  $(".hide").hide();
  $("#hideall").hide();
  $("#viewall").click(function () {
    $("#blogtitle").text("All Blogs");
    $(".blog-post").slideDown("slow");
    $("#hideall").show();
    $("#viewall").hide();
    $(".search").css({ display: "block" });
  });
  $("#hideall").click(function () {
    $("#blogtitle").text("Latest Blog Posts");
    $(".hide").slideUp("slow");
    $("#hideall").hide();
    $("#viewall").show();
    $(".search").css({ display: "none" });
  });
  $("#backend").click(function () {
    $("#frontend").hide("slow");
    $("#viewall").click();
    $("div.b-dot").css({ background: "#f13c4e" });
  });
  $("#frontend").click(function () {
    $("#backend").hide("slow");
    $("#viewall").click();
    $("div.f-dot").css({ background: "#247cff" });
  });
  //musci player
  $("#musicplayer .play-pause").click(function () {
    $("#musicplayer .play-pause").css("cssText", "color: #f45");
    $("#musicplayer .play-next").css("cssText", "color: #777");
  });
  $("#musicplayer .play-next").click(function () {
    $("#musicplayer .play-next").css("cssText", "color: #f45");
    $("#musicplayer .play-pause").css("cssText", "color: #777");
  });
});
