// возвращает случайное целое число в заданном диапазоне
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// создает генератор уникальных id
const createId = () => {
  let currentId = 0;

  return function () {
    currentId++;
    return currentId;
  };
};

// возвращет случайный элемент из массива заданной длины
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// удаляет лишние пробелы
const normalizeWhitespace = (text) => text.replace(/\s+/g, ' ').trim();

// проверяет нажатую клавишу
const isEscapeKey = (evt) => evt.key === 'Escape';

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
const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

// пропускает кадры
const throttle = (callback, delayBetweenFrames) => {
  let lastTime = 0;
  return (...rest) => {
    const now = new Date();
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
};

export {
  getRandomInteger,
  getRandomArrayElement,
  createId,
  normalizeWhitespace,
  openTargetElement,
  closeTargetElement,
  isEscapeKey,
  debounce,
  throttle,
};
