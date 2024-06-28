const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');

function switchMode(isLight) {
  nav.style.backgroundColor = isLight
    ? 'rgba(255, 255, 255, 0.5)'
    : 'rgba(0, 0, 0, 0.5)';
  textBox.style.backgroundColor = isLight
    ? 'rgba(0, 0, 0, 0.5)'
    : 'rgba(255, 255, 255, 0.5)';
  toggleIcon.children[0].textContent = isLight ? 'Light Mode' : 'Dark Mode';
  toggleIcon.children[1].classList.remove(isLight ? 'fa-moon' : 'fa-sun');
  toggleIcon.children[1].classList.add(isLight ? 'fa-sun' : 'fa-moon');
  image1.src = `img/undraw_proud_coder_${isLight ? 'light' : 'dark'}.svg`;
  image2.src = `img/undraw_conceptual_idea_${isLight ? 'light' : 'dark'}.svg`;
  image3.src = `img/undraw_feeling_proud_${isLight ? 'light' : 'dark'}.svg`;
}

function darkTheme() {
  localStorage.setItem('theme', 'dark');
  document.documentElement.setAttribute('data-theme', 'dark');
  switchMode(false);
}

function lightTheme() {
  localStorage.setItem('theme', 'light');
  document.documentElement.setAttribute('data-theme', 'light');
  switchMode(true);
}

toggleSwitch.addEventListener('change', function switchTheme(e) {
  if (e.target.checked) darkTheme();
  else lightTheme();
});

const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
  darkTheme();
  toggleSwitch.checked = true;
} else lightTheme();
