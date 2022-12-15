import {mockPhotos} from './data.js';
import {viewPicture} from './big_pic.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();
const picturesContainer = document.querySelector('.pictures');

export const render = (photos = mockPhotos()) => {
  photos.forEach((photo) => {
    const {url, comments, likes} = photo;
    const eachPhoto = pictureTemplate.cloneNode(true);
    eachPhoto.querySelector('.picture__img').src = url;
    eachPhoto.querySelector('.picture__comments').textContent = comments.length;
    eachPhoto.querySelector('.picture__likes').textContent = likes;
    eachPhoto.addEventListener('click', () => {
      viewPicture(photo);
    });
    picturesFragment.appendChild(eachPhoto);
  });
  picturesContainer.appendChild(picturesFragment);
};

