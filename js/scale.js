const SCALE = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
};

const imgUploadForm = document.querySelector('.img-upload__form');
const imgOverlayForm = imgUploadForm.querySelector('.img-upload__overlay');
const scaleControlInput = imgOverlayForm.querySelector('.scale__control--value');
const imgPreview = imgOverlayForm
  .querySelector('.img-upload__preview')
  .querySelector('img');


const changeScaleValue = (step) => {
  let changedScaleValue;

  if (step === undefined) {
    changedScaleValue = SCALE.MAX;

  } else {
    const currentScaleValue = parseInt(scaleControlInput.value, 10);
    changedScaleValue = currentScaleValue + step;

    if (changedScaleValue > SCALE.MAX || changedScaleValue < SCALE.MIN) {
      return;
    }
  }
  scaleControlInput.value = `${changedScaleValue}%`;
  imgPreview.style.transform = `scale(${changedScaleValue / 100})`;
};

const increaseScaleValue = () => {
  changeScaleValue(SCALE.STEP);
};

const decreaseScaleValue = () => {
  changeScaleValue(-SCALE.STEP);
};

const normalizeScaleValue = () => {
  changeScaleValue();
};

export { increaseScaleValue, decreaseScaleValue, normalizeScaleValue };

