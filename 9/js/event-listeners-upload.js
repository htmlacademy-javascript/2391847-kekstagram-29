import { increaseScaleValue, decreaseScaleValue } from './scale.js';
import { isEscapeKey } from './util.js';
import { onEffectClick, onSliderUpdate } from './effects.js';
import { closeImgOverlayForm } from './img-upload-form.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgOverlayForm = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCloseButton = imgOverlayForm.querySelector('.img-upload__cancel');
const scaleControlSmaller = imgOverlayForm.querySelector('.scale__control--smaller');
const scaleControlBigger = imgOverlayForm.querySelector('.scale__control--bigger');
const effectsList = imgOverlayForm.querySelector('.effects__list');
const sliderConteiner = document.querySelector('.img-upload__effect-level');
const sliderElement = sliderConteiner.querySelector('.effect-level__slider');


const onDocumentKeydownEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImgOverlayForm();
  }
};

// функции обертки для корректного удаления подписок на события
function closeImgOverlayFormWrapper () {
  closeImgOverlayForm();
}

function increaseScaleValueWrapper () {
  increaseScaleValue();
}

function decreaseScaleValueWrapper () {
  decreaseScaleValue();
}

function onEffectClickWrapper (evt) {
  onEffectClick(evt);
}

function onSliderUpdateWrapper () {
  onSliderUpdate();
}

// добавляет подписки
const addEventListeners = () => {

  document.addEventListener('keydown', onDocumentKeydownEsc);
  imgUploadCloseButton.addEventListener('click', closeImgOverlayFormWrapper);
  scaleControlSmaller.addEventListener('click', decreaseScaleValueWrapper);
  scaleControlBigger.addEventListener('click', increaseScaleValueWrapper);
  effectsList.addEventListener('change', onEffectClickWrapper);
  sliderElement.noUiSlider.on('update', onSliderUpdateWrapper);
};

// удаляет подписки
const removeEventListeners = () => {

  document.removeEventListener('keydown', onDocumentKeydownEsc);
  imgUploadCloseButton.removeEventListener('click', closeImgOverlayFormWrapper);
  scaleControlSmaller.removeEventListener('click', decreaseScaleValueWrapper);
  scaleControlBigger.removeEventListener('click', increaseScaleValueWrapper);
  effectsList.removeEventListener('change', onEffectClickWrapper);
  sliderElement.noUiSlider.off('update', onSliderUpdateWrapper);
};


export { addEventListeners, removeEventListeners };

