const serverAdress = 'http://localhost:3000/';

const imageView = document.querySelector('.big-picture');
const imageDescription = imageView.querySelector('.social__caption');
const likesCount = imageView.querySelector('.likes-count');
const fullSizeImage = imageView.querySelector('.big-picture__img img');
const commentsCount = imageView.querySelector('.comments-count');
const commentsBlock = imageView.querySelector('.social__comments');

// создает комментарий
const createComment = ({ avatar, message, name }) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  commentElement.innerHTML = `
    <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
    <p class="social__text">${message}</p>
  `;

  return commentElement;
};

// создает список комментариев
const createCommentsList = (comments) => {
  const commentsListFragment = document.createDocumentFragment();

  commentsBlock.innerHTML = '';

  comments.forEach((element) => {
    const comment = createComment(element);
    commentsListFragment.append(comment);
  });

  return commentsBlock.append(commentsListFragment);
};


// отрисовывает окно просмотра полноразмерного изображения и информации о фото
const renderImageView = (evt, photoData) => {
  const thumbnailUrl = evt.target.src;
  const { url, description, likes, comments } = photoData.find((element) =>
    serverAdress + element.url === thumbnailUrl
  );

  fullSizeImage.src = url;
  fullSizeImage.alt = description;
  imageDescription.textContent = description;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  createCommentsList(comments);
};

export { renderImageView };
