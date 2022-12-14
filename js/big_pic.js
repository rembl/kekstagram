import {isEscape} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const socialComment = document.querySelector('.social__comment');
const commentsLoader = document.querySelector('.comments-loader');
const socialCommentCount = document.querySelector('.social__comment-count');
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
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
}

export function viewPicture (photo) {
  document.querySelector('.big-picture__img').querySelector('img').src = photo.url;
  document.querySelector('.likes-count').textContent = photo.likes;
  document.querySelector('.social__caption').textContent = photo.description;
  document.querySelector('.big-picture__cancel').addEventListener('click', closePicture);
  document.addEventListener('keydown', onPopupEscKeydown);
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  createComments(photo.comments);
}

function showComments(clone) {
  let counter = 0;
  while (counter !== 5) {
    if (commentsClone.length === 0) {break;}
    const img = clone.querySelector('img');
    img.src = commentsClone[0].avatar;
    img.alt = commentsClone[0].name;
    clone.querySelector('.social__text').textContent = commentsClone[0].message;
    document.querySelector('.social__comments').appendChild(clone);
    clone = socialComment.cloneNode(true);
    commentsClone.splice(0, 1);
    counter++;
  }
  loadedCommentsCounter += counter;
  socialCommentCount.textContent = `${loadedCommentsCounter} из ${numOfComments} комментариев`;
  if (commentsClone.length === 0) {commentsLoader.classList.add('hidden');}
}

function createComments (comments) {
  numOfComments = comments.length;
  loadedCommentsCounter = 0;
  commentsClone = comments.slice(0);
  const clone = socialComment.cloneNode(true);
  deleteComments();
  showComments(clone);
  commentsLoader.addEventListener('click', () => {
    showComments(clone);
  });
}

function deleteComments () {
  const arrOfCom = document.querySelectorAll('.social__comment');
  Array.from({length:  arrOfCom.length}, () => document.querySelector('.social__comment').remove());
}

