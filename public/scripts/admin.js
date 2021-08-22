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
