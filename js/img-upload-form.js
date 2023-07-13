import { openTargetElement, closeTargetElement, isEscapeKey } from './util.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const uploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgOverlayForm = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCloseButton = imgOverlayForm.querySelector('.img-upload__cancel');
const hashtagsField = imgUploadForm.querySelector('.text__hashtags');


const initializeUploadForm = () => {

  // закрывает окно просмотра изображения по кнопке Esc
  const onDocumentKeydownEsc = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeImgOverlayForm();
    }
  };

  // закрывает окно редактирования изображения
  function closeImgOverlayForm () {
    if (document.activeElement !== hashtagsField) { // проверяет, что фокус не на поле для хеш-тега
      closeTargetElement(imgOverlayForm);
      uploadInput.value = '';
      document.removeEventListener('keydown', onDocumentKeydownEsc);
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
    imgUploadCloseButton.addEventListener('click', () => {
      closeImgOverlayForm(imgOverlayForm);

    });
  });

  return imgUploadForm;
};


export { initializeUploadForm };
