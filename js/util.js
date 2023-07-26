const DEFAULT_TIMEOUT = 500;

// удаляет лишние пробелы
const normalizeWhitespace = (text) => text.replace(/\s+/g, ' ').trim();

// проверяет нажатую клавишу
const isEscapeKey = (evt) => evt.key === 'Escape';

// вызывает колбек-функцию при нажатии на Esc
const checkKeydownEsc = (evt, callback) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    callback();
  }
};

// открывает окно просмотра изображения
const openTargetElement = (imgElement) => {
  imgElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

// закрывает окно просмотра изображения
const closeTargetElement = (imgElement) => {
  imgElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

// устраняет дребезг
const debounce = (callback, timeoutDelay = DEFAULT_TIMEOUT) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { normalizeWhitespace, openTargetElement, closeTargetElement, checkKeydownEsc, debounce, isEscapeKey};
