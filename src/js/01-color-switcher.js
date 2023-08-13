const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let colorBackground;
let timeIdChangeColor = null;
stopBtn.setAttribute('disabled', true);

startBtn.addEventListener('click', () => {
    startBtn.setAttribute('disabled', true);
    stopBtn.removeAttribute('disabled');
    timeIdChangeColor = setInterval(
        onStartChangeColor, 1000);
});

stopBtn.addEventListener('click', onStopChangeColor)

function onStartChangeColor() {
    colorBackground = getRandomHexColor();
    document.body.style.backgroundColor = colorBackground;
}

function onStopChangeColor() {
    startBtn.removeAttribute('disabled');
    stopBtn.setAttribute('disabled', true);
    clearInterval(timeIdChangeColor);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}