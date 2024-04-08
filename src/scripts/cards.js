
// @todo: Функция создания карточки

function addCard(addCardObj, userID) {
  const cardElement = addCardObj.cardTemplate
    .querySelector(".card")
    .cloneNode(true);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const imgElement = cardElement.querySelector(".card__image");
  const likeNumber = cardElement.querySelector(".card__like-number");
  const cardTitle = cardElement.querySelector(".card__title");

  imgElement.src = addCardObj.item.link;
  imgElement.alt = addCardObj.item.name;
  cardTitle.textContent = addCardObj.item.name;
  likeNumber.textContent = addCardObj.item.likes.length;

  function hasMyLike(num) {
    return num._id === userID;
  }

  if (addCardObj.item.likes.some(hasMyLike)) {
    likeButton.classList.add("card__like-button_is-active");
  } 

  likeButton.addEventListener("click", addCardObj.addLikeToCard);

  imgElement.addEventListener("click", addCardObj.zoomCardImg);

  if (addCardObj.item.owner._id === userID) {
    deleteButton.addEventListener("click", addCardObj.removeCard);
  } else {
    deleteButton.remove();
  }

  return cardElement;
}

// @todo: Функция удаления карточки
function removeCardFromDom(cardElement) {
  cardElement.remove();
}

// @todo: Функция лайка карточки
function checkLikeCard(cardElement, newItem) {
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeNumber = cardElement.querySelector(".card__like-number");
  likeNumber.textContent = newItem.likes.length;
  likeButton.classList.toggle("card__like-button_is-active");
}

export { addCard, removeCardFromDom, checkLikeCard };
