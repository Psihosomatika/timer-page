const jsSeconds = document.querySelector(".js-seconds");
const jsMinutes = document.querySelector(".js-minutes");
const timerBlock = document.querySelector(".header__timer-block");
const popup = document.querySelector(".popup");
const closeBtn = document.querySelector(".popup__close");
const formCards = document.querySelector(".form__cards");
const popupForm = document.querySelector(".popup-form-wrapper");
const discount = ["30", "40", "50", "70"];
const popupDiscount = ["40", "50", "60"];
const textCard = [
  "Чтобы просто начать 👍🏻",
  "Привести тело впорядок 💪🏻",
  "Изменить образ жизни 🔥",
  "Всегда быть в форме <span class='card__special'>и поддерживать своё здоровье</span> ⭐️",
];
const popupTextCard = [
  "Чтобы просто начать 👍🏻",
  "Привести тело впорядок 💪🏻",
  "Изменить образ жизни 🔥",
];
closeBtn.addEventListener("click", () => {
  popup.classList.remove("popup_visable");
});

const createCard = (i, arrPersent, name, discountedPrice, price, arrText) => {
  return `
      <input class="card__input"
        type="radio"
        name="tariff-selection"
        id="one-week">
      <div class="card__discount-block">
        <svg class="card__icon">
          <use xlink:href="assets/icon/sprite.svg#star"></use>
        </svg>
        <span class="card__discount">-${arrPersent[i]}%</span>
      </div>
      <h2 class="card__title">${name[i]}</h2>
      <div class="card__price-wrapper">
        <p class="card__discounted-price">${discountedPrice[i]}₽</p>
        <p class="card__price">${price[i]}₽</p>
      </div>
      <p class="card__text">${arrText[i]}</p>
    `;
};
const createCardWithoutDiscount = (i, name, price, arrText) => {
  return `
      <input class="card__input"
        type="radio"
        name="tariff-selection"
        id="one-week">
      <h2 class="card__title">${name[i]}</h2>
      <div class="card__price-wrapper">
        <p class="card__discounted-price card__discounted-price_without-discont">${price[i]}₽</p>
      </div>
      <p class="card__text card__text_stop-card">${arrText[i]}</p>
    `;
};
const createPopupCard = (i, name, price, discountPrice, discount) => {
  return `
      <h2 class="card__title card__title-popup">${name[i]}</h2>
      <input class="card__input"
              type="radio"
              name="tariff-selection"
              id="one-week">
      <div class="card__checked"></div>
      <p class="card__price card__price_popup">${price[i]}₽</p>
      <hr class="card__line">
      <div class="card__discounted-popup-wrapper">
        <p class="card__discounted-price card__discounted-price_popup">${discountPrice[i]}₽</p>
        <div class="card__discount-block card__discount-block_popup">
          <svg class="card__icon card__icon_popup">
            <use xlink:href="assets/icon/sprite.svg#star"></use>
          </svg>
          <span class="card__discount">-${discount[i]}%</span>
        </div>
      </div>
  `;
};
const addCard = (container, elem) => {
  container.append(elem);
};
const arrName = [];
const arrPrice = [];
const arrDiscountedPrice = [];
const popupPrise = [];
async function getPosts() {
  const url = "https://t-pay.iqfit.app/subscribe/list-test";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Запрос не удался!");
  }
  const data = await response.json();
  //данные с сервера
  data.forEach((elem) => {
    if (elem.isPopular) {
      arrName.push(elem.name);
      arrDiscountedPrice.push(elem.price);
    }
    if (!elem.isPopular && !elem.isDiscount) {
      arrPrice.push(elem.price);
    }
    if (elem.isDiscount) {
      popupPrise.push(elem.price);
    }
  });

  //отрисовываю карточки со скидкой
  for (let i = 0; i < 4; i++) {
    const label = document.createElement("label");
    if (i == 3) {
      label.classList.add("card");
      label.classList.add("card-big");
    } else {
      label.classList.add("card");
    }
    label.innerHTML = createCard(
      i,
      discount,
      arrName,
      arrDiscountedPrice,
      arrPrice,
      textCard
    );
    addCard(formCards, label);
  }
  //отрисовываю карточки в попап
  for (let i = 0; i < 3; i++) {
    const label = document.createElement("label");
    label.classList.add("card");
    label.classList.add("card_popup");
    label.innerHTML = createPopupCard(
      i,
      arrName,
      arrPrice,
      popupPrise,
      popupDiscount
    );
    addCard(popupForm, label);
  }
}

getPosts();
let twoMinutes = 3;
const timer = () => {
  const minets = Math.trunc(twoMinutes / 60);
  jsMinutes.textContent = `0${minets}`;
  if (twoMinutes % 60 == 0) {
    jsSeconds.textContent = "00";
  }
  const seconds = twoMinutes - minets * 60;
  if (seconds < 31 && minets < 1) {
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
    formCards.classList.add("scale-out-bl");
    setTimeout(() => {
      formCards.innerHTML = "";
      //отрисовываю новые карточки без скидки
      for (let i = 0; i < 4; i++) {
        const label = document.createElement("label");
        if (i == 3) {
          label.classList.add("card");
          label.classList.add("card-big");
        } else {
          label.classList.add("card");
        }
        label.innerHTML = createCardWithoutDiscount(
          i,
          arrName,
          arrPrice,
          textCard
        );
        addCard(formCards, label);
      }
      formCards.classList.remove("scale-out-bl");
      formCards.classList.add("scale-in-bl");
    }, 1000);
    setTimeout(() => {
      popup.classList.add("popup_visable");
    }, 10000);
  }
};

const intervalID = setInterval(timer, 1000);
