// список карточек
const cardList = document.querySelector('.places__list');

// темплейт карточки
const cardTemplate = document.querySelector('#card-template').content; 

// вывод карточек на страницу перебором
initialCards.forEach((item) => {
  cardList.append(addCard(item,removeCard,cardTemplate,AddLikeToCard, zoomCardImg));
}); 

// кнопка добавления новой карточки
const button_new_card = document.querySelector('.profile__add-button');
// кнопка редактирования заголовка страницы
const button_edit = document.querySelector('.profile__edit-button');
// попап добавления новой карточки
const modal_new_card = document.querySelector('.popup_type_new-card');
// попап добавления новой карточки
const modal_edit = document.querySelector('.popup_type_edit');
// попап увеличенного просмотра карточки
const modal_image_zoom = document.querySelector('.popup_type_image');

// добавление на попап плавного открытия и закрытия
modal_new_card.classList.add('popup_is-animated');
modal_edit.classList.add('popup_is-animated');
modal_image_zoom.classList.add('popup_is-animated');


const popup = document.querySelectorAll('.popup');                  //Массив всех всплывающих окон с общим классом
//const popup_image = document.querySelector('.popup__image');        //изображение на всплывающем окне "Зум изображения"
//const popup_caption = document.querySelector('.popup__caption');    //подпись на всплывающем окне "Зум изображения"

const button_close_card = document.querySelector('.popup__close');

// @todo: Слушатель открытия popUp
button_new_card.addEventListener('click', () => {
  openModal(modal_new_card)
  }); 

// @todo: Слушатель открытия popUp редактирования шапки страницы  
button_edit.addEventListener('click', () => {
  openModal(modal_edit);
  // Заполняем поля текстом из шапки страницы при открывании, поможет если поля при каких-то причинах изменились в обход поля редактирования
      const formElement = document.querySelector('.popup__form');
  // Находим поля формы в DOM
      const nameInput = formElement.querySelector('.popup__input_type_name');
      const jobInput = formElement.querySelector('.popup__input_type_description');

      const profileTitle = document.querySelector('.profile__title');
      const profileDescription = document.querySelector('.profile__description');

      nameInput.value = profileTitle.textContent;
      jobInput.value  = profileDescription.textContent;
  }); 


// @todo: Слушатель закрытия popUp по кнопке крестик
  document.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close')) {  
      const Modal = evt.target.closest('.popup_is-opened'); 
      closeModal(Modal)
    }
  }); 

// @todo: Слушатель закрытия по overlay
popup.forEach((evt) => {
  evt.addEventListener('click', function (evt) {
    if (evt.target === evt.currentTarget) {
      const Modal = evt.target.closest('.popup_is-opened'); 
      closeModal(Modal)
    }
  });
}); 

import './pages/index.css'; // добавьте импорт главного файла стилей 
import { initialCards, addCard, removeCard, AddLikeToCard, zoomCardImg } from './scripts/cards.js';
import { openModal, closeModal } from './scripts/modal.js';

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Находим форму в DOM
const formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;
   
    // Выберите элементы, куда должны быть вставлены значения полей
    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');
    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = nameInputValue;
    profileDescription.textContent = jobInputValue;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
// @todo: Слушатель закрытия popUp по кнопке Sumbit
document.addEventListener('submit', (evt) => {
    const Modal = evt.target.closest('.popup_is-opened'); 
    closeModal(Modal)
}); 
/////////////////////////////////////////////////////////////////////////////////////////////////

const formNewCard = document.querySelector('[name="new-place"]');
const PlaceName = formNewCard.querySelector('[name="place-name"]');
const LinkUrl = formNewCard.querySelector('[name="link"]');

function AddCardFormSubmit(evt) {
    // Сброс базовых настроек
  evt.preventDefault();
  // Получите значение полей jobInput и nameInput из свойства value
  const PlaceNameValue = PlaceName.value;
  const LinkUrlValue = LinkUrl.value;

  const NewCard = {
      name: PlaceNameValue,
      link: LinkUrlValue,
    };
  
  cardList.prepend(addCard(NewCard,removeCard,cardTemplate,AddLikeToCard, zoomCardImg));
  formNewCard.reset();
}

formNewCard.addEventListener('submit', AddCardFormSubmit);
