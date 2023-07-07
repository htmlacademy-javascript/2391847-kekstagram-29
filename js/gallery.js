import { createPhotoDescriptions } from './data.js';
import { renderThumbnails } from './render-thumbnails.js';
import { renderImageView } from './render-image-view.js';
import { isEscapeKey } from './util.js';

const thumbnailsList = document.querySelector('.pictures');
const imageView = document.querySelector('.big-picture');
const imageViewCloseButton = imageView.querySelector('.big-picture__cancel');
const commentCounterElement = imageView.querySelector('.social__comment-count');
const moreCommentsButton = imageView.querySelector('.comments-loader');

// отрисовывает миниатюры
const photoDescriptions = createPhotoDescriptions();
renderThumbnails(photoDescriptions);

// закрывает окно просмотра изображения по кнопке Esc
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImageView();
  }
};


// открывает окно просмотра изображения
function openImageView () {
  imageView.classList.remove('hidden');

  commentCounterElement.classList.add('hidden');
  moreCommentsButton.classList.add('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

// закрывает окно просмотра изображения
function closeImageView () {
  imageView.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

// открывает окно просмотра изображения при клике на миниатюру
const onThumbnailClick = (evt) => {
  if (evt.target.matches('img[class="picture__img"]')) {
    openImageView();
    renderImageView(evt, photoDescriptions);
  }
};

// добавляет слушателя события "клик" на контейнер с миниатюрами
thumbnailsList.addEventListener('click', onThumbnailClick);

// добавляет слушателя события "клик" на крестик окна просмотра изображения
imageViewCloseButton.addEventListener('click', () => {
  closeImageView();
});
