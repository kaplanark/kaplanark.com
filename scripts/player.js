const musicContainer = document.getElementById("music-container");
const logoContainer = document.getElementById("logo-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("song-name");
const cover = document.getElementById("cover");
const currTime = document.querySelector("#currTime");
const durTime = document.querySelector("#durTime");
// song titles
const songs = [
  "jorma-kaukonen-genesis",
  "adamlar-zombi",
  "summer",
];
// keep track of song
let songIndex = 0;
loadSong(songs[songIndex]);
function loadSong(song) {
  title.innerText = song;
  audio.src = `media/${song}.mp3`;
  cover.src = `images/plak.jpg`;
}
//play song
function playSong() {
  musicContainer.classList.add("play");
  logoContainer.classList.add("play");
  playBtn.querySelector("i.bi").classList.remove("bi-play-fill");
  playBtn.querySelector("i.bi").classList.add("bi-pause-fill");
  audio.play();
}
//pause song
function pauseSong() {
  musicContainer.classList.remove("play");
  logoContainer.classList.remove("play");
  playBtn.querySelector("i.bi").classList.add("bi-play-fill");
  playBtn.querySelector("i.bi").classList.remove("bi-pause-fill");
  audio.pause();
}
//previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}
//next song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}
//update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}
//set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}
//get duration & currentTime for Time of song
function DurTime(e) {
  const { duration, currentTime } = e.srcElement;
  var sec;
  var sec_d;
  //define minutes currentTime
  let min = currentTime == null ? 0 : Math.floor(currentTime / 60);
  min = min < 10 ? "0" + min : min;
  //define seconds currentTime
  function get_sec(x) {
    if (Math.floor(x) >= 60) {
      for (var i = 1; i <= 60; i++) {
        if (Math.floor(x) >= 60 * i && Math.floor(x) < 60 * (i + 1)) {
          sec = Math.floor(x) - 60 * i;
          sec = sec < 10 ? "0" + sec : sec;
        }
      }
    } else {
      sec = Math.floor(x);
      sec = sec < 10 ? "0" + sec : sec;
    }
  }
  get_sec(currentTime, sec);
  //change currentTime DOM
  // currTime.innerHTML = min + ":" + sec;
  //define minutes duration
  let min_d = isNaN(duration) === true ? "0" : Math.floor(duration / 60);
  min_d = min_d < 10 ? "0" + min_d : min_d;
  function get_sec_d(x) {
    if (Math.floor(x) >= 60) {
      for (var i = 1; i <= 60; i++) {
        if (Math.floor(x) >= 60 * i && Math.floor(x) < 60 * (i + 1)) {
          sec_d = Math.floor(x) - 60 * i;
          sec_d = sec_d < 10 ? "0" + sec_d : sec_d;
        }
      }
    } else {
      sec_d = isNaN(duration) === true ? "0" : Math.floor(x);
      sec_d = sec_d < 10 ? "0" + sec_d : sec_d;
    }
  }
  //define seconds duration
  get_sec_d(duration);
  //change duration DOM
  // durTime.innerHTML = min_d + ":" + sec_d;
}
//event listeners
playBtn.addEventListener("click", () => {
  const isLogoPlaying = logoContainer.classList.contains("play");
  if (isLogoPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});
//change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
//time/song update
audio.addEventListener("timeupdate", updateProgress);
//click on progress bar
progressContainer.addEventListener("click", setProgress);
//song ends
audio.addEventListener("ended", nextSong);
//time of song
audio.addEventListener("timeupdate", DurTime);
