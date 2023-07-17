import { increaseScaleValue, decreaseScaleValue } from './scale.js';
import { isEscapeKey } from './util.js';
import { applySelectedEffect, updateSelectedEffect } from './effects.js';
import { closeImgOverlayForm } from './img-upload-form.js';
import { correctMarginStyle } from './form-validation.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgOverlayForm = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCloseButton = imgOverlayForm.querySelector('.img-upload__cancel');
const scaleControlSmaller = imgOverlayForm.querySelector('.scale__control--smaller');
const scaleControlBigger = imgOverlayForm.querySelector('.scale__control--bigger');
const effectsList = imgOverlayForm.querySelector('.effects__list');
const sliderConteiner = document.querySelector('.img-upload__effect-level');
const sliderElement = sliderConteiner.querySelector('.effect-level__slider');
const hashtagsField = imgUploadForm.querySelector('.text__hashtags');


const onDocumentKeydownEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImgOverlayForm();
  }
};

// функции обертки для корректного удаления подписок на события
const onImgUploadCloseButtonClick = () => {
  closeImgOverlayForm();
};

const onScaleControlBiggerClick = () => {
  increaseScaleValue();
};

const onScaleControlSmallerClick = () => {
  decreaseScaleValue();
};

const onEffectElementClick = (evt) => {
  applySelectedEffect(evt);
};

const onsliderElementUpdate = () => {
  updateSelectedEffect();
};

const onHashtagsFieldChange = () => {
  correctMarginStyle();
};

// добавляет подписки
const addEventListeners = () => {

  document.addEventListener('keydown', onDocumentKeydownEsc);
  imgUploadCloseButton.addEventListener('click', onImgUploadCloseButtonClick);
  scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);
  effectsList.addEventListener('change', onEffectElementClick);
  sliderElement.noUiSlider.on('update', onsliderElementUpdate);
  hashtagsField.addEventListener('input', onHashtagsFieldChange);
};

// удаляет подписки
const removeEventListeners = () => {

  document.removeEventListener('keydown', onDocumentKeydownEsc);
  imgUploadCloseButton.removeEventListener('click', onImgUploadCloseButtonClick);
  scaleControlSmaller.removeEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.removeEventListener('click', onScaleControlBiggerClick);
  effectsList.removeEventListener('change', onEffectElementClick);
  sliderElement.noUiSlider.off('update', onsliderElementUpdate);
  hashtagsField.addEventListener('input', onHashtagsFieldChange);
};


export { addEventListeners, removeEventListeners };

