import { renderGallery } from './gallery.js';
import { initializeUploadForm } from './img-upload-form.js';
import { createPristineInstance } from './validation.js';

renderGallery();

const imgUploadForm = initializeUploadForm();
const pristine = createPristineInstance();

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});


