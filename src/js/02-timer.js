import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputCalendarElement = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
let idIntervalTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //   console.log(selectedDates[0]);
      if (selectedDates[0] <= options.defaultDate) {
        //   window.alert('Please choose a date in the future');
          Notify.failure('Please choose a date in the future');
          startButton.setAttribute('disabled', true);
      } else {
          startButton.removeAttribute('disabled');
      }

  },
};

// Initialize flatpickr
flatpickr(inputCalendarElement, options);

startButton.addEventListener('click', () => {
    // startButton.setAttribute('disabled', true);
    idIntervalTime = setInterval(updateTime, 1000);
});

function updateTime() {
    const selectedDate = new Date(inputCalendarElement.value);
    // console.log(selectedDate);
    const currentDay = new Date();
    const timeDiffence = selectedDate - currentDay;

    if (timeDiffence <= 0) {
        clearInterval(idIntervalTime);
        return;
    } 

    const { days, hours, minutes, seconds } = convertMs(timeDiffence);

    dataDays.textContent = addLeadingZero(days);
    dataHours.textContent = addLeadingZero(hours);
    dataMinutes.textContent = addLeadingZero(minutes);
    dataSeconds.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
   return value.toString().padStart(2, '0');
}