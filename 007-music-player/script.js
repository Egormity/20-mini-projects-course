const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const curTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');

//--- SONGS ---//
const songs = [
  {
    path: 'jacinto-1',
    name: 'Electric Chill Machine',
    artist: 'Jasinto Design',
  },
  {
    path: 'jacinto-2',
    name: 'Seven Nation Army (Remix',
    artist: 'Jasinto Design',
  },
  {
    path: 'jacinto-3',
    name: 'dfgdfgdfg',
    artist: 'Jasinto Design',
  },
  {
    path: 'metric-1',
    name: 'Front Row (Remix)',
    artist: 'Metric / Jasinto Design',
  },
];

//--- PLAY AND PAUSE FUNCTIONS ---//
let isPlaying = false;
const playSong = () => {
  music.play();
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
};
const pauseSong = () => {
  music.pause();
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
};

//--- PLAY AND PAUSE EVENTLISTENER ---//
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

//--- UPDATE DOM ---//
const loadSong = song => {
  title.textContent = song.name;
  artist.textContent = song.artist;
  music.src = `music/${song.path}.mp3`;
  image.src = `img/${song.path}.jpg`;
};

//--- CHANGE SONGS FUNCTIONS ---//
const startSong = 0;
let curSong = startSong;

const nextSong = () => {
  curSong++;
  if (curSong > songs.length - 1) curSong = startSong;
  loadSong(songs[curSong]);
  playSong();
};

const prevSong = () => {
  curSong--;
  if (curSong < startSong) curSong = songs.length - 1;
  loadSong(songs[curSong]);
  playSong();
};

const updateProgressBar = e => {
  if (isPlaying) {
    //--- UPDATE BAR WIDTH ---//
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    //--- DISPLAY DURATION ---//
    const durationMins = Math.floor(duration / 60) + '';
    const durationSecs = (Math.round(duration % 60) + '').padStart(2, '0');
    if (durationSecs)
      durationEl.textContent = `${durationMins}:${durationSecs}`;

    //--- DISPLAY CURRENT TIME ---//
    const curM = Math.floor(currentTime / 60);
    const curS = (Math.round(currentTime % 60) + '').padStart(2, '0');
    curTimeEl.textContent = `${curM}:${curS}`;
  }
};

const setProgressBar = e => {
  const width = progressContainer.clientWidth;
  const offset = e.offsetX;
  const { duration } = music;

  const curTime = (offset / width) * duration;
  music.currentTime = curTime;
  playSong();
};

//--- CHANGE SONGS EVENTLISTENERS ---//
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);

//--- ON LOAD ---//
loadSong(songs[curSong]);
