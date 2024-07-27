let startTime, elapsedTime = 0, timerInterval;
let isRunning = false;
let lapCount = 1;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapList = document.getElementById('lap-list');

startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);

function startStopwatch() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateStopwatch, 10);
    isRunning = true;
    startButton.textContent = 'Lap';
  } else {
    addLap();
  }
}

function pauseStopwatch() {
  if (isRunning) {
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
    isRunning = false;
    startButton.textContent = 'Resume';
  }
}

function resetStopwatch() {
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  lapCount = 1;
  updateDisplay(0, 0, 0);
  startButton.textContent = 'Start';
  lapList.innerHTML = '';
}

function updateStopwatch() {
  elapsedTime = Date.now() - startTime;
  updateDisplay(
    Math.floor((elapsedTime / 60000) % 60),
    Math.floor((elapsedTime / 1000) % 60),
    Math.floor((elapsedTime / 10) % 100)
  );
}

function updateDisplay(minutes, seconds, milliseconds) {
  minutesDisplay.textContent = pad(minutes, 2);
  secondsDisplay.textContent = pad(seconds, 2);
  millisecondsDisplay.textContent = pad(milliseconds, 2);
}

function addLap() {
  const lapTime = `Lap ${lapCount}: ${pad(Math.floor((elapsedTime / 60000) % 60), 2)}:${pad(Math.floor((elapsedTime / 1000) % 60), 2)}:${pad(Math.floor((elapsedTime / 10) % 100), 2)}`;
  const lapItem = document.createElement('li');
  lapItem.textContent = lapTime;
  lapList.appendChild(lapItem);
  lapCount++;
}

function pad(number, length) {
  return number.toString().padStart(length, '0');
}