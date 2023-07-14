import { openTargetElement, closeTargetElement, isEscapeKey } from './util.js';
import { increaseScaleValue, decreaseScaleValue, normalizeScaleValue } from './scale.js';
import { onEffectClick, onSliderUpdate, resetPreviewEffect } from './effects.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const uploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgOverlayForm = imgUploadForm.querySelector('.img-upload__overlay');
const imgPreview = imgOverlayForm
  .querySelector('.img-upload__preview')
  .querySelector('img');
const imgUploadCloseButton = imgOverlayForm.querySelector('.img-upload__cancel');
const hashtagsField = imgUploadForm.querySelector('.text__hashtags');
const commentField = imgUploadForm.querySelector('.text__description');
const scaleControlSmaller = imgOverlayForm.querySelector('.scale__control--smaller');
const scaleControlBigger = imgOverlayForm.querySelector('.scale__control--bigger');
const effectsList = imgOverlayForm.querySelector('.effects__list');
const sliderConteiner = document.querySelector('.img-upload__effect-level');
const sliderElement = sliderConteiner.querySelector('.effect-level__slider');

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

  // закрывает окно редактирования изображения
  function closeImgOverlayForm () {
    // проверяет, что фокус не на поле для хеш-тега или комментария
    if (document.activeElement !== hashtagsField && document.activeElement !== commentField) {
      closeTargetElement(imgOverlayForm);
      uploadInput.value = '';
      imgPreview.style.filter = '';
      resetPreviewEffect();
      imgUploadForm.reset();
      document.removeEventListener('keydown', onDocumentKeydownEsc);
      imgUploadCloseButton.removeEventListener('click', closeImgOverlayFormWrapper);
      scaleControlSmaller.removeEventListener('click', decreaseScaleValueWrapper);
      scaleControlBigger.removeEventListener('click', increaseScaleValueWrapper);
      effectsList.removeEventListener('change', onEffectClickWrapper);
      sliderElement.noUiSlider.off('update', onSliderUpdateWrapper);
    }
  }

  // открывает окно редактирования изображения
  function openImgOverlayForm() {
    openTargetElement(imgOverlayForm);
    normalizeScaleValue();
    sliderConteiner.classList.add('hidden');
    document.addEventListener('keydown', onDocumentKeydownEsc);
  }

  // открывает окно редактирования изображения после выбора изображения
  uploadInput.addEventListener('change', () => {
    openImgOverlayForm();

    // добавляет слушателя события "клик" на крестик окна редактирования изображения
    imgUploadCloseButton.addEventListener('click', closeImgOverlayFormWrapper);

    // добавляет слушателя события "клик" на кнопки масштаба
    scaleControlSmaller.addEventListener('click', decreaseScaleValueWrapper);
    scaleControlBigger.addEventListener('click', increaseScaleValueWrapper);

    // добавляет слушателя события "клик" на контейнер с эффектами
    effectsList.addEventListener('change', onEffectClickWrapper);

    // добавляет слушателя события "update" на контейнер с эффектами
    sliderElement.noUiSlider.on('update', onSliderUpdateWrapper);

  });

  return { imgUploadForm, closeImgOverlayForm };
};


export { initializeUploadForm };
