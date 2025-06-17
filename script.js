let startTime, updatedTime, difference, timerInterval;
let running = false;
let laps = [];

function start() {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    timerInterval = setInterval(updateTime, 1000);
    running = true;
  }
}

function pause() {
  if (running) {
    clearInterval(timerInterval);
    difference = new Date().getTime() - startTime;
    running = false;
  }
}

function reset() {
  clearInterval(timerInterval);
  document.getElementById('display').innerText = '00:00:00';
  document.getElementById('laps').innerHTML = '';
  difference = 0;
  running = false;
  laps = [];
}

function updateTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  let hours = Math.floor(difference / (1000 * 60 * 60));
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);

  document.getElementById('display').innerText = 
    `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(unit) {
  return unit < 10 ? '0' + unit : unit;
}

function lap() {
  if (running) {
    const lapTime = document.getElementById('display').innerText;
    laps.push(lapTime);
    const lapList = document.getElementById('laps');
    const li = document.createElement('li');
    li.innerText = `Lap ${laps.length}: ${lapTime}`;
    lapList.appendChild(li);
  }
}
