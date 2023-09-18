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

const audioProgress = () => {
  const progress = (Math.floor(audio.currentTime) / (Math.floor(audio.duration) / 100));
  progressLine.value = progress;
  progressLine.style.background = `linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) ${progress}%, rgba(0, 0, 0, 0.5) ${progress}%, rgba(0, 0, 0, 0.5) 100%)`;
};

const audioChangeTime = (e) => {
  const progress = e.offsetX / (progressLine.offsetWidth / 100);
  audio.currentTime = audio.duration * (progress / 100);
  progressLine.style.background = `linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) ${progress}%, rgba(0, 0, 0, 0.5) ${progress}%, rgba(0, 0, 0, 0.5) 100%)`;
};

let savedVolume = 50;

volumeBar.addEventListener('input', () => {
  savedVolume = volumeBar.value;
  volumeBar.style.background = `linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) ${savedVolume}%, rgba(0, 0, 0, 0.5) ${savedVolume}%, rgba(0, 0, 0, 0.5) 100%)`;
});

const toggleVolume = () => {
  if (audio.volume === 0) {
    audio.volume = savedVolume / 100;
    volumeBar.value = savedVolume;
    volumeBar.style.background = `linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) ${savedVolume}%, rgba(0, 0, 0, 0.5) ${savedVolume}%, rgba(0, 0, 0, 0.5) 100%)`;
  } else {
    audio.volume = 0;
    volumeBar.value = 0;
    volumeBar.style.background = 'linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%)';
  };
};

const fullVolume = () => {
  if (audio.volume !== 1) {
    audio.volume = 1;
    volumeBar.value = 100;
    volumeBar.style.background = `linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%`;
  } else {
    audio.volume = savedVolume / 100;
    volumeBar.value = savedVolume;
    volumeBar.style.background = `linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) ${savedVolume}%, rgba(0, 0, 0, 0.5) ${savedVolume}%, rgba(0, 0, 0, 0.5) 100%)`;
  };
};

const changeVolume = () => {
  const volume = volumeBar.value / 100;
  audio.volume = volume;
};

play.addEventListener('click', audioToggle);
audio.addEventListener('timeupdate', audioProgress);
progressLine.addEventListener('click', (e) => {
  audioChangeTime(e);
});
volumeBar.addEventListener('change', changeVolume);
mute.addEventListener('click', toggleVolume);
volume.addEventListener('click', fullVolume);