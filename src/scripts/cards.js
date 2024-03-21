import { openModal } from "./modal.js";

// @todo: Функция создания карточки

function addCard(addCardObj) {
  const cardElement = addCardObj.cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const imgElement = cardElement.querySelector(".card__image");

  imgElement.src = addCardObj.item.link;
  imgElement.alt = addCardObj.item.name;
  cardElement.querySelector(".card__title").textContent = addCardObj.item.name;

  deleteButton.addEventListener("click", addCardObj.removeCard);
  likeButton.addEventListener("click", addCardObj.addLikeToCard);
  imgElement.addEventListener("click", addCardObj.zoomCardImg);

  return cardElement;
}

// @todo: Функция удаления карточки
function removeCard(evt) {
  evt.target.closest(".card").remove();
}

// @todo: Функция лайка карточки
function addLikeToCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { addCard, removeCard, addLikeToCard };
