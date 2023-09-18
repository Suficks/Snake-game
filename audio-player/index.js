const background = document.querySelector('.background');
const cover = document.querySelector('.cover');
const audio = document.querySelector('.audio');
const play = document.querySelector('.play');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const volume = document.querySelector('.volume');
const mute = document.querySelector('.mute');
const progressLine = document.querySelector('.audio__bar');
const volumeBar = document.querySelector('.volume__bar');

let isPlay = false;

const audioToggle = () => {
  if (!isPlay) {
    audio.play();
    isPlay = true;
    play.style.backgroundImage = 'url(./assets/img/pause.png)';
  } else {
    audio.pause();
    isPlay = false;
    play.style.backgroundImage = 'url(./assets/img/icons-play.png)';
  };
}

play.addEventListener('click', audioToggle);