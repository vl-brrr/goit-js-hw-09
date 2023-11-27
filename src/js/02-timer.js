import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

function convertMs(ms) {
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

// flatpickr
let selectedDate = '';
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
  },
};
const datePicker = document.querySelector('#datetime-picker');
flatpickr(datePicker, options);

// Задання стилів
const fields = document.querySelectorAll('.field');
const values = document.querySelectorAll('.value');
const timer = document.querySelector('.timer');
timer.style.display = 'flex';
timer.style.gap = '10px';
timer.style.padding = '10px';
fields.forEach(field => {
  field.style.display = 'flex';
  field.style.flexDirection = 'column';
  field.style.alignItems = 'center';
});
values.forEach(value => {
  value.style.fontSize = '28px';
});

//
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');
const btnStart = document.querySelector('button[data-start]');

btnStart.addEventListener('click', handleTimer);

function handleTimer() {
  if (selectedDate <= new Date()) {
    Report.failure('Please choose a date in the future', '');
  } else {
    const timeId = setInterval(() => {
      const timeTill = convertMs(selectedDate - new Date());
      days.textContent = addLeadingZero(timeTill.days);
      hours.textContent = addLeadingZero(timeTill.hours);
      minutes.textContent = addLeadingZero(timeTill.minutes);
      seconds.textContent = addLeadingZero(timeTill.seconds);
      selectedDate--;
      if (selectedDate - new Date() <= 999) {
        clearInterval(timeId);
      }
    }, 1000);
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
