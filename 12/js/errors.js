import { addEventListeners, removeEventListeners } from './event-listeners-errors.js';


// показывает сообщение
const createMessage = (elementId, elementClass) => {
  const messageTemplate = document.querySelector(elementId)
    .content.querySelector(elementClass);

  const messageElement = messageTemplate.cloneNode(true);
  messageElement.classList.add('error__shown');

  return messageElement;
};

// закрывает сообщение
const closeMessage = (messageElement, closeButton) => {
  messageElement.remove();

  removeEventListeners(messageElement, closeButton);
};


// показывает сообщение об успешной отправке
const showSuccessSendMessage = () => {
  const messageElement = createMessage('#success', '.success');
  document.body.append(messageElement);

  const closeButton = messageElement.querySelector('.success__button');

  addEventListeners(messageElement, closeButton);
};


// показывает сообщение об ошибке при отправке
const showErrorSendMessage = () => {
  const messageElement = createMessage('#error', '.error');
  document.body.append(messageElement);

  const closeButton = messageElement.querySelector('.error__button');

  addEventListeners(messageElement, closeButton);
};


// показывает сообщение об ошибке при загрузке
const showErrorLoadMessage = () => {
  const errorLoadMessage = createMessage('#error', '.error', '.error__button');

  const errorMessageText = errorLoadMessage.querySelector('.error__title');
  errorMessageText.textContent = 'Не удалось загрузить данные. Попробуйте обновить страницу';
  errorMessageText.style.lineHeight = '30px';

  const closeButton = errorLoadMessage.querySelector('.error__button');
  closeButton.textContent = 'Обновить страницу';

  document.body.append(errorLoadMessage);

  closeButton.addEventListener('click', () => window.location.reload());
  // подписка на событие удалится автоматически при перезагрузке

  return errorLoadMessage;
};


export { showSuccessSendMessage, showErrorSendMessage, showErrorLoadMessage, closeMessage };
