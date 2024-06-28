const player = document.querySelector('.player');
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTIme = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const speed = document.querySelector('.player-speed');
const fullscreenBtn = document.querySelector('.fullscreen');

// Play & Pause ----------------------------------- //
const showPlayIcon = () => {
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'play');
};

const togglePlay = () => {
  if (video.paused) {
    video.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'pause');
  } else {
    video.pause();
    showPlayIcon();
  }
};

// Progress Bar ---------------------------------- //
const displayTime = (time, elToTextContent) => {
  const m = (Math.floor(time / 60) + '').padStart(2, '0');
  const s = (Math.floor(time % 60) + '').padStart(2, '0');
  elToTextContent.textContent = `${m}:${s}`;
};

const updateProgress = () => {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  displayTime(video.currentTime, currentTIme);
  displayTime(video.duration, duration);
};

const setProgress = e => {
  newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = newTime * 100 + '%';
  video.currentTime = newTime * video.duration;
};

// Volume Controls --------------------------- //
let lastVolume = video.volume;

const changeVolume = e => {
  let newVolume = e.offsetX / volumeRange.offsetWidth;
  if (newVolume < 0.1) newVolume = 0;
  if (newVolume > 0.9) newVolume = 1;
  volumeBar.style.width = newVolume * 100 + '%';
  video.volume = newVolume;

  // CHANGE ICON DEPENDING ON VOLUME
  volumeIcon.className = '';
  if (newVolume > 2 / 3) volumeIcon.classList.add('fas', 'fa-volume-up');
  if (newVolume < 2 / 3 && newVolume > 0)
    volumeIcon.classList.add('fas', 'fa-volume-down');
  if (newVolume === 0) volumeIcon.classList.add('fas', 'fa-volume-off');
  lastVolume = newVolume;
};

const toggleMute = () => {
  volumeIcon.className = '';
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeBar.style.width = 0;
    volumeIcon.classList.add('fas', 'fa-volume-mute');
    volumeIcon.setAttribute('title', 'Unmute');
  } else {
    video.volume = lastVolume;
    volumeBar.style.width = lastVolume * 100 + '%';
    if (lastVolume > 2 / 3) volumeIcon.classList.add('fas', 'fa-volume-up');
    else volumeIcon.classList.add('fas', 'fa-volume-down');
    volumeIcon.setAttribute('title', 'Mute');
  }
};

// Change Playback Speed -------------------- //
const changeSpeed = () => (video.playbackRate = speed.value);

// Fullscreen ------------------------------- //
// prettier-ignore
function openFullscreen(elem) {
  if (elem.requestFullscreen) elem.requestFullscreen();
  else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen(); /* Safari */
  else if (elem.msRequestFullscreen) elem.msRequestFullscreen(); /* IE11 */
  video.classList.add('video-fullscreen');
}

/* Close fullscreen */
// prettier-ignore
function closeFullscreen() {
  if (document.exitFullscreen) document.exitFullscreen();
  else if (document.webkitExitFullscreen) document.webkitExitFullscreen(); /* Safari */
  else if (document.msExitFullscreen) document.msExitFullscreen(); /* IE11 */
  video.classList.remove('video-fullscreen');
}

let fullscreen = false;
const toggleFullscreen = () => {
  !fullscreen ? openFullscreen(player) : closeFullscreen();
  fullscreen = !fullscreen;
};

// Event listeners ------------------------------- //
[playBtn, video].forEach(el => el.addEventListener('click', togglePlay));
video.addEventListener('ended', showPlayIcon);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);
