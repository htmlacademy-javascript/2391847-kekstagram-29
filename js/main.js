import { renderGallery } from './gallery.js';
import { initializeUploadForm } from './img-upload-form.js';
import { createPristineInstance } from './validation.js';

renderGallery();

const { imgUploadForm, closeImgOverlayForm } = initializeUploadForm();
const pristine = createPristineInstance();

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    // После успешной валидации отправляет форму на сервер
    imgUploadForm.submit();
    // сбрасывает все поля формы и закрывает форму
    imgUploadForm.reset();
    closeImgOverlayForm();
  }
});

