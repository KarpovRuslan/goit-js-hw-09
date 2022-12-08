import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    btnStart: document.querySelector('button'),
    dataDate: document.querySelector('[data-days]'),
    dataHours: document.querySelector('[data-hours]'),
    dataMin: document.querySelector('[data-minutes]'),
    dataSec: document.querySelector('[data-seconds]'),
}

const { btnStart, dataDate, dataHours, dataMin, dataSec } = refs;

const inputField = document.querySelector('#datetime-picker');

let timerId = null;
btnAvailability(btnStart, true);

function conversionMs(ms) {
    const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime()< Date.now()) {
            return Notify.failure('Please choose a date in the future');
      }
        btnAvailability(btnStart, false);
  },
};

const flatPickrForm = flatpickr(inputField, options);


function newTimerElem() {
    const delta = getDeltaTime(flatPickrForm.selectedDates[0].getTime());

    if (delta<1000) {
        clearInterval(timerId);
    }

    dataDate.textContent = addLeadingZero(conversionMs(delta).days);
    dataHours.textContent = addLeadingZero(conversionMs(delta).hours);
    dataMin.textContent = addLeadingZero(conversionMs(delta).minutes);
    dataSec.textContent = addLeadingZero(conversionMs(delta).seconds);
    
}
function onBtnClickStartTimer() {
    btnAvailability(btnStart, true);
    timerId = setInterval(newTimerElem, 1000);
}

function getDeltaTime(pickedTime) {
    return pickedTime - Date.now();
}

btnStart.addEventListener('click', onBtnClickStartTimer);

function btnAvailability(btnStart, feature) {
    btnStart.disabled = feature;
}



