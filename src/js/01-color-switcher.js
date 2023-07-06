const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

let intervalId;
let newColor;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function setBgColor() {
  intervalId = setInterval(() => {
    startBtn.disabled = true;
    newColor = getRandomHexColor();
    body.style.backgroundColor = newColor;
  }, 1000);
}

function stopColor() {
  clearInterval(intervalId);
  body.style.backgroundColor = newColor;
  startBtn.disabled = false;
}

startBtn.addEventListener('click', setBgColor);
stopBtn.addEventListener('click', stopColor);
