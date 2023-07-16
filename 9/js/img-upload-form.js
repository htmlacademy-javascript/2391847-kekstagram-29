import { openTargetElement, closeTargetElement } from './util.js';
import { normalizeScaleValue } from './scale.js';
import { resetPreviewEffect } from './effects.js';
import { addEventListeners, removeEventListeners } from './event-listeners-upload.js';


const imgUploadForm = document.querySelector('.img-upload__form');
const uploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgOverlayForm = imgUploadForm.querySelector('.img-upload__overlay');
const hashtagsField = imgUploadForm.querySelector('.text__hashtags');
const commentField = imgUploadForm.querySelector('.text__description');
const sliderConteiner = document.querySelector('.img-upload__effect-level');


// открывает окно редактирования изображения
function openImgOverlayForm() {

  openTargetElement(imgOverlayForm);
  normalizeScaleValue();
  addEventListeners();
  sliderConteiner.classList.add('hidden');
}


// закрывает окно редактирования изображения
function closeImgOverlayForm () {
  // проверяет, что фокус не на поле для хеш-тега или комментария
  if (document.activeElement !== hashtagsField && document.activeElement !== commentField) {
    closeTargetElement(imgOverlayForm);
    uploadInput.value = '';
    resetPreviewEffect();
    imgUploadForm.reset();
    removeEventListeners();
  }
}

// добавляет подписку на изменение инпута для открытия окна редактирования изображения
uploadInput.addEventListener('change', () => {
  openImgOverlayForm();
});


export { closeImgOverlayForm };
