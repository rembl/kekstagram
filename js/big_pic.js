import {isEscape} from './util.js';
let loadedCommentsCounter = 0;
let numOfComments = 0;
let commentsClone;

const onPopupEscKeydown = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    closePicture();
  }
};

function closePicture() {
  document.querySelector('body').classList.remove('modal-open');
  document.querySelector('.big-picture').classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
}

function viewPicture (photo) {
  document.querySelector('.big-picture__img').querySelector('img').src = photo.url;
  document.querySelector('.likes-count').textContent = photo.likes;
  document.querySelector('.social__caption').textContent = photo.description;
  document.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.querySelector('.big-picture').classList.remove('hidden');
  document.querySelector('.big-picture__cancel').addEventListener('click', closePicture);
  document.addEventListener('keydown', onPopupEscKeydown);
  createComments(photo.comments);
}

function deleteComments () {
  const comments = document.querySelectorAll('.social__comment');
  Array.from({length:  comments.length}, () => document.querySelector('.social__comment').remove());
}

function creatingComments(clone) {
  let counter = 0;
  while (counter !== 5) {
    if (commentsClone.length === 0) { break; }
    const img = clone.querySelector('img');
    img.src = commentsClone[0].avatar;
    img.alt = commentsClone[0].name;
    clone.querySelector('.social__text').textContent = commentsClone[0].message;
    document.querySelector('.social__comments').appendChild(clone);
    clone = document.querySelector('.social__comment').cloneNode(true);
    commentsClone.splice(0, 1);
    counter++;
  }
  loadedCommentsCounter += counter;
  document.querySelector('.social__comment-count').textContent = `${loadedCommentsCounter} из ${numOfComments} комментариев`;
  if (commentsClone.length === 0) {document.querySelector('.comments-loader').classList.add('hidden');}
}

function createComments (comments) {
  numOfComments = comments.length;
  loadedCommentsCounter = 0;
  commentsClone = comments.slice(0);
  const clone = document.querySelector('.social__comment-count').cloneNode(true);
  deleteComments();
  creatingComments(clone);
  document.querySelector('.comments-loader').addEventListener('click', () => {
    creatingComments(clone);
  });
}

export {viewPicture};

