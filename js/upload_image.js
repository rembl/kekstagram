import {
  isEscape,
  HASHTAG_REGEX,
  MIN_SCALE,
  MAX_SCALE,
  SCALE_STEP,
  EFFECTS,
  HASHTAG_NUM,
  COMM_LENGTH
} from './util.js';
import { sendDataToServer } from './server.js';

const body = document.querySelector('body');
const uploadFile = document.querySelector('#upload-file');
const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const textHashtags = imageUploadForm.querySelector('.text__hashtags');
const textDescription = imageUploadForm.querySelector('.text__description');
const imageUploadSubmit = imageUploadForm.querySelector('.img-upload__submit');
const uploadCancel = document.querySelector('#upload-cancel');

const effectLevelSlider = imageUploadOverlay.querySelector('.effect-level__slider');
const effectLevelValue = imageUploadOverlay.querySelector('.effect-level__value');
const imageUploadEffectLevel = imageUploadOverlay.querySelector('.img-upload__effect-level');
const scaleControlSmaller = imageUploadOverlay.querySelector('.scale__control--smaller');
const scaleControlBigger = imageUploadOverlay.querySelector('.scale__control--bigger');
const scaleControlValue = imageUploadOverlay.querySelector('.scale__control--value');
const imageUploadPreview = imageUploadOverlay.querySelector('.img-upload__preview');

const success = document.querySelector('#success').content.querySelector('.success');
const error = document.querySelector('#error').content.querySelector('.error');
const successButton = success.querySelector('.success__button');
const errorButton = error.querySelector('.error__button');
let currentEffect;

const checkHashtagsNumber = (value) => {
  const separatedHashtags = value.split(' ');
  return separatedHashtags.length <= HASHTAG_NUM;
};
const hasDuplicates = (hashtags) => new Set(hashtags).size !== hashtags.length;
const checkUniqueHashtags = (value) => {
  const separatedHashtags = value.split(' ');
  const hashtags = separatedHashtags.map((element) => element.toLowerCase());
  return !hasDuplicates(hashtags);
};
const checkHashtagsInput = (value) => {
  if(value === '') {return true;}
  const separatedHashtags = value.split(' ');
  return separatedHashtags.every((element) => HASHTAG_REGEX.test(element));
};
const checkHashtags = (value) => checkHashtagsInput(value);
const checkComments = (value) => value.length <= COMM_LENGTH;

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
  textHashtags,
  checkHashtagsNumber,
  `Максимальное количество хештегов ${HASHTAG_NUM}`
);
pristine.addValidator(
  textHashtags,
  checkUniqueHashtags,
  'Все хештеги должны быть уникальными'
);

pristine.addValidator(
  textDescription,
  checkComments,
  `Максимальная длина комментария должна составлять ${COMM_LENGTH} символов`
);


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


const disableSubmitButton = () => {
  imageUploadSubmit.textContent = 'Подождите...';
  imageUploadSubmit.disabled = true;
};

const enableSubmitButton = () => {
  imageUploadSubmit.textContent = 'Опубликовать';
  imageUploadSubmit.disabled = false;
};

const closeSuccessErrorMessages = () => {
  if (body.contains(error)) {
    body.removeChild(error);
    imageUploadOverlay.classList.remove('hidden');
  }
  if (body.contains(success)) {body.removeChild(success);}
  document.removeEventListener('keydown', onEscKeydownError);
  document.removeEventListener('click', onClickSuccess);
  successButton.removeEventListener('click', closeSuccessErrorMessages);
  document.removeEventListener('click', onClickError);
  errorButton.removeEventListener('click', closeSuccessErrorMessages);
};

function onClickSuccess (evt) {
  if (evt.target === success) {closeSuccessErrorMessages();}
}

function onClickError (evt) {
  if (evt.target === error) {closeSuccessErrorMessages();}
}

function onEscKeydownError (evt) {
  if (isEscape(evt.key)) {closeSuccessErrorMessages();}
}

const closeOverlay = () => {
  imageUploadForm.reset();
  imageUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  scaleControlSmaller.removeEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.removeEventListener('click', onScaleControlBiggerClick);
  imageUploadForm.removeEventListener('change', onChangeEffects);
  document.removeEventListener('keydown', onEscKeydown);
  effectLevelSlider.noUiSlider.destroy();
};

imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    disableSubmitButton();
    sendDataToServer(
      () => {
        closeOverlay();
        enableSubmitButton();
        document.addEventListener('click', onClickSuccess);
        document.addEventListener('keydown', onEscKeydownError);
        successButton.addEventListener('click', closeSuccessErrorMessages);
        body.appendChild(success);
      },
      () => {
        imageUploadOverlay.classList.add('hidden');
        enableSubmitButton();
        document.addEventListener('keydown', onEscKeydownError);
        document.addEventListener('click', onClickError);
        errorButton.addEventListener('click', closeSuccessErrorMessages);
        body.appendChild(error);
      },
      new FormData(evt.target),
    );
  }
});

function onEscKeydown (evt)  {
  if (isEscape(evt.key) && evt.target !== textHashtags && evt.target !== textDescription && !body.contains(error)) {
    evt.preventDefault();
    closeOverlay();
  }
}

const onCloseClick = () => {
  closeOverlay();
};

uploadFile.addEventListener('change', () => {
  document.addEventListener('keydown', onEscKeydown);
  uploadCancel.addEventListener('click', onCloseClick, {once: true});
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
