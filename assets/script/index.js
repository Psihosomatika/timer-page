const jsSeconds = document.querySelector(".js-seconds");
const jsMinutes = document.querySelector(".js-minutes");
const timerBlock = document.querySelector(".header__timer-block");
const popup = document.querySelector(".popup");
const closeBtn = document.querySelector(".popup__close");

closeBtn.addEventListener("click", () => {
  popup.classList.remove("popup_visable");
});
// popup_visable
//120
let twoMinutes = 40;
const timer = () => {
  const minets = Math.trunc(twoMinutes / 60);
  jsMinutes.textContent = `0${minets}`;
  if (twoMinutes % 60 == 0) {
    jsSeconds.textContent = "00";
  }
  const seconds = twoMinutes - minets * 60;
  if (seconds < 31) {
    timerBlock.classList.add("header__timer-block_warning");
  }
  if (seconds > 9) {
    jsSeconds.textContent = `${seconds}`;
  } else {
    jsSeconds.textContent = `0${seconds}`;
  }
  twoMinutes -= 1;
  if (twoMinutes === -1) {
    clearInterval(intervalID);
  }
};
const intervalID = setInterval(timer, 1000);
// let time = 10; // Задаём начальное время
// const timer = setInterval(() => {
//   document.getElementById("countdown").textContent =
//     time <= 0
//       ? clearInterval(timer) // Останавливаем таймер, поскольку время истекло
//       : time--; // С каждой секундой уменьшаем время
// }, 1000); // Интервал делаем одной секунды
