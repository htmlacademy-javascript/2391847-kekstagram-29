import { openTargetElement, closeTargetElement, onDocumentKeydown } from './util.js';

const MAX_HASHTAG_AMOUNT = 5;

const imgUploadForm = document.querySelector('.img-upload__form');
const uploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgOverlayForm = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCloseButton = imgOverlayForm.querySelector('.img-upload__cancel');
const hashtagsField = imgUploadForm.querySelector('.text__hashtags');

// закрывает окно редактирования изображения
const closeForm = (targetElement) => {
  closeTargetElement(targetElement);
  uploadInput.value = '';

  document.addEventListener('keydown', (evt) => onDocumentKeydown(evt, targetElement, closeForm));
};

// открывает окно редактирования изображения
const openForm = (targetElement) => {
  openTargetElement(targetElement);
  document.addEventListener('keydown', (evt) => onDocumentKeydown(evt, targetElement, closeForm));
};

// открывает окно редактирования изображения после выбора изображения
uploadInput.addEventListener('change', () => {
  openForm(imgOverlayForm);

  // добавляет слушателя события "клик" на крестик окна редактирования изображения
  imgUploadCloseButton.addEventListener('click', () => {
    closeForm(imgOverlayForm);

  });
});


const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',

});

// проверяет формат хеш-тега
const validateHashtagFormat = () => {
  // const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;
  const hashtagRegex = /^#[a-zа-яё0-9]+$/i;
  const hashtags = hashtagsField.value.split(' ').filter((hashtag) => hashtag.trim() !== '');

  if (hashtagsField.value === '') {
    return true;
  }

  return hashtags.every((hashtag) => hashtagRegex.test(hashtag));
};

// проверяет длину хеш-тега
const validateHashtagLength = () => {
  const hashtagRegex = /^.{2,20}$/;
  const hashtags = hashtagsField.value.split(' ').filter((hashtag) => hashtag.trim() !== '');

  if (hashtagsField.value === '') {
    return true;
  }

  return hashtags.every((hashtag) => hashtagRegex.test(hashtag));
};


// проверяет превышение количества хеш-тегов
const validateHashtagsAmount = () => {
  const hashtags = hashtagsField.value.split(' ').filter((hashtag) => hashtag.trim() !== '');

  if (hashtagsField.value === '') {
    return true;
  }

  return hashtags.length <= MAX_HASHTAG_AMOUNT;
};


// проверяет есть ли повторения среди хеш-тегов
const validateHashtagsRepeats = () => {
  // const hashtags = hashtagsField.value.split(' ').filter((hashtag) => hashtag.trim() !== '');
  const hashtags = hashtagsField.value.split(' ')
    .filter((hashtag) => hashtag.trim() !== '')
    .map((hashtag) => hashtag.toLowerCase());

  const uniqueHashtags = new Set(hashtags);

  if (hashtagsField.value === '') {
    return true;
  }

  return hashtags.length === uniqueHashtags.size;
};


pristine.addValidator(hashtagsField, validateHashtagLength, 'Допустимая длина хеш-тега от 2 до 20 символов, включая "#".');

pristine.addValidator(hashtagsField, validateHashtagFormat, 'Хэш-тег должен начинаться с "#" и содержать только буквы и цифры.');

pristine.addValidator(hashtagsField, validateHashtagsAmount, 'Превышено количество хэш-тегов. Максимальное количество - 5.');

pristine.addValidator(hashtagsField, validateHashtagsRepeats, 'Хэш-теги повторяются. Каждый хэш-тег должен быть уникальным.');


imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});


