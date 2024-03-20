// Функция открытия модального окна
function openModal(DomModal) {
  DomModal.classList.add('popup_is-opened');
  DomModal.classList.add('popup_is-animated');
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      closeModal(DomModal);
    }
}); 
};


// Функция закрытия модального окна
function closeModal(Modal) {
  Modal.classList.remove('popup_is-opened');
};

export {openModal, closeModal};