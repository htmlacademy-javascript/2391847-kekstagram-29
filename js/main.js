import { renderGallery } from './gallery.js';
import { setUserFormSubmit } from './form-submit.js';
import { getData } from './api.js';
import { showErrorLoadMessage } from './errors.js';


try {
  const descriptions = await getData ();
  renderGallery(descriptions);
} catch {
  showErrorLoadMessage();
}


setUserFormSubmit();

