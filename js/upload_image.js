import {
  isEscape,
  isStringLengthRight,
  HASHTAG_REGEX,
  MIN_SCALE,
  MAX_SCALE,
  SCALE_STEP,
  EFFECTS,
  HASHTAG_NUM,
  COMM_LENGTH
} from './util.js';

const fileUploadButton = document.querySelector('#upload-file');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const imageUploadForm = document.querySelector('.img-upload__form');
const textHashtags = imageUploadForm.querySelector('.text__hashtags');
const textDescription = imageUploadForm.querySelector('.text__description');
const closeFormButton = document.querySelector('#upload-cancel');
const effectLevelSlider = imageUploadOverlay.querySelector('.effect-level__slider');
const effectLevelValue = imageUploadOverlay.querySelector('.effect-level__value');
const imageUploadEffectLevel = imageUploadOverlay.querySelector('.img-upload__effect-level');
const scaleControlSmaller = imageUploadOverlay.querySelector('.scale__control--smaller');
const scaleControlBigger = imageUploadOverlay.querySelector('.scale__control--bigger');
const scaleControlValue = imageUploadOverlay.querySelector('.scale__control--value');
const imageUploadPreview = imageUploadOverlay.querySelector('.img-upload__preview');
let currentEffect;

const hasDuplicates = (hashtags) => new Set(hashtags).size !== hashtags.length;

const checkHashtagsInput = (value) => {
  if(value === '') {return true;}
  const separatedHashtags = value.split(' ');
  if (separatedHashtags.length > HASHTAG_NUM) {return false;}
  const hashtags = separatedHashtags.map((element) => element.toLowerCase());
  if (hasDuplicates(hashtags)) {return false;}
  return separatedHashtags.every((element) => HASHTAG_REGEX.test(element));
};

const checkHashtags = (value) => checkHashtagsInput(value);
const checkComments = (value) => isStringLengthRight(value.length, COMM_LENGTH);

const pristine = new Pristine(imageUploadForm, {
  classTo: 'text',
  errorClass: 'text-invalid',
  successClass: 'text-valid',
  errorTextParent: 'text',
  errorTextTag: 'div',
  errorTextClass: 'text-invalid__error'
}, true);

pristine.addValidator(
  textHashtags,
  checkHashtags,
  'Некорректно указаны хештеги'
);

pristine.addValidator(
  textDescription,
  checkComments,
  `Максимальная длина комментария составляет ${COMM_LENGTH} символов`
);

const onFormSubmit = (evt) => {
  const isValid = pristine.validate();
  if(!isValid) {
    evt.preventDefault();
  }
};
imageUploadForm.addEventListener('submit', onFormSubmit);

const updateScale = (newValue) => {
  scaleControlValue.value = `${newValue}%`;
  imageUploadPreview.style.transform = `scale(${newValue / 100})`;
};

const removePercentage =() => scaleControlValue.value.replace('%', '');

const onScaleControlBiggerClick = () => {
  if(removePercentage() < MAX_SCALE) {
    const newValue = Math.min(parseInt(scaleControlValue.value, 10) + SCALE_STEP, 100);
    updateScale(newValue);
  }
};

const onScaleControlSmallerClick = () => {
  if(removePercentage() > MIN_SCALE) {
    const newValue = Math.min(parseInt(scaleControlValue.value, 10) - SCALE_STEP, 100);
    updateScale(newValue);
  }
};

const onChangeEffects = (evt) => {
  currentEffect = evt.target.value;
  const effectConfig = EFFECTS[currentEffect];
  if (!effectConfig) {
    imageUploadEffectLevel.classList.add('hidden');
    imageUploadPreview.style.filter = 'none';
    return;
  }
  imageUploadEffectLevel.classList.remove('hidden');
  const {min, max, step} = effectConfig;
  effectLevelSlider.noUiSlider.updateOptions({
    range: {min, max},
    start: max,
    step,
  });
  imageUploadPreview.className = 'img-upload__preview';
  const effectsPreview = evt.target.parentNode.querySelector('.effects__preview');
  imageUploadPreview.classList.add(effectsPreview.getAttribute('class').split('  ')[1]);
};

const onSliderUpdate = () => {
  const sliderValue = effectLevelSlider.noUiSlider.get();
  effectLevelValue.value = sliderValue;
  const effectConfig = EFFECTS[currentEffect];
  imageUploadPreview.style.filter = effectConfig
    ? `${effectConfig.filterName}(${sliderValue}${effectConfig.valueUnit})`
    : '';
};

const closeOverlay = () => {
  imageUploadForm.reset();
  imageUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onEscKeydown);
  document.body.classList.remove('modal-open');
  document.body.classList.remove('modal-open');
  scaleControlSmaller.removeEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.removeEventListener('click', onScaleControlBiggerClick);
  imageUploadForm.removeEventListener('change', onChangeEffects);
  imageUploadForm.removeEventListener('submit', onFormSubmit);
  effectLevelSlider.noUiSlider.destroy();
  pristine.destroy();
};

function onEscKeydown (evt)  {
  if (isEscape(evt.key) && evt.target !== textHashtags && evt.target !== textDescription) {
    evt.preventDefault();
    closeOverlay();
  }
}

const onCloseClick = () => {
  closeOverlay();
};

fileUploadButton.addEventListener('change', () => {
  document.addEventListener('keydown', onEscKeydown);
  closeFormButton.addEventListener('click', onCloseClick, {once: true});
  document.body.classList.add('modal-open');
  imageUploadOverlay.classList.remove('hidden');

  scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);
  scaleControlValue.value = '100%';

  noUiSlider.create(
    effectLevelSlider, {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      connect: 'lower'
    }
  );
  currentEffect = 'effect-none';
  imageUploadPreview.className = 'img-upload__preview';
  imageUploadPreview.classList.add('effects__preview--none');
  imageUploadForm.addEventListener('change', onChangeEffects);
  effectLevelSlider.noUiSlider.on('update', onSliderUpdate);
  imageUploadEffectLevel.classList.add('hidden');
  imageUploadPreview.style.transform = 'scale(1)';
  imageUploadPreview.style.filter = 'none';
});
