import { normalizeWhitespace } from './util.js';

const MAX_HASHTAG_AMOUNT = 5;
const MAX_COMMENT_LENGTH = 140;

const imgUploadForm = document.querySelector('.img-upload__form');
const hashtagsField = imgUploadForm.querySelector('.text__hashtags');
const commentField = imgUploadForm.querySelector('.text__description');

const createPristineInstance = () => {

  const pristine = new Pristine(imgUploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',

  });

  // проверяет формат хеш-тега
  const validateHashtagFormat = () => {
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
    const hashtags = hashtagsField.value.split(' ')
      .filter((hashtag) => hashtag.trim() !== '')
      .map((hashtag) => hashtag.toLowerCase());

    const uniqueHashtags = new Set(hashtags);

    if (hashtagsField.value === '') {
      return true;
    }

    return hashtags.length === uniqueHashtags.size;
  };

  // проверяет длину комментария
  const validateCommentLength = () => commentField.value.length <= MAX_COMMENT_LENGTH;


  pristine.addValidator(hashtagsField, validateHashtagLength, 'Допустимая длина хеш-тега от 2 до 20 символов, включая "#".');

  pristine.addValidator(hashtagsField, validateHashtagFormat, 'Хэш-тег должен начинаться с "#" и содержать только буквы и цифры.');

  pristine.addValidator(hashtagsField, validateHashtagsAmount, 'Превышено количество хэш-тегов. Максимальное количество - 5.');

  pristine.addValidator(hashtagsField, validateHashtagsRepeats, 'Хэш-теги повторяются. Каждый хэш-тег должен быть уникальным.');

  pristine.addValidator(commentField, validateCommentLength, 'Допустимая длина комментария не более 140 символов.');

  return pristine;
};

// корректирует содержимое текстовых полей - удаляет лишние пробелы
const correctInputData = () => {

  hashtagsField.value = normalizeWhitespace(hashtagsField.value);

  if (commentField.value.trim() === '') {
    commentField.value = '';
  }
};

export { createPristineInstance, correctInputData };
