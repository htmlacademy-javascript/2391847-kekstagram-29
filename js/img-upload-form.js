import { openTargetElement, closeTargetElement, onDocumentKeydown } from './util.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const uploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgOverlayForm = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCloseButton = imgOverlayForm.querySelector('.img-upload__cancel');


const initializeUploadForm = () => {

  // закрывает окно редактирования изображения
  const closeForm = (targetElement) => {
    closeTargetElement(targetElement);
    uploadInput.value = '';

    document.addEventListener('keydown', (evt) => onDocumentKeydown(evt, targetElement, closeForm));
  };

  // открывает окно редактирования изображения
  const openForm = (targetElement) => {
    openTargetElement(targetElement);
    document.addEventListener('keydown', (evt) => onDocumentKeydown(evt, targetElement, closeForm));
  };

  // открывает окно редактирования изображения после выбора изображения
  uploadInput.addEventListener('change', () => {
    openForm(imgOverlayForm);

    // добавляет слушателя события "клик" на крестик окна редактирования изображения
    imgUploadCloseButton.addEventListener('click', () => {
      closeForm(imgOverlayForm);

    });
  });

  return imgUploadForm;
};


export { initializeUploadForm };
