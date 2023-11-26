import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';

const form = document.querySelector('.form');
form.addEventListener('submit', hadleSubmit);

function hadleSubmit(event) {
  event.preventDefault();
  const { delay, step, amount } = event.target.elements;
  let j = +delay.value;

  if (+delay.value < 0 || +step.value < 0 || +amount.value <= 0) {
    Report.failure('Error', 'Please enter a value of 0 or greater');
  } else {
    for (let i = 1; i <= +amount.value; i++) {
      createPromise(i, j)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
            timeout: 5000,
          });
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
            timeout: 5000,
          });
        });
      j += +step.value;
    }
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
