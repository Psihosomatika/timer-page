const popup = document.querySelector(".popup");
const closeBtn = document.querySelector(".popup__close");
closeBtn.addEventListener("click", () => {
  popup.classList.remove("popup_visable");
});
// popup_visable
let twoMinutes = 120;
const timer = () => {
  const minets = twoMinutes / 60;
  const second = twoMinutes;
  console.log("минуты");
  console.log(minets);
  console.log("секунды");
  twoMinutes -= 1;
  console.log(twoMinutes);
  // 120000 - 2 минуты
  if (twoMinutes === 0) {
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
