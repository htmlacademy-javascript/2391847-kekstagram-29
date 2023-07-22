import { renderGallery } from './gallery.js';
import { setUserFormSubmit } from './form-submit.js';
import { sendData, getData } from './api.js';
import { showSuccessSendMessage, showErrorSendMessage, showErrorLoadMessage } from './errors.js';
import { closeImgOverlayForm } from './img-upload-form.js';
import { showFilters } from './filters.js';

setUserFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeImgOverlayForm();
    showSuccessSendMessage();
  } catch {
    showErrorSendMessage();
  }
});


try {
  const loadedDescriptions = await getData ();
  showFilters(loadedDescriptions);
  renderGallery(loadedDescriptions);
} catch {
  showErrorLoadMessage();
}
