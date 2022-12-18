import {viewPicture} from './big_pic.js';
import {debounce, getRandomArrayElement} from './util.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();
const picturesContainer = document.querySelector('.pictures');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
let newPhotos, previousPhotos = [];

function renderPhotos() {
  removePhotos();
  newPhotos.forEach((photo) => {
    const {url, comments, likes} = photo;
    const eachPhoto = pictureTemplate.cloneNode(true);
    eachPhoto.querySelector('.picture__img').src = url;
    eachPhoto.querySelector('.picture__comments').textContent = comments.length;
    eachPhoto.querySelector('.picture__likes').textContent = likes;
    eachPhoto.addEventListener('click', () => {
      viewPicture(photo);
    });
    previousPhotos.push(eachPhoto);
    picturesFragment.appendChild(eachPhoto);
  });
  picturesContainer.appendChild(picturesFragment);
}

function removePhotos() {
  for (const eachPhoto of previousPhotos) {
    picturesContainer.removeChild(eachPhoto);
  }
  previousPhotos = [];
}

const setFilterClick = (photos, cb) => {
  document.querySelector('.img-filters__form').addEventListener('click', (evt) => {
    newPhotos = photos.slice();
    switch (evt.target.id) {
      case 'filter-default':
        filterDefault.classList.add('img-filters__button--active');
        filterRandom.classList.remove('img-filters__button--active');
        filterDiscussed.classList.remove('img-filters__button--active');
        break;
      case 'filter-random':
        filterDefault.classList.remove('img-filters__button--active');
        filterRandom.classList.add('img-filters__button--active');
        filterDiscussed.classList.remove('img-filters__button--active');
        newPhotos = Array.from({length: 10}, () => getRandomArrayElement(newPhotos));
        break;
      case 'filter-discussed':
        filterDefault.classList.remove('img-filters__button--active');
        filterRandom.classList.remove('img-filters__button--active');
        filterDiscussed.classList.add('img-filters__button--active');
        newPhotos = newPhotos.sort((a, b) => b.comments.length - a.comments.length);
        break;
    }
    cb();
  });
};

export function render (photos) {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  newPhotos = photos.slice();
  renderPhotos();
  setFilterClick(photos, debounce(
    () => renderPhotos(),
    600)
  );
}

