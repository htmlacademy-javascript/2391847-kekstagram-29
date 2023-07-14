const EFFECTS = {
  none: {
    filter: '',
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower'
  },
  chrome: {
    filter: 'grayscale',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  sepia: {
    filter: 'sepia',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  marvin: {
    filter: 'invert',
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  },
  phobos: {
    filter: 'blur',
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
  heat: {
    filter: 'brightness',
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
};


const imgUploadForm = document.querySelector('.img-upload__form');
const imgOverlayForm = imgUploadForm.querySelector('.img-upload__overlay');
const imgPreview = imgOverlayForm
  .querySelector('.img-upload__preview')
  .querySelector('img');
const sliderConteiner = document.querySelector('.img-upload__effect-level');
const sliderElement = sliderConteiner.querySelector('.effect-level__slider');
const effectLevelInput = sliderConteiner.querySelector('.effect-level__value');
let currentEffectName;

// cоздает слайдер
noUiSlider.create(sliderElement, EFFECTS.none);

// применяет выбранный эффект к изображению
const setPreviewEffect = (name) => {
  if (name === 'chrome' || name === 'sepia' || name === 'heat') {
    imgPreview.style.filter = `${EFFECTS[name].filter}(${effectLevelInput.value})`;
  } else if (name === 'marvin') {
    imgPreview.style.filter = `${EFFECTS[name].filter}(${effectLevelInput.value}%)`;
  } else if (name === 'phobos') {
    imgPreview.style.filter = `${EFFECTS[name].filter}(${effectLevelInput.value}px)`;
  } else if (name === 'none') {
    imgPreview.style.filter = '';

  }
};

// обновляет опции слайдера и применяет эффект при клике на иконку эффекта
const onEffectClick = (evt) => {
  const effectsItem = evt.target.closest('.effects__item');

  if (effectsItem) {
    currentEffectName = effectsItem.querySelector('input').value;

    sliderElement.noUiSlider.updateOptions(EFFECTS[currentEffectName]);
    setPreviewEffect(currentEffectName);

    if (currentEffectName === 'none') {
      sliderConteiner.classList.add('hidden');
    } else {
      sliderConteiner.classList.remove('hidden');
    }
  }
};

// при изменении положения слайдера изменяет выбранный эффект
const onSliderUpdate = () => {
  effectLevelInput.value = sliderElement.noUiSlider.get();
  setPreviewEffect(currentEffectName);
};

const resetPreviewEffect = () => {
  currentEffectName = 'none';
  setPreviewEffect('currentEffectName');
};

export { onEffectClick, onSliderUpdate, resetPreviewEffect };
