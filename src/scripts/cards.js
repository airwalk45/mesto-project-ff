const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// @todo: Функция создания карточки

function addCard(item, deleteCard, cardTemplate, likeCard, zoomCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const imgElement = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__image").src = item.link;
  cardElement.querySelector(".card__title").textContent = item.name;
  cardElement.querySelector(".card__image").alt = item.name;

  deleteButton.addEventListener("click", deleteCard);
  likeButton.addEventListener("click", likeCard);
  imgElement.addEventListener("click", zoomCard);

  return cardElement;
}

// @todo: Функция удаления карточки
function removeCard(evt) {
  evt.target.closest(".card").remove();
}

// @todo: Функция лайка карточки
function AddLikeToCard(evt) {
  evt.target.classList.add("card__like-button_is-active");
}

// @todo: Функция zoom карточки
function zoomCardImg(evt) {
  const modal_image_zoom = document.querySelector(".popup_type_image");
  const popup_image = document.querySelector(".popup__image"); //изображение на всплывающем окне "Зум изображения"
  const popup_caption = document.querySelector(".popup__caption"); //подпись на всплывающем окне "Зум изображения"

  popup_image.src = evt.target.src;
  popup_image.alt = evt.target.alt;
  popup_caption.textContent = evt.target.alt;

  openModal(modal_image_zoom);
}

export { initialCards, addCard, removeCard, AddLikeToCard, zoomCardImg };

import { openModal } from "./modal.js";
