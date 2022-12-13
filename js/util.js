const getRandPosInt = (first, second) => {
  if (first < 0 || second < 0) {
    return;
  }
  return Math.round(Math.random() * Math.abs(second - first)) + Math.min(first, second);
};

const isStringLengthRight = (myString, maxLength) => (myString.length <= maxLength);

const isEscape = (evt) => evt.key === 'Escape';

export {getRandPosInt, isStringLengthRight, isEscape};
