// Функция открытия модального окна
function openModal(domModal) {
  domModal.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalEscape);
}

// Функция закрытия модального окна
function closeModal(domModal) {
  domModal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalEscape);
}

function closeModalEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }  
}

export { openModal, closeModal };