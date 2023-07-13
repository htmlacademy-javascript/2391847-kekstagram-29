import { openTargetElement, closeTargetElement, isEscapeKey } from './util.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const uploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgOverlayForm = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCloseButton = imgOverlayForm.querySelector('.img-upload__cancel');
const hashtagsField = imgUploadForm.querySelector('.text__hashtags');
const commentField = imgUploadForm.querySelector('.text__description');

const initializeUploadForm = () => {

  // закрывает окно просмотра изображения по кнопке Esc
  const onDocumentKeydownEsc = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeImgOverlayForm();
    }
  };

  function closeImgOverlayFormWrapper () {
    closeImgOverlayForm();
  }

  // закрывает окно редактирования изображения
  function closeImgOverlayForm () {
    // проверяет, что фокус не на поле для хеш-тега или комментария
    if (document.activeElement !== hashtagsField && document.activeElement !== commentField) {
      closeTargetElement(imgOverlayForm);
      uploadInput.value = '';
      document.removeEventListener('keydown', onDocumentKeydownEsc);
      imgUploadCloseButton.removeEventListener('click', closeImgOverlayFormWrapper);
    }
  }

  // открывает окно редактирования изображения
  function openImgOverlayForm() {
    openTargetElement(imgOverlayForm);
    document.addEventListener('keydown', onDocumentKeydownEsc);
  }

  // открывает окно редактирования изображения после выбора изображения
  uploadInput.addEventListener('change', () => {
    openImgOverlayForm();

    // добавляет слушателя события "клик" на крестик окна редактирования изображения
    imgUploadCloseButton.addEventListener('click', closeImgOverlayFormWrapper);
  });

  return { imgUploadForm, closeImgOverlayForm };
};


export { initializeUploadForm };
