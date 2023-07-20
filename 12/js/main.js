import { renderGallery } from './gallery.js';
import { setUserFormSubmit } from './form-submit.js';
import { getData } from './api.js';


getData ()
  .then((descriptions) => {
    renderGallery(descriptions);
  });


setUserFormSubmit();

