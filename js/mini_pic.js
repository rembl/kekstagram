import {mockPhotos} from './data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();
const picturesContainer = document.querySelector('.pictures');
const photos = mockPhotos();

photos.forEach((photo) => {
  const {url, comments, likes} = photo;

  const eachPhoto = pictureTemplate.cloneNode(true);
  eachPhoto.querySelector('.picture__img').src = url;
  eachPhoto.querySelector('.picture__comments').textContent = comments;
  eachPhoto.querySelector('.picture__likes').textContent = likes;

  picturesFragment.appendChild(eachPhoto);
});

picturesContainer.appendChild(picturesFragment);
