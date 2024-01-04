let startTime;
let running = false;
let lapStartTime;

function startStopwatch() {
    if (!running) {
        startTime = Date.now() - (lapStartTime || 0);
        running = true;
        updateDisplay();
    }
}

function pauseStopwatch() {
    if (running) {
        running = false;
        lapStartTime = Date.now() - startTime;
    }
}

function resetStopwatch() {
    if (running) {
        running = false;
        lapStartTime = 0;
    }
    startTime = 0;
    updateDisplay();
    clearLapTimes();
}

function recordLap() {
    if (running) {
        const lapTime = Date.now() - startTime;
        const formattedTime = formatTime(lapTime);
        const lapTimesContainer = document.getElementById('lap-times');
        const lapItem = document.createElement('li');
        lapItem.textContent = formattedTime;
        lapTimesContainer.appendChild(lapItem);
    }
}

function updateDisplay() {
    const elapsedTime = running ? Date.now() - startTime : lapStartTime;
    const formattedTime = formatTime(elapsedTime);
    document.getElementById('display').textContent = formattedTime;
    setTimeout(updateDisplay, 10);
}

function formatTime(time) {
    const totalSeconds = Math.floor(time / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((time % 1000) / 10);
    
    return `${formatDigits(minutes)}:${formatDigits(seconds)}:${formatDigits(milliseconds)}`;
}

function formatDigits(value) {
    return value < 10 ? `0${value}` : value;
}

function clearLapTimes() {
    const lapTimesContainer = document.getElementById('lap-times');
    lapTimesContainer.innerHTML = '';
}

// Initialize the display
updateDisplay();
