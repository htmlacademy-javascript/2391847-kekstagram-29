
const thumbnailsList = document.querySelector('.pictures');
const thumbnailsTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');

// создает одну миниаюру
const createThumbnail = ({ id, url, description, likes, comments }) => {
  const thumbnailElement = thumbnailsTemplate.cloneNode(true);

  thumbnailElement.querySelector('.picture__img').src = url;
  thumbnailElement.querySelector('.picture__img').alt = description;
  thumbnailElement.querySelector('.picture__likes').textContent = likes;
  thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
  thumbnailElement.dataset.index = id;

  return thumbnailElement;
};


// отрисовывает массив миниатюр
const renderThumbnails = (photoDescriptions) => {
  const thumbnailsListFragment = document.createDocumentFragment();

  photoDescriptions.forEach((element) => {
    const thumbnail = createThumbnail(element);
    thumbnailsListFragment.append(thumbnail);
  });

  thumbnailsList.querySelectorAll('.picture').forEach((element) => element.remove());

  return thumbnailsList.append(thumbnailsListFragment);
};

export { renderThumbnails };
