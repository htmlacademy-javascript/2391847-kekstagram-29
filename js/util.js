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


// открывает окно просмотра изображения
function openTargetElement (imgElement) {
  imgElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

// закрывает окно просмотра изображения
function closeTargetElement (imgElement) {
  imgElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

// закрывает окно просмотра изображения по кнопке Esc
const onDocumentKeydown = (evt, targetElement, closeElement) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeElement(targetElement);
  }
};

export { getRandomInteger, getRandomArrayElement, createId, openTargetElement, closeTargetElement, onDocumentKeydown };
