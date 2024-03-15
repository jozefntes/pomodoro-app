const bells = new Audio("./sounds/bell.wav");
const startBtn = document.querySelector(".btn-start");
const resetBtn = document.querySelector(".btn-reset");
const pauseBtn = document.querySelector(".btn-pause");
const sessionMin = document.querySelector(".minutes");
const sessionSec = document.querySelector(".seconds");
const timerAlert = document.querySelector("#timer-alert");
let myInterval;
let state = true;

const appTimer = () => {
  const minAmount = Number.parseInt(sessionMin.textContent);
  const secAmount = Number.parseInt(sessionSec.textContent);
  timerAlert.textContent = "";
  pauseBtn.style.display = "inline-block";
  startBtn.style.display = "none";

  if (state) {
    state = false;
    let totalSeconds = minAmount * 60 + secAmount;

    const updateSeconds = () => {
      const minuteDiv = document.querySelector(".minutes");
      const secondDiv = document.querySelector(".seconds");

      totalSeconds--;

      let minutesLeft = Math.floor(totalSeconds / 60);
      let secondsLeft = totalSeconds % 60;

      if (secondsLeft < 10) {
        secondDiv.textContent = "0" + secondsLeft;
      } else {
        secondDiv.textContent = secondsLeft;
      }
      minuteDiv.textContent = `${minutesLeft}`;

      if (minutesLeft === 0 && secondsLeft === 0) {
        bells.play();
        resetTimer();
        timerAlert.textContent = "Time's Up!";
      }
    };

    myInterval = setInterval(updateSeconds, 1000);
  } else {
    alert("Session has already started.");
  }
};

const resetTimer = () => {
  // stop the loop
  clearInterval(myInterval);
  state = true;

  // select text divs
  const minuteDiv = document.querySelector(".minutes");
  const secondDiv = document.querySelector(".seconds");

  // reset the time
  minuteDiv.textContent = "25";
  secondDiv.textContent = "00";
  timerAlert.textContent = "";

  //reset button displays
  startBtn.style.display = "inline-block";
  pauseBtn.style.display = "none";
};

const pauseTime = () => {
  clearInterval(myInterval);
  pauseBtn.style.display = "none";
  startBtn.style.display = "inline-block";
  state = true;
};

startBtn.addEventListener("click", appTimer);
resetBtn.addEventListener("click", resetTimer);
pauseBtn.addEventListener("click", pauseTime);
