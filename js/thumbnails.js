
const thumbnailsList = document.querySelector('.pictures');
const thumbnailsTemplate = document.querySelector('#picture').content;


const createThumbnail = ({url, description, likes, comments}) => {

  const thumbnailElement = thumbnailsTemplate.cloneNode(true);

  thumbnailElement.querySelector('.picture__img').src = url;
  thumbnailElement.querySelector('.picture__img').alt = description;
  thumbnailElement.querySelector('.picture__likes').textContent = likes;
  thumbnailElement.querySelector('.picture__comments').textContent = comments.length;

  return thumbnailElement;
};


const renderThumbnails = (photoDescriptions) => {

  const thumbnailsListFragment = document.createDocumentFragment();

  photoDescriptions.forEach((element) => {
    const thumbnail = createThumbnail(element);
    thumbnailsListFragment.append(thumbnail);
  });

  return thumbnailsList.append(thumbnailsListFragment);
};


export {renderThumbnails};
