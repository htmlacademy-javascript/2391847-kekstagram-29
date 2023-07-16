import { isEscapeKey } from './util.js';
import { closeImageView, createCommentsListWrapper } from './gallery.js';

const imageView = document.querySelector('.big-picture');
const imageViewCloseButton = imageView.querySelector('.big-picture__cancel');
const moreCommentsButton = imageView.querySelector('.comments-loader');


// функции обертки для корректного удаления обработчиков
const closeImageViewWrapper = () => {
  closeImageView();
};

// закрывает окно просмотра изображения по кнопке Esc
const onDocumentKeydownEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImageView();
  }
};


// добавляет подписки
const addEventListeners = () => {

  document.addEventListener('keydown', onDocumentKeydownEsc);
  imageViewCloseButton.addEventListener('click', closeImageViewWrapper);
  moreCommentsButton.addEventListener('click', createCommentsListWrapper);
};

// удаляет подписки
const removeEventListeners = () => {

  document.removeEventListener('keydown', onDocumentKeydownEsc);
  imageViewCloseButton.removeEventListener('click', closeImageViewWrapper);
  moreCommentsButton.removeEventListener('click', createCommentsListWrapper);
};

export { addEventListeners, removeEventListeners };
