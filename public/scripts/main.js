window.onscroll = function () {
  scrollFunction();
};
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
$(document).ready(function(){
  var allcard = document.getElementsByClassName("blog-col");
  for(i=3;i<allcard.length;i++){
    $(allcard[i]).hide();
    allcard[i].classList.add("hide");
  }
  $(".hide").hide();$("#hideall").hide();
  $("#viewall").click(function(){
      $("#blogtitle").text("All Blogs");$(".blog-col").slideDown("slow");$("#hideall").show();$("#viewall").hide(); 
  });
  $("#hideall").click(function(){
      $("#blogtitle").text("Latest Blog Posts");$(".hide").slideUp("slow");$("#hideall").hide();$("#viewall").show();
  });
  $("#backend").click(function(){
    $("#frontend").hide("slow");$("#viewall").click();$("div.card-footer").html("<div class='dot'></div>");
    //$("div.card-footer:contains('backend')").html("<div class='dot'></div>");
    $(".dot").css({'background':'#f13c4e','height': '16px','width': '16px','border-radius': '50%'});
  });
  $("#frontend").click(function(){
    $("#backend").hide("slow");$("#viewall").click();$("div.card-footer").html("<div class='dot'></div>");
    //$("div.card-footer:contains('frontedn')").html("<div class='dot'></div>");
    $(".dot").css({'background':'#247cff','height': '16px','width': '16px','border-radius': '50%'});
  });
  $("#musicplayer .play-pause").click(function(){
    $("#musicplayer .play-pause").css('cssText', 'color: #f45');
    $("#musicplayer .play-next").css('cssText', 'color: #777');
  });
  $("#musicplayer .play-next").click(function(){
    $("#musicplayer .play-next").css('cssText', 'color: #f45');
    $("#musicplayer .play-pause").css('cssText', 'color: #777');
  });
});