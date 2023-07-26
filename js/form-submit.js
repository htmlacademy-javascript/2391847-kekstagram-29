import { pristine, correctInputData } from './form-validation.js';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикуем...'
};

const imgUploadForm = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');

// блокирует кнопку сохранить
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

// разблокирует кнопку сохранить
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

// добавляет подписку на отправку формы
const setUserFormSubmit = (callback) => {
  imgUploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      correctInputData();
      blockSubmitButton();
      const data = new FormData(evt.target);
      await callback(data);
      unblockSubmitButton();
    }
  });
};

export { setUserFormSubmit };
