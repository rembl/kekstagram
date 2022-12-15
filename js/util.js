const body = document.querySelector('body');
export const SERVER_LOAD_LINK = 'https://26.javascript.pages.academy/kekstagram/data';
export const SERVER_UPLOAD_LINK = 'https://26.javascript.pages.academy/kekstagram';
export const LOAD_ERROR = 'Ошибка при попытке загрузить данные.';
export const UPLOAD_ERROR = 'Ошибка при попытке отправить данные.';
export const showDownloadErrorMessage = () => {
  const errorDiv = document.createElement('div');
  errorDiv.style.zIndex = '50';
  errorDiv.style.backgroundColor = 'rgba(65, 65, 65)';
  errorDiv.style.position = 'fixed';
  errorDiv.style.left = '35%';
  errorDiv.style.top = '35%';
  errorDiv.style.width = '30%';
  errorDiv.style.height = '30%';
  errorDiv.style.display = 'flex';
  errorDiv.style.alignItems = 'center';
  errorDiv.style.fontSize = '22px';
  errorDiv.style.lineHeight = '1.5';
  errorDiv.style.textAlign = 'center';
  errorDiv.style.color = '#e9dc45';
  errorDiv.style.borderRadius = '15px';
  errorDiv.textContent = 'Что-то пошло не так! Проверьте подключение к Интернету и перезагрузите страницу.';
  body.appendChild(errorDiv);
};

export const HASHTAG_REGEX = /(^#[0-9А-Яа-яЁёA-Za-z]{1,19}$)|(^\s*$)/;
export const HASHTAG_NUM = 5;
export const COMM_LENGTH = 140;
export const MIN_SCALE = 25;
export const MAX_SCALE = 100;
export const SCALE_STEP = 25;
export const EFFECTS = {
  'chrome': {
    filterName: 'grayscale',
    valueUnit: '',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    connect: 'lower'
  },
  'sepia': {
    filterName: 'sepia',
    valueUnit: '',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    connect: 'lower'
  },
  'marvin': {
    filterName: 'invert',
    valueUnit: '%',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    connect: 'lower'
  },
  'phobos': {
    filterName: 'blur',
    valueUnit: 'px',
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
    connect: 'lower'
  },
  'heat': {
    filterName: 'brightness',
    valueUnit: '',
    min: 1,
    max: 3,
    start: 3,
    step: 0.1,
    connect: 'lower'
  },
};

export const getRandPosInt = (first, second) => {
  if (first < 0 || second < 0) {
    return;
  }
  return Math.round(Math.random() * Math.abs(second - first)) + Math.min(first, second);
};

export const isStringLengthRight = (myString, maxLength) => (myString.length <= maxLength);

export const isEscape = (evt) => evt.key === 'Escape';
