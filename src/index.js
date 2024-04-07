/*=====================
Блок импорта
=======================*/
import "./pages/index.css"; //Главный CSS
import { addCard, removeCardFromDom, checkLikeCard } from "./scripts/cards.js"; //функции карточек
import { openModal, closeModal } from "./scripts/modal.js"; //функции попапов
import { initialCards } from "./scripts/initialCards.js"; //базовые страницы при загрузке
import { enableValidation, clearValidation } from "./scripts/validation.js";
import {
  getUserInfo,
  getCardsList,
  patchUserInfo,
  patchCard,
  deleteCard,
  putLike,
  deleteLike,
  patchUserAvatar,
} from "./scripts/api.js";

/*=====================
Блок констант
=======================*/
const cardList = document.querySelector(".places__list"); // список карточек
const cardTemplate = document.querySelector("#card-template").content; // темплейт карточки
const addCardObj = {
  item: "",
  removeCard: "",
  cardTemplate: cardTemplate,
  addLikeToCard: "",
  zoomCardImg: zoomCardImg,
}; // объект с необходимым содержимым для функции создания карточки
const buttonNewCard = document.querySelector(".profile__add-button"); // кнопка добавления новой карточки
const buttonEdit = document.querySelector(".profile__edit-button"); // кнопка редактирования заголовка страницы
const buttonEditAvatar = document.querySelector(".profile__image"); // кнопка редактирования заголовка страницы

const modalNewCard = document.querySelector(".popup_type_new-card"); // попап добавления новой карточки
const modalEdit = document.querySelector(".popup_type_edit"); // попап добавления новой карточки
const modalEditAvatar = document.querySelector(".popup_type_edit-avatar"); // попап добавления новой карточки
const modalImageZoom = document.querySelector(".popup_type_image"); // попап увеличенного просмотра карточки

const popups = document.querySelectorAll(".popup"); //Массив всех всплывающих окон с общим классом

const profileForm = document.querySelector('[name="edit-profile"]'); // форма редактирования шапки страницы
const nameInput = profileForm.querySelector('[name="name"]'); // поле ввода имени в форме для шапки страницы
const jobInput = profileForm.querySelector('[name="description"]'); // поле ввода описания в форме для шапки страницы

const profileTitle = document.querySelector(".profile__title"); // имя в шапке страницы
const profileDescription = document.querySelector(".profile__description"); // описание в шапке страницы
const profileImg = document.querySelector(".profile__image"); // Изображение в шапке

const profileData = {
  profileTitle: profileTitle,
  profileDescription: profileDescription,
  profileImg: profileImg,
};

const formNewCard = document.querySelector('[name="new-place"]');
const placeName = formNewCard.querySelector('[name="place-name"]');
const linkUrl = formNewCard.querySelector('[name="link"]');

const avatarForm = document.querySelector('[name="new-avatar"]'); // форма редактирования шапки страницы
const avatarUrl = avatarForm.querySelector('[name="link"]');

const modalDelete = document.querySelector(".popup_type_confirm"); // попап подтверждения удаления
const formDelete = modalDelete.querySelector('[name="delete-confirm"]');
let cardForDelete = {};


const errorClassObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error", //класс ошибки для поля ввода
  errorClass: "popup__error_visible", //класс для текста ошибки под полем ввода
};

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

formDelete.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderDeleting(true, evt);
  deleteCard(cardForDelete._id)
  .then(() => {
    removeCardFromDom(cardForDelete.cardElement);
    closeModal(modalDelete);    
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderDeleting(false, evt);
  });
})

function addCardElement(item, method = "prepend", userID) {
  addCardObj.item = item;
  addCardObj.removeCard = () => {
    cardForDelete._id = item._id;
    cardForDelete.cardElement = cardElement;    
    openModal(modalDelete);
  };
  addCardObj.addLikeToCard = (evt) => {
    if (evt.target.classList.contains("card__like-button_is-active")) {
      deleteLike(item._id)
        .then((newItem) => {
          checkLikeCard(cardElement, newItem);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      putLike(item._id)
        .then((newItem) => {
          checkLikeCard(cardElement, newItem);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const cardElement = addCard(addCardObj, userID);
  cardList[method](cardElement);
}

// добавление на попап плавного открытия и закрытия
modalNewCard.classList.add("popup_is-animated");
modalEdit.classList.add("popup_is-animated");
modalEditAvatar.classList.add("popup_is-animated");
modalImageZoom.classList.add("popup_is-animated");

// Слушатель открытия popUp новой карты
buttonNewCard.addEventListener("click", () => {
  const formElement = modalNewCard.querySelector(errorClassObject.formSelector);
  clearValidation(formElement, errorClassObject);
  openModal(modalNewCard);
});

// Слушатель открытия popUp редактирования аватара
buttonEditAvatar.addEventListener("click", () => {
  const formElement = modalEditAvatar.querySelector(
    errorClassObject.formSelector
  );
  clearValidation(formElement, errorClassObject);
  openModal(modalEditAvatar);
});

// @Слушатель открытия popUp редактирования шапки страницы
buttonEdit.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  const formElement = modalEdit.querySelector(errorClassObject.formSelector);
  clearValidation(formElement, errorClassObject);
  openModal(modalEdit);
});

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      closeModal(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closeModal(popup);
    }
  });
});

// Обработчик «отправки» формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;

  profileTitle.textContent = nameInputValue;
  profileDescription.textContent = jobInputValue;

  const userInfo = {
    name: nameInputValue,
    about: jobInputValue,
  };

  renderLoading(true, evt);

  patchUserInfo(userInfo)
    .then(() => {
      closePopupSubmit(evt);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt);
    });
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
  renderLoading(true, evt);

  patchCard(newCardItem)
    .then((item) => {
      addCardElement(item, "prepend", item.owner._id);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt);
    });

  //addCardElement(newCardItem);
  formNewCard.reset();

  closePopupSubmit(evt);
}

// слушатель «отправки» формы добавления карточки
formNewCard.addEventListener("submit", handleCardFormSubmit);

enableValidation(errorClassObject);

function changeProfileData(profileData) {
  profileTitle.textContent = profileData.name;
  profileDescription.textContent = profileData.about;
  profileImg.style = "background-image: url(" + profileData.avatar + ")";
}

Promise.all([getUserInfo(), getCardsList()])
  .then((results) => {
    changeProfileData(results[0]);

    results[1].forEach((item) => {
      addCardElement(item, "append", results[0]._id);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Обработчик «отправки» формы изменения аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt);
  const linkAvatarValue = avatarUrl.value;
  patchUserAvatar(linkAvatarValue)
    .then(() => {
      profileImg.style = "background-image: url(" + linkAvatarValue + ")";
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt);
    });

  //addCardElement(newCardItem);
  avatarForm.reset();

  closePopupSubmit(evt);
}

// слушатель «отправки» формы редактирования профиля
avatarForm.addEventListener("submit", handleAvatarFormSubmit);

function renderLoading(isLoading, evt) {
  const button = evt.target.querySelector(".popup__button");
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

function renderDeleting(isLoading, evt) {
  const button = evt.target.querySelector(".popup__button");
  if (isLoading) {
    button.textContent = "Удаляем...";
  } else {
    button.textContent = "Да";
  }
}
