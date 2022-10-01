import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

const COMMENTS_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const getRandPosInt = (first, second) => {
  if (first < 0 || second < 0) {
    return;
  }
  return Math.round(Math.random() * Math.abs(second - first)) + Math.min(first, second);
};


const isStringLengthRight = (myString, maxLength) => (myString.length <= maxLength);


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


getRandPosInt(10,20);
isStringLengthRight('hello', 6);
getPhotos();
