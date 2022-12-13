import {isEscape} from './util.js';
const HASHTAG_REGEX = /(^\s*$)|(^#[A-Za-zА-Яа-яЁё0-9]{1,19}$)/;

const form = document.querySelector('.img-upload__form');
const uploadImage = document.querySelector('#upload-file');
const overlayImage = document.querySelector('.img-upload__overlay');
const submitButton = form.querySelector('.img-upload__submit');
const closeButton = document.querySelector('#upload-cancel');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const closeOverlayImage = () => {
  uploadImage.value = '';
  overlayImage.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onOverlayEscKeydown = (evt) => {
  if (isEscape(evt.key) && evt.target !== hashtagInput && evt.target !== commentInput) {
    closeOverlayImage();
  }
};

uploadImage.addEventListener('change', () => {
  document.addEventListener('keydown', onOverlayEscKeydown);
  closeButton.addEventListener('click', closeOverlayImage, {once: true});
  document.body.classList.add('modal-open');
  overlayImage.classList.remove('hidden');
});

let isHashtagChecked = true;
let isCommentChecked = true;

const pristine = new Pristine(form, {
  classTo: 'text',
  errorClass: 'text-invalid',
  successClass: 'text-valid',
  errorTextParent: 'text',
  errorTextTag: 'div',
  errorTextClass: 'text-invalid__error'
}, true);

const checkSubmitButton = () => {
  submitButton.disabled = !isHashtagChecked || !isCommentChecked;
};

const isCorrectHashtag = (value) => HASHTAG_REGEX.test(value);
const isCorrectComment = (value) => value.length < 140;

const validateHashtag = (value) => {
  const hashtags = value.split(' ');
  isHashtagChecked = hashtags.every(isCorrectHashtag);
  checkSubmitButton();
  return isHashtagChecked;
};

const validateComment = (value) => {
  isCommentChecked = isCorrectComment(value);
  checkSubmitButton();
  return isCommentChecked;
};

pristine.addValidator(
  hashtagInput,
  validateHashtag,
  'Хэштэг задан неправильно: максимальная длина одного хэш-тега 20 символов, включая решётку'
);

pristine.addValidator(
  commentInput,
  validateComment,
  'Длина комментария не может составлять больше 140 символов'
);

form.addEventListener('submit', () => {
  pristine.validate();
});
