
const PHOTO_DESCRIPTION_COUNT = 25;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const COMMENTS_MAX = 30;
const AVATAR_QUANTITY = 6;

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

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createId = () => {
  let currentId = 0;

  return function () {
    currentId++;
    return currentId;
  };
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

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
  likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
  comments: Array.from({length: getRandomInteger(0, COMMENTS_MAX)}, createComment),
});

const photoDescriptions = Array.from({length: PHOTO_DESCRIPTION_COUNT}, createPhotoDescription);

// console.log(photoDescriptions);

photoDescriptions();
