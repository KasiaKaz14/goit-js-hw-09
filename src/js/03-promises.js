import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const promisesAmountInput = document.querySelector('[name="amount"]');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const delayStart = parseInt(event.target.delay.value);
  const step = parseInt(event.target.step.value);
  const amount = parseInt(promisesAmountInput.value);

  let delay = delayStart;

  for (let i = 0; i < amount; i++) {
    let position = i + 1;
    createPromise(position, delay, amount)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    delay += step;
  }
});

function createPromise(position, delay, amount) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    });
  });
}
