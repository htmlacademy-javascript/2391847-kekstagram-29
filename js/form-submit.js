import { sendData } from './api.js';
import { pristine, correctInputData } from './form-validation.js';
import { showSuccessSendMessage, showErrorSendMessage } from './errors.js';
import { closeImgOverlayForm } from './img-upload-form.js';

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


const setUserFormSubmit = () => {
  imgUploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      correctInputData(); // корректирует введенные данные перед отправкой
      blockSubmitButton();

      try {
        await sendData(new FormData(evt.target));
        closeImgOverlayForm();
        showSuccessSendMessage();
      } catch {
        showErrorSendMessage();
      } finally {
        unblockSubmitButton();
      }
    }
  });
};


export { setUserFormSubmit };
