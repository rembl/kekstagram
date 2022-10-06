import {v4 as uuidv4} from 'uuid';
import {faker} from '@faker-js/faker';
import {getRandPosInt, isStringLengthRight} from './util.js';


const COMMENTS_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const getComments = () => Array.from({length: getRandPosInt(0, 100)}).map(() => ({
  id: uuidv4(),
  avatar: `img/${getRandPosInt(1, 6)}.svg`,
  message: COMMENTS_MESSAGE[getRandPosInt(0, COMMENTS_MESSAGE.length - 1)],
  name: `${faker.name.firstName()  } ${  faker.name.lastName()}`,
}));


const getPhotos = () => Array.from({length: 25}).map((value, index) => ({
  id: ++index,
  url: `photos/${index}.jpg`,
  description: faker.lorem.sentence(),
  likes: getRandPosInt(15, 200),
  comments: getComments(),
}));

getPhotos();
isStringLengthRight('hello', 6);

export {getPhotos, getComments};

