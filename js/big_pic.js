import {isEscape} from './util.js';

const onPopupEscKeydown = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    closePicture();
  }
};

function closePicture() {
  document.querySelector('.big-picture').classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
}

function viewPicture (photo) {
  document.querySelector('.big-picture__img').querySelector('img').src = photo.url;
  document.querySelector('.likes-count').textContent = photo.likes;
  document.querySelector('.comments-count').textContent = photo.comments.length;
  document.querySelector('.social__caption').textContent = photo.description;
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.querySelector('.big-picture').classList.remove('hidden');
  document.querySelector('.big-picture__cancel').addEventListener('click', closePicture);
  document.addEventListener('keydown', onPopupEscKeydown);
  createComments(photo.comments);
}

function deleteComments () {
  const comments = document.querySelectorAll('.social__comment');
  for (let i = 0; i <= comments.length - 1; i++) {
    document.querySelector('.social__comment').remove();
  }
}

function createComments (comments) {
  const classSocialComment = document.querySelector('.social__comment');
  let clone = classSocialComment.cloneNode(true);
  deleteComments();
  for (let i = 0; i <= comments.length - 1; i++) {
    const img = clone.querySelector('img');
    img.src = comments[i].avatar;
    img.alt = comments[i].name;
    clone.querySelector('.social__text').textContent = comments[i].message;
    document.querySelector('.social__comments').appendChild(clone);
    clone = classSocialComment.cloneNode(true);
  }
}

export {viewPicture};

