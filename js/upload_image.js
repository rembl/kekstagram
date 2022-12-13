import {isEscape} from './util.js';
const HASHTAG_REGEX = /(^#[0-9А-Яа-яЁёA-Za-z]{1,19}$)|(^\s*$)/;

const imageUploadForm = document.querySelector('.img-upload__form');
const submitButton = imageUploadForm.querySelector('.img-upload__submit');
const textHashtags = imageUploadForm.querySelector('.text__hashtags');
const textDescription = imageUploadForm.querySelector('.text__description');
const closeFormButton = document.querySelector('#upload-cancel');
const fileUpdateButton = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');

let isCommentValid = true;
let isHashtagInputValid = true;

const closeOverlay = () => {
  fileUpdateButton.value = '';
  textDescription.value = '';
  textHashtags.value = '';
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onEscapeKeydown = (evt) => {
  if (isEscape(evt.key) && evt.target !== textHashtags && evt.target !== textDescription) {closeOverlay();}
  evt.preventDefault();
  closeOverlay();
};

fileUpdateButton.addEventListener('change', () => {
  document.addEventListener('keydown', onEscapeKeydown);
  closeFormButton.addEventListener('click', closeOverlay, {once: true});
  document.body.classList.add('modal-open');
  overlay.classList.remove('hidden');
});

const pristine = new Pristine(imageUploadForm, {
  classTo: 'form-group',
  errorClass: 'has-danger',
  successClass: 'has-success',
  errorTextParent: 'form-group',
  errorTextTag: 'div',
  errorTextClass: 'text-help'
}, true);

const disableSubmitButton = () => {submitButton.disabled = !isHashtagInputValid || !isCommentValid;};
const hasDuplicates = (arr) => new Set(arr).size !== arr.length;

const checkHashtagsInput = (value) => {
  const separateHashtags = value.split(' ');
  if (separateHashtags.length > 5) {return false;}
  const values = separateHashtags.map((e) => e.toLowerCase());
  if (hasDuplicates(values)) {return false;}
  return separateHashtags.every((e) => HASHTAG_REGEX.test(e));
};

const checkHashtags = (value) => {
  isHashtagInputValid = checkHashtagsInput(value);
  disableSubmitButton();
};

pristine.addValidator(
  textHashtags,
  checkHashtags,
  'Некорректно указаны хештеги: максимальная длина 20 символов'
);

const checkComments = (value) => {
  isCommentValid = value.length <= 140;
  disableSubmitButton();
};

pristine.addValidator(
  textDescription,
  checkComments,
  'Максимальная длина комментария 140 символов'
);

imageUploadForm.addEventListener('submit', () => {
  pristine.validate();
});

