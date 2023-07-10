import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const dateTime = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let intervalidId;
startBtn.disabled = true;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      return window.alert('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
  },
});

startBtn.addEventListener('click', updateCounter);

function addLeadingZero(value) {
  if (value.toString().length === 1) {
    return value.toString().padStart();
  } else {
    return value;
  }
}

function updateCounter() {
  const selectedDate = dateTime.value;
  const selectedDateMs = new Date(selectedDate).getTime();
  intervalId = setInterval(() => {
    let currentDate = new Date().getTime();
    const difference = selectedDateMs - currentDate;
    const timeLeftConvertMs = convertMs(difference);
    if (timeLeftConvertMs.seconds >= 0) {
      daysEl.textContent = addLeadingZero(timeLeftConvertMs.days);
      hoursEl.textContent = addLeadingZero(timeLeftConvertMs.hours);
      minutesEl.textContent = addLeadingZero(timeLeftConvertMs.minutes);
      secondsEl.textContent = addLeadingZero(timeLeftConvertMs.seconds);
    } else {
      clearInterval(intervalId);
    }
  });
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
