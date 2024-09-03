const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const setTimerButton = document.getElementById('set-timer');
const startTimerButton = document.getElementById('start-timer');
const pauseTimerButton = document.getElementById('pause-timer');
const resumeTimerButton = document.getElementById('resume-timer');
const resetTimerButton = document.getElementById('reset-timer');
const timerDisplay = document.getElementById('timer-display');

// Timer variables
let timerInterval;
let totalTime;
let remainingTime;
let isPaused = false;

// Function to format time as HH:MM:SS
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
}

// Function to update the timer display
function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(remainingTime);
}

// Function to start the timer
function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = '00:00:00';
            alert('Time is up!');
            return;
        }
        remainingTime--;
        updateTimerDisplay();
    }, 1000);
}

// Function to set the timer
function setTimer() {
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    totalTime = hours * 3600 + minutes * 60 + seconds;
    remainingTime = totalTime;
    updateTimerDisplay();
    startTimerButton.disabled = false;
    pauseTimerButton.disabled = false;
    resumeTimerButton.disabled = true;
    resetTimerButton.disabled = false;
}

// Function to pause the timer
function pauseTimer() {
    clearInterval(timerInterval);
    isPaused = true;
}

// Function to resume the timer
function resumeTimer() {
    if (isPaused) {
        startTimer();
        isPaused = false;
    }
}

// Function to reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    remainingTime = totalTime;
    updateTimerDisplay();
    startTimerButton.disabled = false;
    pauseTimerButton.disabled = true;
    resumeTimerButton.disabled = true;
    resetTimerButton.disabled = true;
}

// Event listeners
setTimerButton.addEventListener('click', setTimer);
startTimerButton.addEventListener('click', startTimer);
pauseTimerButton.addEventListener('click', pauseTimer);
resumeTimerButton.addEventListener('click', resumeTimer);
resetTimerButton.addEventListener('click', resetTimer);

// Initialize
updateTimerDisplay();
