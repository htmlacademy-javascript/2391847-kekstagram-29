import { checkKeydownEsc } from './util.js';
import { closeMessage } from './errors.js';

let closeFunctions;

const initCloseFunctions = (messageElement, closeButton) => {
  // закрывает сообщение при клике на кнопку
  const onCloseButtonClick = () => {
    closeMessage(messageElement, closeButton);
  };
  // закрывает сообщение при клике мимо сообщения
  const onOutsideClick = (evt) => {
    const messageWindow = messageElement.querySelector('div');
    if (!messageWindow.contains(evt.target)) {
      closeMessage(messageElement, closeButton);
    }
  };
  // закрывает сообщение по кнопке Esc
  const onDocumentKeydownEsc = (evt) => {
    checkKeydownEsc(evt, () => closeMessage(messageElement, closeButton));
  };

  return {onCloseButtonClick, onOutsideClick, onDocumentKeydownEsc};
};

// добавляет подписки
const addEventListeners = (messageElement, closeButton) => {
  closeFunctions = initCloseFunctions(messageElement, closeButton);

  closeButton.addEventListener('click', closeFunctions.onCloseButtonClick);
  document.addEventListener('click', closeFunctions.onOutsideClick);
  document.addEventListener('keydown', closeFunctions.onDocumentKeydownEsc);

  return {messageElement, closeButton};
};

// удаляет подписки
const removeEventListeners = (closeButton) => {
  closeButton.removeEventListener('click', closeFunctions.onCloseButtonClick);
  document.removeEventListener('click', closeFunctions.onOutsideClick);
  document.removeEventListener('keydown', closeFunctions.onDocumentKeydownEsc);

  closeFunctions = '';
};

export { addEventListeners, removeEventListeners };
