import {getRandomInteger, getRandomArrayElement, createId} from './util.js';

const PHOTO_DESCRIPTION_COUNT = 25;
const COMMENTS_MAX = 30;
const AVATAR_QUANTITY = 6;
const LIKES = {
  MIN: 15,
  MAX: 200,
};


const NAMES = [
  'Phantom',
  'Dilemma fixer',
  'Charming hostess',
  'Feral berry',
  'Funny Bunny',
  'Little monster',
  'Sunshine',
  'Toxic',
  'Chewbacca',
  'Real blonde',
];

const DESCRIPTIONS = [
  'Мама я на море',
  'Смотри как я могу',
  'Кто-нибудь, сделайте что-нибудь',
  'Выглядит довольно вкусно',
  'Это закат или рассвет?',
  'Мечта сбылась!',
  'Отличный вид',
  'Никогда так не делайте!',
  'Мерзнем в Альпах',
  'Мгновенная карма',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const generatePhotoId = createId();
const generatePhotoURL = createId();
const generateCommentId = createId();

const createMessage = () => {
  const messages = Array.from({length: getRandomInteger(1, 2)}, () => getRandomArrayElement(MESSAGES));
  return messages.join(' ');
};

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_QUANTITY)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPhotoDescription = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoURL()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKES.MIN, LIKES.MAX),
  comments: Array.from({length: getRandomInteger(0, COMMENTS_MAX)}, createComment),
});

const createPhotoDescriptions = () => Array.from({length: PHOTO_DESCRIPTION_COUNT}, createPhotoDescription);

export {createPhotoDescriptions};
