import { createPhotoDescriptions } from './data.js';
import { renderThumbnails } from './render-thumbnails.js';
import { renderImageView } from './render-image-view.js';
import { openTargetElement, closeTargetElement, isEscapeKey } from './util.js';


const thumbnailsList = document.querySelector('.pictures');
const imageView = document.querySelector('.big-picture');
const imageViewCloseButton = imageView.querySelector('.big-picture__cancel');


// закрывает окно просмотра изображения по кнопке Esc
const onDocumentKeydownEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImageView();
  }
};

function closeImageViewWrapper () {
  closeImageView();
}

function closeImageView () {
  closeTargetElement(imageView);
  document.removeEventListener('keydown', onDocumentKeydownEsc);
  // пробуем удалять обработчик клика
  imageViewCloseButton.removeEventListener('click', closeImageViewWrapper);

}

function openImageView () {
  openTargetElement(imageView);
  document.addEventListener('keydown', onDocumentKeydownEsc);
}


// открывает окно просмотра изображения при клике на миниатюру
const onThumbnailClick = (evt, photoData) => {
  const thumbnail = evt.target.closest('[data-index]');

  if (thumbnail) {
    const thumbnailId = +thumbnail.dataset.index;
    const photoDataElement = photoData.find((element) => element.id === thumbnailId);

    renderImageView(photoDataElement);
    openImageView();
    thumbnail.blur(); //снимает фокус с миниатюры, чтобы при закрытии на Esc пропадали счетчики

    // добавляет слушателя события "клик" на крестик окна просмотра изображения
    imageViewCloseButton.addEventListener('click', closeImageViewWrapper);

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
