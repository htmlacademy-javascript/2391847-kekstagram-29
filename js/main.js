import { renderGallery } from './gallery.js';
import { initializeUploadForm } from './img-upload-form.js';
import { createPristineInstance, correctInputData } from './validation.js';

renderGallery();

const { imgUploadForm, closeImgOverlayForm } = initializeUploadForm();
const pristine = createPristineInstance();

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    // Корректирует введенные данные перед отправкой
    correctInputData();
    // После успешной валидации отправляем форму на сервер
    imgUploadForm.submit();
    // Сбрасываем все поля формы и закрываем форму
    imgUploadForm.reset();
    closeImgOverlayForm();
  }

});

