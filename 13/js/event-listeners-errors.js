import { isEscapeKey } from './util.js';
import { closeMessage } from './errors.js';


// функции обертки для корректного удаления обработчиков
const onCloseButtonClick = (messageElement, closeButton) => {
  closeMessage(messageElement, closeButton);
};

// функции обертки для корректного удаления обработчиков
const onOutsideClick = (evt, messageElement, closeButton) => {
  const messageWindow = messageElement.querySelector('div');
  if (!messageWindow.contains(evt.target)) {
    closeMessage(messageElement, closeButton);
  }
};

// закрывает окно просмотра изображения по кнопке Esc
const onDocumentKeydownEsc = (evt, messageElement, closeButton) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    closeMessage(messageElement, closeButton);
  }
};

// добавляет подписки
const addEventListeners = (messageElement, closeButton) => {

  closeButton.addEventListener('click', () => onCloseButtonClick(messageElement, closeButton));
  document.addEventListener('click', (evt) => onOutsideClick(evt, messageElement, closeButton));
  document.addEventListener('keydown', (evt) => onDocumentKeydownEsc(evt, messageElement, closeButton));
};

// удаляет подписки
const removeEventListeners = (messageElement, closeButton) => {

  closeButton.removeEventListener('click', () => onCloseButtonClick(messageElement, closeButton));
  document.removeEventListener('click', (evt) => onOutsideClick(evt, messageElement, closeButton));
  document.removeEventListener('keydown', (evt) => onDocumentKeydownEsc(evt, messageElement, closeButton));
};


export { addEventListeners, removeEventListeners };
