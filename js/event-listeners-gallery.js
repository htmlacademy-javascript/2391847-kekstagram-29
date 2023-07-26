import { checkKeydownEsc } from './util.js';
import { closeImageView, onMoreCommentsButtonClick } from './gallery.js';

const imageView = document.querySelector('.big-picture');
const imageViewCloseButton = imageView.querySelector('.big-picture__cancel');
const moreCommentsButton = imageView.querySelector('.comments-loader');

// закрывает окно просмотра изображения при клике на крестик
const onImageViewCloseButtonClick = () => {
  closeImageView();
};

// закрывает окно просмотра изображения по кнопке Esc
const onDocumentKeydownEsc = (evt) => {
  checkKeydownEsc(evt, () => closeImageView());
};

// добавляет подписки
const addEventListeners = () => {
  document.addEventListener('keydown', onDocumentKeydownEsc);
  imageViewCloseButton.addEventListener('click', onImageViewCloseButtonClick);
  moreCommentsButton.addEventListener('click', onMoreCommentsButtonClick);
};

// удаляет подписки
const removeEventListeners = () => {
  document.removeEventListener('keydown', onDocumentKeydownEsc);
  imageViewCloseButton.removeEventListener('click', onImageViewCloseButtonClick);
  moreCommentsButton.removeEventListener('click', onMoreCommentsButtonClick);
};

export { addEventListeners, removeEventListeners };
