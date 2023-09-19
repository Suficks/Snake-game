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
const progressTime = document.querySelector('.show__time')
const playlistBtn = document.querySelector('.playlist__btn')
const playlist = document.querySelector('.playlist')
const shuffle = document.querySelector('.shuffle')

// Получение минут и секунд

const formatTime = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${minutes}:${seconds}`
}

// Получение минут и секунд

// Появление плейлиста

const playlistActiveToggle = () => {
  playlist.classList.toggle('playlist__active')
}

// Появление плейлиста

// Заполнение плейлиста треками

function createPlaylist(songs) {
  songs.forEach((item) => {
    playlist.insertAdjacentHTML('beforeend', `<li class="playlist__item">${item.author} - ${item.title}</li>`)
  });
};

createPlaylist(songs);

// Заполнение плейлиста треками

// Перемешка треков

let isShuffle = false;

const shuffleAudio = () => {
  if (!isShuffle) {
    const shuffledSongs = songs.slice().sort(() => Math.random() - 0.5);
    playlist.innerHTML = '';
    createPlaylist(shuffledSongs);
    shuffle.classList.add('shuffle__active');
    isShuffle = true;
  } else {
    playlist.innerHTML = '';
    createPlaylist(songs);
    shuffle.classList.remove('shuffle__active');
    isShuffle = false;
  };
};

// Перемешка треков

// Загрузка аудио

let songIndex = 0;

function loadSong() {
  const playlistItems = document.querySelectorAll('.playlist__item');
  const text = playlistItems[songIndex].textContent;
  const title = text.split('-')[1].trim();
  const author = text.split('-')[0].trim();

  titleContainer.innerHTML = title;
  authorContainer.innerHTML = author;
  audio.src = `./assets/audio/${author} - ${title}.mp3`;
  cover.src = `./assets/img/${title}.jpg`;
  background.src = `./assets/img/${title}.jpg`;
};

loadSong();

// Загрузка аудио

// Выставление продолжительности аудио

const setDurationTime = () => {
  audio.onloadedmetadata = () => {
    durationTime.innerHTML = formatTime(audio.duration);
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
  currentTime.innerHTML = formatTime(audio.currentTime);
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
    loadSong();
    audioPlay();
  } else {
    songIndex++;

    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }
    loadSong();
    audioPlay();
  };
};

// Следующий трек

// Предыдущий трек

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong();
  audioPlay();
};

// Предыдущий трек

// Повтор трека

const audioRepeatToggle = () => {
  repeatBtn.classList.toggle('repeat__active');
}

// Повтор трека

// Отображение времени на progressLine

const showTimeOnProgressLine = (e) => {
  let offsetX = e.offsetX;
  progressTime.style.left = `${offsetX}px`;
  let timeLineWidth = progressLine.clientWidth;
  let percent = (e.offsetX / timeLineWidth) * audio.duration;
  progressTime.innerHTML = formatTime(percent);
}

// Отображение времени на progressLine

// Вызов функций

play.addEventListener('click', audioToggle);
audio.addEventListener('timeupdate', audioProgress);
audio.addEventListener('ended', nextSong);
progressLine.addEventListener('click', (e) => {
  audioChangeTime(e);
});
progressLine.addEventListener('mousemove', (e) => {
  showTimeOnProgressLine(e);
});
volumeBar.addEventListener('mousemove', changeVolume);
volumeBar.addEventListener('change', changeVolume);
mute.addEventListener('click', toggleVolume);
volume.addEventListener('click', fullVolume);
next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);
repeatBtn.addEventListener('click', audioRepeatToggle);
playlistBtn.addEventListener('click', playlistActiveToggle);
shuffle.addEventListener('click', shuffleAudio);

// Вызов функций
