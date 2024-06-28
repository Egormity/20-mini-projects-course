const imgContainer = document.querySelector('.img-container');

let randomNum = Math.ceil(Math.random() * 9999);

function addImg() {
  randomNum++;
  const imgAdd = `<img src="https://random.imagecdn.app/1920/1080?random=${randomNum}" / class="img img-${randomNum}">`;
  imgContainer.insertAdjacentHTML('beforeend', imgAdd);
}

function repeatFunction(func, times) {
  for (let i = 0; i < times; i++) {
    func();
  }
}

function onVisible(element, callback) {
  new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        callback(element);
        observer.disconnect();
      }
    });
  }).observe(element);
  if (!callback) return new Promise(r => (callback = r));
}

repeatFunction(addImg, 10);

setInterval(() => {
  addImg();
}, 1000);
