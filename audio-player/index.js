import { songs } from './songsData.js'

const background = document.querySelector('.background');
const cover = document.querySelector('.cover');
const titleContainer = document.querySelector('.title');
const authorContainer = document.querySelector('.author');
const audio = document.querySelector('.audio');
const play = document.querySelector('.play');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const currentTime = document.querySelector('.current__time');
const durationTime = document.querySelector('.duration__time');
const volume = document.querySelector('.volume');
const mute = document.querySelector('.mute');
const progressLine = document.querySelector('.audio__bar');
const volumeBar = document.querySelector('.volume__bar');
const repeatBtn = document.querySelector('.repeat');

// Загрузка аудио

let songIndex = 0;

const loadSong = ({ title, author }) => {
  titleContainer.innerHTML = title;
  authorContainer.innerHTML = author;
  audio.src = `./assets/audio/${author} - ${title}.mp3`;
  cover.src = `./assets/img/${title}.jpg`;
  background.src = `./assets/img/${title}.jpg`;
}

loadSong(songs[songIndex])

// Загрузка аудио

// Выставление продолжительности аудио

const setDurationTime = () => {
  audio.onloadedmetadata = () => {
    let minutes = Math.floor(audio.duration / 60);
    let seconds = Math.floor(audio.duration % 60);

    if (seconds < 10) {
      seconds = '0' + String(seconds);
    }
    durationTime.innerHTML = `${minutes}:${seconds}`;
  }
}

setDurationTime()

// Выставление продолжительности аудио

// Включение / пауза

let isPlay = false;

const audioPlay = () => {
  audio.play();
  isPlay = true;
  play.style.backgroundImage = 'url(./assets/img/pause.png)';
}

const audioPause = () => {
  audio.pause();
  isPlay = false;
  play.style.backgroundImage = 'url(./assets/img/icons-play.png)';
}

const audioToggle = () => {
  if (!isPlay) {
    audioPlay();
  } else {
    audioPause();
  };
};

// Включение / пауза

// Прогресс аудио и перемотка

const audioProgress = () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressLine.value = progress || 0;
  progressLine.style.background = `linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) ${progress}%, rgba(0, 0, 0, 0.5) ${progress}%, rgba(0, 0, 0, 0.5) 100%)`;

  let minutes = Math.floor(audio.currentTime / 60);
  let seconds = Math.floor(audio.currentTime % 60);

  if (seconds < 10) {
    seconds = '0' + String(seconds);
  }
  currentTime.innerHTML = `${minutes}:${seconds}`;
};

const audioChangeTime = (e) => {
  const progress = e.offsetX / (progressLine.offsetWidth / 100);
  audio.currentTime = audio.duration * (progress / 100);
  progressLine.style.background = `linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) ${progress}%, rgba(0, 0, 0, 0.5) ${progress}%, rgba(0, 0, 0, 0.5) 100%)`;
};

// Прогресс аудио и перемотка

// Включение / выключение звука

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

// Включение / выключение звука

// Звук на максимум

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

// Звук на максимум

// Изменение звука

const changeVolume = () => {
  const volume = volumeBar.value / 100;
  audio.volume = volume;
};

// Изменение звука

// Следующий трек

function nextSong() {
  if (repeatBtn.classList.contains('repeat__active')) {
    console.log(songs[songIndex]);
    loadSong(songs[songIndex]);
    audioPlay();
  } else {
    songIndex++;

    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }
    loadSong(songs[songIndex]);
    audioPlay();
  };
};

// Следующий трек

// Предыдущий трек

const prevSong = () => {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  audioPlay();
};

// Предыдущий трек

// Повтор трека

const audioRepeatToggle = () => {
  repeatBtn.classList.toggle('repeat__active');
}

// Повтор трека

// Вызов функций

play.addEventListener('click', audioToggle);
audio.addEventListener('timeupdate', audioProgress);
audio.addEventListener('ended', nextSong);
progressLine.addEventListener('click', (e) => {
  audioChangeTime(e);
});
volumeBar.addEventListener('change', changeVolume);
mute.addEventListener('click', toggleVolume);
volume.addEventListener('click', fullVolume);
next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);
repeatBtn.addEventListener('click', audioRepeatToggle);

// Вызов функций
