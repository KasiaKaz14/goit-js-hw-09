import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
flatpickr('input[type=text]', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
});

const dateTime = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const counter = document.querySelectorAll('.value');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

startBtn.addEventListener('click', updateCounter);
counter.addEventListener('click, calendar');

let intervalId;

function updateCounter() {
  intervalId = setInterval(() => {
    const selectedDate = new Date(dateTime.value);
    const difference = selectedDate.getTime() - Date.now();
    counter.textContent = `${days}, ${hours}, ${minutes}, ${seconds}`;
  }, 1000);
}

function onClose() {
  dateTime.remove();
  updateCounter();
}

function calendar() {
  if (options.defaultDate !== new Date(dateTime.value)) {
    startBtn.disabled = true;
    updateCounter();
  }

  return window.alert('Please choose a date in the future');
}

function addLeadingZero() {
  padStart();
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
