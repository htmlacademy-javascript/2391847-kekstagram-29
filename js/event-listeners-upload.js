import { increaseScaleValue, decreaseScaleValue } from './scale.js';
import { checkKeydownEsc } from './util.js';
import { applySelectedEffect, updateSelectedEffect } from './effects.js';
import { closeImgOverlayForm } from './img-upload-form.js';
import { correctMarginStyle } from './form-validation.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgOverlayForm = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCloseButton = imgOverlayForm.querySelector('.img-upload__cancel');
const scaleDecreaseButton = imgOverlayForm.querySelector('.scale__control--smaller');
const scaleIncreaseButton = imgOverlayForm.querySelector('.scale__control--bigger');
const effectsList = imgOverlayForm.querySelector('.effects__list');
const sliderConteiner = document.querySelector('.img-upload__effect-level');
const sliderElement = sliderConteiner.querySelector('.effect-level__slider');
const hashtagsField = imgUploadForm.querySelector('.text__hashtags');

// закрывает окно редактирования изображения по кнопке Esc
const onDocumentKeydownEsc = (evt) => {
  checkKeydownEsc(evt, () => closeImgOverlayForm());
};

// закрывает окно редактирования изображения при клике на кнопку
const onImgUploadCloseButtonClick = () => {
  closeImgOverlayForm();
};

// увеличивает масштаб изображения при клике на "минус"
const onScaleIncreaseButtonClick = () => {
  increaseScaleValue();
};

// уменьшает масштаб изображения при клике на "плюс"
const onScaleDecreaseButtonClick = () => {
  decreaseScaleValue();
};

// обновляет опции слайдера при клике на иконку эффекта
const onEffectElementClick = (evt) => {
  applySelectedEffect(evt);
};

// изменяет выбранный эффект при изменении положения слайдера
const onSliderElementUpdate = () => {
  updateSelectedEffect();
};

// корректирует отступы между полями при вводе данных с ошибками
const onHashtagsFieldChange = () => {
  correctMarginStyle();
};

// добавляет подписки
const addEventListeners = () => {
  document.addEventListener('keydown', onDocumentKeydownEsc);
  imgUploadCloseButton.addEventListener('click', onImgUploadCloseButtonClick);
  scaleDecreaseButton.addEventListener('click', onScaleDecreaseButtonClick);
  scaleIncreaseButton.addEventListener('click', onScaleIncreaseButtonClick);
  effectsList.addEventListener('change', onEffectElementClick);
  sliderElement.noUiSlider.on('update', onSliderElementUpdate);
  hashtagsField.addEventListener('input', onHashtagsFieldChange);
};

// удаляет подписки
const removeEventListeners = () => {
  document.removeEventListener('keydown', onDocumentKeydownEsc);
  imgUploadCloseButton.removeEventListener('click', onImgUploadCloseButtonClick);
  scaleDecreaseButton.removeEventListener('click', onScaleDecreaseButtonClick);
  scaleIncreaseButton.removeEventListener('click', onScaleIncreaseButtonClick);
  effectsList.removeEventListener('change', onEffectElementClick);
  sliderElement.noUiSlider.off('update', onSliderElementUpdate);
  hashtagsField.removeEventListener('input', onHashtagsFieldChange);
};

export { addEventListeners, removeEventListeners };
