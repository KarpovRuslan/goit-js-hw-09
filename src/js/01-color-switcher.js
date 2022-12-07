const btnClickStart = document.querySelector('button[data-start]');
const btnClickStop = document.querySelector('button[data-stop]');
let timerId = null;
btnClickStop.disabled = true;

const onClickColorChange = () => {
    btnClickStart.disabled = true;
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    btnClickStop.disabled = false;
}


btnClickStart.addEventListener('click', onClickColorChange);
btnClickStop.addEventListener('click', () => {
    clearInterval(timerId);
    btnClickStop.disabled = true;
    btnClickStart.disabled = false;
});


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}