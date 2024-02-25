// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content; 

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function addCard(item,deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__image').src = item.link;
  cardElement.querySelector('.card__title').textContent = item.name;

  deleteButton.addEventListener('click', deleteCard);
  
  return cardElement;
}

// @todo: Функция удаления карточки
function removeCard(evt) {
  evt.target.parentElement.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  cardList.append(addCard(item,removeCard));
}); 