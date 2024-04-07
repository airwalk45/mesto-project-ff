// включение валидации вызовом enableValidation
// все настройки передаются при вызове
/*
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 
*/

const showInputError = (formElement, inputElement, errorClassObject) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(errorClassObject.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClassObject.errorClass);
};

const hideInputError = (formElement, inputElement, errorClassObject) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(errorClassObject.inputErrorClass);
  errorElement.classList.remove(errorClassObject.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, errorClassObject) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else if (inputElement.validity.valueMissing) {
    inputElement.setCustomValidity(inputElement.dataset.emptyMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, errorClassObject);
  } else {
    hideInputError(formElement, inputElement, errorClassObject);
  }
};

const setEventListeners = (formElement, errorClassObject) => {
  const inputList = Array.from(
    formElement.querySelectorAll(errorClassObject.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    errorClassObject.submitButtonSelector
  );
  //  toggleButtonState(inputList,buttonElement,errorClassObject);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, errorClassObject);
      toggleButtonState(inputList, buttonElement, errorClassObject);
    });
  });
};

const enableValidation = (errorClassObject) => {
  const formList = Array.from(
    document.querySelectorAll(errorClassObject.formSelector)
  );
  formList.forEach((formElement) => {
    /*
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    */
    setEventListeners(formElement, errorClassObject);
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, errorClassObject) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(errorClassObject.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(errorClassObject.inactiveButtonClass);
  }
}

/*
clearValidation(profileForm, validationConfig);
 */

const clearValidation = (formElement, errorClassObject) => {
  const inputList = Array.from(
    formElement.querySelectorAll(errorClassObject.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    errorClassObject.submitButtonSelector
  );
  inputList.forEach((inputElement) => {
    //  inputElement.addEventListener('input', function () {
    hideInputError(formElement, inputElement, errorClassObject);
    inputElement.setCustomValidity("");
    //  });
  });
  toggleButtonState(inputList, buttonElement, errorClassObject);
};

export { enableValidation, clearValidation };
