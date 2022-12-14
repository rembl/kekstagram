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
