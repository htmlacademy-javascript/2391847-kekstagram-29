import { normalizeWhitespace } from './util.js';

const MAX_HASHTAG_AMOUNT = 5;
const MAX_COMMENT_LENGTH = 140;

const imgUploadForm = document.querySelector('.img-upload__form');
const hashtagsField = imgUploadForm.querySelector('.text__hashtags');
const commentField = imgUploadForm.querySelector('.text__description');


const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

// получает хеш-теги из строки
const normalizeHashtag = (hashtagsString) => hashtagsString
  .split(' ')
  .filter((hashtag) => hashtag.trim() !== '');


// проверяет формат хеш-тега
const validateHashtagFormat = () => {
  const hashtagRegex = /^#[a-zа-яё0-9]*$/i;
  const hashtags = normalizeHashtag(hashtagsField.value);

  return hashtags.every((hashtag) => hashtagRegex.test(hashtag));
};

// проверяет длину хеш-тега
const validateHashtagLength = () => {
  const hashtagRegex = /^.{2,20}$/;
  const hashtags = normalizeHashtag(hashtagsField.value);

  return hashtags.every((hashtag) => hashtagRegex.test(hashtag));
};

// проверяет превышение количества хеш-тегов
const validateHashtagsAmount = () => {
  const hashtags = normalizeHashtag(hashtagsField.value);

  return hashtags.length <= MAX_HASHTAG_AMOUNT;
};

// проверяет есть ли повторения среди хеш-тегов
const validateHashtagsRepeats = () => {
  const hashtags = normalizeHashtag(hashtagsField.value)
    .map((hashtag) => hashtag.toLowerCase());

  const uniqueHashtags = new Set(hashtags);

  return hashtags.length === uniqueHashtags.size;
};

// проверяет длину комментария
const validateCommentLength = () => commentField.value.length <= MAX_COMMENT_LENGTH;


// корректирует содержимое текстовых полей - удаляет лишние пробелы
const correctInputData = () => {
  hashtagsField.value = normalizeWhitespace(hashtagsField.value);

  if (commentField.value.trim() === '') {
    commentField.value = '';
  }
};

// корректирует отступы между полями и сообщениями об ошибках
const correctMarginStyle = () => {
  const isHashtagsFieldValid = pristine.validate(hashtagsField);
  hashtagsField.style.marginBottom = isHashtagsFieldValid ? '20px' : '5px';
};

// сбрасывает отступы между полями и сообщениями об ошибках
const resetMarginStyle = () => {
  hashtagsField.style.marginBottom = '20px';
};


const validators = [
  {
    field: hashtagsField,
    validator: validateHashtagLength,
    errorMessage: 'Допустимая длина хеш-тега от 2 до 20 символов, включая "#".',
    priority: 2,
  },
  {
    field: hashtagsField,
    validator: validateHashtagFormat,
    errorMessage: 'Хэш-тег должен начинаться с "#" и содержать только буквы и цифры.',
    priority: 3,
  },
  {
    field: hashtagsField,
    validator: validateHashtagsAmount,
    errorMessage: 'Превышено количество хэш-тегов. Максимальное количество - 5.',
    priority: 4,
  },
  {
    field: hashtagsField,
    validator: validateHashtagsRepeats,
    errorMessage: 'Хэш-теги повторяются. Каждый хэш-тег должен быть уникальным.',
    priority: 1,
  },
  {
    field: commentField,
    validator: validateCommentLength,
    errorMessage: 'Допустимая длина комментария не более 140 символов.',
  },
];

// инициализирует все валидаторы
for (const { field, validator, errorMessage, priority } of validators) {
  pristine.addValidator(field, validator, errorMessage, priority);
}


export { pristine, correctInputData, correctMarginStyle, resetMarginStyle };
