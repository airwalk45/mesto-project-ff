/*=====================
Блок импорта
=======================*/
import "./pages/index.css"; //Главный CSS
import {
  addCard,
  removeCard,
  addLikeToCard
} from "./scripts/cards.js";  //функции карточек
import { openModal, closeModal } from "./scripts/modal.js";   //функции попапов
import { initialCards } from "./scripts/initialCards.js";   //базовые страницы при загрузке

/*=====================
Блок констант
=======================*/
const cardList = document.querySelector(".places__list"); // список карточек
const cardTemplate = document.querySelector("#card-template").content; // темплейт карточки
const addCardObj = {
  item: '',
  removeCard: removeCard,
  cardTemplate : cardTemplate,
  addLikeToCard: addLikeToCard,
  zoomCardImg: zoomCardImg,
};  // объект с необходимым содержимым для функции создания карточки
const buttonNewCard = document.querySelector(".profile__add-button");// кнопка добавления новой карточки
const buttonEdit = document.querySelector(".profile__edit-button");// кнопка редактирования заголовка страницы
const modalNewCard = document.querySelector(".popup_type_new-card");// попап добавления новой карточки
const modalEdit = document.querySelector(".popup_type_edit");// попап добавления новой карточки
const modalImageZoom = document.querySelector(".popup_type_image");// попап увеличенного просмотра карточки
const popups = document.querySelectorAll(".popup"); //Массив всех всплывающих окон с общим классом

const profileForm = document.querySelector('[name="edit-profile"]');// форма редактирования шапки страницы
const nameInput = profileForm.querySelector('[name="name"]');// поле ввода имени в форме для шапки страницы
const jobInput = profileForm.querySelector('[name="description"]');// поле ввода описания в форме для шапки страницы

const profileTitle = document.querySelector(".profile__title");// имя в шапке страницы
const profileDescription = document.querySelector(".profile__description");// описание в шапке страницы

const formNewCard = document.querySelector('[name="new-place"]');
const placeName = formNewCard.querySelector('[name="place-name"]');
const linkUrl = formNewCard.querySelector('[name="link"]');

/*=====================
Блок функций
=======================*/
// @todo: Функция zoom карточки
function zoomCardImg(evt) {
  const popupImage = document.querySelector(".popup__image"); //изображение на всплывающем окне "Зум изображения"
  const popupCaption = document.querySelector(".popup__caption"); //подпись на всплывающем окне "Зум изображения"
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  openModal(modalImageZoom);
}

function addCardElement(item, method = "prepend") {
  addCardObj.item = item;
  const cardElement = addCard(addCardObj);
  cardList[method](cardElement);    
}

// вывод карточек на страницу перебором
initialCards.forEach((item) => {
  addCardElement(item, "append")
});

// добавление на попап плавного открытия и закрытия
modalNewCard.classList.add("popup_is-animated");
modalEdit.classList.add("popup_is-animated");
modalImageZoom.classList.add("popup_is-animated");

// @todo: Слушатель открытия popUp
buttonNewCard.addEventListener("click", () => {
  openModal(modalNewCard);
});

// @todo: Слушатель открытия popUp редактирования шапки страницы
buttonEdit.addEventListener("click", () => {
  openModal(modalEdit);
  // Находим поля формы в DOM

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_is-opened')) {
          closeModal(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
          closeModal(popup)
        }
    })
  });

// Обработчик «отправки» формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); 

  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  // Вставьте новые значения с помощью textContent
  profileTitle.textContent = nameInputValue;
  profileDescription.textContent = jobInputValue;
  closePopupSubmit(evt);
}

// слушатель «отправки» формы редактирования профиля
profileForm.addEventListener("submit", handleProfileFormSubmit);

// функция закрытия формы при отправке
function closePopupSubmit(evt) {
  const modal = evt.target.closest(".popup_is-opened");
  closeModal(modal); 
}

// Обработчик «отправки» формы дабавления карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const placeNameValue = placeName.value;
  const linkUrlValue = linkUrl.value;

  const newCardItem = {
    name: placeNameValue,
    link: linkUrlValue,
  };

  addCardElement(newCardItem)
  formNewCard.reset();

  closePopupSubmit(evt);
}

// слушатель «отправки» формы добавления карточки
formNewCard.addEventListener("submit", handleCardFormSubmit);
