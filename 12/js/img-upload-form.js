import { openTargetElement, closeTargetElement } from './util.js';
import { normalizeScaleValue } from './scale.js';
import { resetPreviewEffect } from './effects.js';
import { pristine, resetMarginStyle } from './form-validation.js';
import { addEventListeners, removeEventListeners } from './event-listeners-upload.js';


const imgUploadForm = document.querySelector('.img-upload__form');
const uploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgOverlayForm = imgUploadForm.querySelector('.img-upload__overlay');
const hashtagsField = imgUploadForm.querySelector('.text__hashtags');
const commentField = imgUploadForm.querySelector('.text__description');
const sliderConteiner = document.querySelector('.img-upload__effect-level');


// открывает окно редактирования изображения
const openImgOverlayForm = () => {

  openTargetElement(imgOverlayForm);
  normalizeScaleValue();
  addEventListeners();
  sliderConteiner.classList.add('hidden');
};


// закрывает окно редактирования изображения
const closeImgOverlayForm = () => {
  // проверяет, что фокус не на поле для хеш-тега или комментария, и что не показана ошибка
  const messageElement = document.querySelector('.error__shown');
  if (document.activeElement !== hashtagsField &&
      document.activeElement !== commentField &&
      !messageElement) {
    closeTargetElement(imgOverlayForm);
    uploadInput.value = '';
    resetPreviewEffect();
    pristine.reset();
    resetMarginStyle();
    imgUploadForm.reset();
    removeEventListeners();
  }
};

// добавляет подписку на изменение инпута для открытия окна редактирования изображения
uploadInput.addEventListener('change', () => {
  openImgOverlayForm();
});


export { closeImgOverlayForm };
