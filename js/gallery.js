import { createPhotoDescriptions } from './data.js';
import { renderThumbnails } from './render-thumbnails.js';
import { renderImageView } from './render-image-view.js';
import { isEscapeKey } from './util.js';

const thumbnailsList = document.querySelector('.pictures');
const imageView = document.querySelector('.big-picture');
const imageViewCloseButton = imageView.querySelector('.big-picture__cancel');


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
const onThumbnailClick = (evt, photoData) => {
  const thumbnail = evt.target.closest('[data-index]');
  const thumbnailId = +thumbnail.dataset.index;

  const photoDataElement = photoData.find((element) => element.id === thumbnailId);

  if (thumbnail) {
    renderImageView(photoDataElement);
    openImageView();

    // добавляет слушателя события "клик" на крестик окна просмотра изображения
    imageViewCloseButton.addEventListener('click', () => {
      closeImageView();
    });
  }
};

// отрисовывает галлерею
const renderGallery = () => {
  const photoDescriptions = createPhotoDescriptions();
  renderThumbnails(photoDescriptions);

  // добавляет слушателя события "клик" на контейнер с миниатюрами
  thumbnailsList.addEventListener('click', (evt) => {
    onThumbnailClick(evt, photoDescriptions);
  });
};

export { renderGallery };
