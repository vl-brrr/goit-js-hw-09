function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const background = document.querySelector('body');
let timerId = null;

btnStart.addEventListener('click', handleStart);
btnStop.addEventListener('click', handleStop);

function handleStart() {
  timerId = setInterval(() => {
    background.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStart.setAttribute('disabled', 'disabled');
  if (btnStop.getAttribute('disabled')) {
    btnStop.removeAttribute('disabled');
  }
}

function handleStop() {
  clearInterval(timerId);
  btnStart.removeAttribute('disabled');
  btnStop.setAttribute('disabled', 'disabled');
}
