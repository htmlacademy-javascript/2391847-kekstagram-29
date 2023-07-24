import { addEventListeners, removeEventListeners } from './event-listeners-errors.js';

const LINE_HEIGHT = '40px';
const FONT_SIZE = '24px';

const ErrorText = {
  PRELOAD: 'Повторная попытка загрузки... Пожалуйста, подождите ',
  LOAD: 'Не удалось загрузить данные.<br>Возможно, сервер временно недоступен.<br>Пожалуйста,<br>проверьте свое интернет-соединение или попробуйте обновить страницу.',
};

const ElementId = {
  SUCCESS: '#success',
  ERROR: '#error',
};

const ElementClass = {
  SUCCESS: '.success',
  ERROR: '.error',
  PRELOAD: '.preload',
};


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
  const messageElement = createMessage(ElementId.SUCCESS, ElementClass.SUCCESS);
  document.body.append(messageElement);

  const closeButton = messageElement.querySelector('.success__button');

  addEventListeners(messageElement, closeButton);
};


// показывает сообщение об ошибке при отправке
const showErrorSendMessage = () => {
  const messageElement = createMessage(ElementId.ERROR, ElementClass.ERROR);
  document.body.append(messageElement);

  const closeButton = messageElement.querySelector('.error__button');

  addEventListeners(messageElement, closeButton);
};


// показывает сообщение об ошибке при загрузке
const showErrorLoadMessage = () => {
  const errorLoadMessage = createMessage(ElementId.ERROR, ElementClass.ERROR);

  const errorMessageText = errorLoadMessage.querySelector('.error__title');
  errorMessageText.innerHTML = ErrorText.LOAD.replace(/\n/g, '<br>');

  errorMessageText.style.lineHeight = LINE_HEIGHT;
  errorMessageText.style.fontSize = FONT_SIZE;

  const closeButton = errorLoadMessage.querySelector('.error__button');
  closeButton.textContent = 'Обновить страницу';

  const errorPreloadMessage = document.querySelector('.preload');
  if (errorPreloadMessage) {
    errorPreloadMessage.remove();
  }

  document.body.append(errorLoadMessage);

  closeButton.addEventListener('click', () => window.location.reload());
  // подписка на событие удалится автоматически при перезагрузке

  return errorLoadMessage;
};


// показывает сообщение об ошибке при загрузке
const showPreloadMessage = (retriesCount, delayTime) => {
  let errorLoadMessage = document.querySelector('.preload');

  if (!errorLoadMessage) {
    errorLoadMessage = createMessage(ElementId.ERROR, ElementClass.ERROR);
    errorLoadMessage.classList.add('preload');

    const closeButton = errorLoadMessage.querySelector('.error__button');
    closeButton.remove();
  }

  const errorMessageText = errorLoadMessage.querySelector('.error__title');
  errorMessageText.textContent = `${ErrorText.PRELOAD}${(retriesCount * delayTime) / 1000} сек.`;
  errorMessageText.style.lineHeight = LINE_HEIGHT;

  document.body.append(errorLoadMessage);

  return errorLoadMessage;
};

export { showSuccessSendMessage, showErrorSendMessage, showErrorLoadMessage, showPreloadMessage, closeMessage };
