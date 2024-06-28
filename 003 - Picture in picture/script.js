const videoEl = document.getElementById('video');
const btnEl = document.getElementById('btn');

// Prompt to select media strim, pass to video el, play
async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoEl.srcObject = mediaStream;
    videoEl.onloadedmetadata = () => {
      videoEl.play();
    };
  } catch (error) {
    console.error('ERROR!!!', error);
  }
}

btnEl.addEventListener('click', async () => {
  // Disable
  btnEl.disabled = true;

  // Start pic in pic
  await videoEl.requestPictureInPicture();

  // Reset btn
  btnEl.disabled = false;
});

// On load
selectMediaStream();
