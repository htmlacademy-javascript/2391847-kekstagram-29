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


// проверяет нажатую клавишу
const isEscapeKey = (evt) => evt.key === 'Escape';

// закрывает окно просмотра изображения по кнопке Esc
const onDocumentKeydown = (evt, targetElement, closeTargetElement) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeTargetElement(targetElement);
  }
};

// открывает окно просмотра изображения
function openImageView (imgElement) {
  imgElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // document.addEventListener('keydown', onDocumentKeydown(imgElement));
  document.addEventListener('keydown', (evt) => onDocumentKeydown(evt, imgElement, closeImageView));
}

// закрывает окно просмотра изображения
function closeImageView (imgElement) {
  imgElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', (evt) => onDocumentKeydown(evt, imgElement, closeImageView));
}


export { getRandomInteger, getRandomArrayElement, createId, openImageView, closeImageView };
