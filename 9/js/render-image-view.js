const COMMENTS_LOAD_LIMIT = 5;

const imageView = document.querySelector('.big-picture');
const commentsBlock = imageView.querySelector('.social__comments');
const moreCommentsButton = imageView.querySelector('.comments-loader');

// создает комментарий
const createComment = ({ avatar, message, name }) => {
  const commentElement = commentsBlock.querySelector('.social__comment');
  const comment = commentElement.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

// создает список комментариев
const generateCommentsList = () => {
  const commentsShown = imageView.querySelector('.comment-shown');
  const totalCommentsCount = imageView.querySelector('.comments-count');
  let commentsAmount = 0;

  return function (comments) {
    commentsAmount += COMMENTS_LOAD_LIMIT;

    if (commentsAmount >= comments.length) {
      commentsAmount = comments.length;
      moreCommentsButton.classList.add('hidden');
    } else {
      moreCommentsButton.classList.remove('hidden');
    }

    const commentsListFragment = document.createDocumentFragment();
    for (let i = 0; i < commentsAmount; i++) {
      const comment = createComment(comments[i]);
      commentsListFragment.append(comment);
    }

    commentsShown.textContent = commentsAmount;
    totalCommentsCount.textContent = comments.length;

    commentsBlock.innerHTML = '';

    return commentsBlock.append(commentsListFragment);
  };
};

// отрисовывает окно просмотра полноразмерного изображения и информации о фото
const renderImageView = ({ url, description, likes, comments }) => {

  imageView.querySelector('.big-picture__img img').src = url;
  imageView.querySelector('.big-picture__img img').alt = description;
  imageView.querySelector('.social__caption').textContent = description;
  imageView.querySelector('.likes-count').textContent = likes;

  // вызывает функцию замыкание для корректной работы счетчика комментов
  const createCommentsList = generateCommentsList();
  createCommentsList(comments);

  // добавляет слушателя события "клик" на кнопку загрузки комментариев
  moreCommentsButton.addEventListener('click', () => {
    createCommentsList(comments);
  });
};


export { renderImageView };
