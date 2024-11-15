let focusButton = document.getElementById("focus");
let buttons = document.querySelectorAll(".btn");
let shortBreakButton = document.getElementById("short-break");
let longBreakButton = document.getElementById("long-break");
let startBtn = document.getElementById("btn-start");
let resetBtn = document.getElementById("btn-reset");
let pauseBtn = document.getElementById("btn-pause");
let time = document.getElementById("time");
let set;
let active = "focus";
let count = 59;
let paused = true;
let minCount = 24;

time.textContent = `${minCount + 1}:00`;

const appendZero = (num) => {
  return num < 10 ? `0${num}` : num;
};

resetBtn.addEventListener(
  "click",
  (resetTime = () => {
    pauseTimer();

    switch (active) {
      case "long":
        minCount = 14;
        break;
      case "short":
        minCount = 4;
        break;
      default:
        minCount = 24;
        break;
    }

    count = 59;

    time.textContent = `${minCount + 1}:00`;
  })
);

const removeFocus = () => {
  buttons.forEach((button) => {
    button.classList.remove("btn-focus");
  });
};

focusButton.addEventListener("click", () => {
  removeFocus();
  focusButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 24;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});

shortBreakButton.addEventListener("click", () => {
  active = "short";
  removeFocus();
  shortBreakButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 4;
  count = 59;
  time.textContent = `${appendZero(minCount + 1)}:00`;
});

longBreakButton.addEventListener("click", () => {
  active = "long";
  removeFocus();
  longBreakButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 14;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});

pauseBtn.addEventListener(
  "click",
  (pauseTimer = () => {
    paused = true;
    clearInterval(set);
    startBtn.classList.remove("hide");
    pauseBtn.classList.remove("show");
    pauseBtn.classList.add("hide");
    resetBtn.classList.remove("show");
    resetBtn.classList.add("hide");
  })
);

startBtn.addEventListener("click", () => {
  resetBtn.classList.remove("hide");
  resetBtn.classList.add("show");
  pauseBtn.classList.remove("hide");
  pauseBtn.classList.add("show");
  startBtn.classList.remove("show");
  startBtn.classList.add("hide");

  if (paused) {
    paused = false;
    time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
    set = setInterval(() => {
      count--;
      time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
      if (count == 0) {
        if (minCount != 0) {
          minCount--;
          count = 60;
        } else {
          clearInterval(set);
        }
      }
    }, 1000);
  }
});
