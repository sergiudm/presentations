const slides = [...document.querySelectorAll('.slide')];
const dots = [...document.querySelectorAll('[data-slide]')];
const deck = document.querySelector('.deck');
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');
const progress = document.querySelector('.progress');
const slideNumber = document.querySelector('.slide-number');
const fullscreen = document.querySelector('#fullscreen');
const timer = document.querySelector('.timer');
const timerToggle = document.querySelector('#timer-toggle');
const timerReset = document.querySelector('#timer-reset');
const timerTime = document.querySelector('#timer-time');

const slideCount = slides.length;
const presentationSeconds = 6 * 60;
let current = 0;
let pointerStart = null;
let remaining = presentationSeconds;
let timerRunning = false;
let timerEnd = null;
let timerInterval = null;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

function goTo(index) {
  current = Math.min(slideCount - 1, Math.max(0, index));
  slides.forEach((slide, slideIndex) => {
    const active = slideIndex === current;
    slide.classList.toggle('is-active', active);
    slide.setAttribute('aria-hidden', String(!active));
  });
  dots.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === current));
  previous.disabled = current === 0;
  next.disabled = current === slideCount - 1;
  progress.setAttribute('aria-label', `Slide ${current + 1} of ${slideCount}`);
  slideNumber.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slideCount).padStart(2, '0')}`;
}

function paintTimer() {
  timerTime.textContent = formatTime(remaining);
  timer.classList.toggle('is-urgent', remaining <= 60);
  timer.classList.toggle('is-finished', remaining === 0);
  timerToggle.setAttribute('aria-label', timerRunning ? 'Pause six-minute timer' : 'Start six-minute timer');
}

function stopTimer() {
  timerRunning = false;
  if (timerInterval) window.clearInterval(timerInterval);
  timerInterval = null;
  paintTimer();
}

function startTimer() {
  if (remaining === 0) remaining = presentationSeconds;
  timerRunning = true;
  timerEnd = Date.now() + remaining * 1000;
  timerInterval = window.setInterval(() => {
    remaining = Math.max(0, Math.ceil((timerEnd - Date.now()) / 1000));
    paintTimer();
    if (remaining === 0) stopTimer();
  }, 250);
  paintTimer();
}

function toggleTimer() {
  if (timerRunning) stopTimer();
  else startTimer();
}

function resetTimer() {
  stopTimer();
  remaining = presentationSeconds;
  timerEnd = null;
  paintTimer();
}

async function toggleFullscreen() {
  if (document.fullscreenElement) await document.exitFullscreen();
  else await document.documentElement.requestFullscreen();
}

previous.addEventListener('click', () => goTo(current - 1));
next.addEventListener('click', () => goTo(current + 1));
dots.forEach((dot) => dot.addEventListener('click', () => goTo(Number(dot.dataset.slide))));
fullscreen.addEventListener('click', toggleFullscreen);
timerToggle.addEventListener('click', toggleTimer);
timerReset.addEventListener('click', resetTimer);

deck.addEventListener('pointerdown', (event) => { pointerStart = event.clientX; });
deck.addEventListener('pointerup', (event) => {
  if (pointerStart === null) return;
  const distance = event.clientX - pointerStart;
  pointerStart = null;
  if (Math.abs(distance) < 50) return;
  goTo(distance < 0 ? current + 1 : current - 1);
});

window.addEventListener('keydown', (event) => {
  if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(event.key)) {
    event.preventDefault();
    goTo(current + 1);
  }
  if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key)) {
    event.preventDefault();
    goTo(current - 1);
  }
  if (event.key === 'Home') goTo(0);
  if (event.key === 'End') goTo(slideCount - 1);
  if (event.key.toLowerCase() === 'f') toggleFullscreen();
  if (event.key.toLowerCase() === 't') toggleTimer();
  if (event.key.toLowerCase() === 'r') resetTimer();
});

goTo(0);
paintTimer();
