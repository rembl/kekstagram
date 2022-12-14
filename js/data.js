import {faker} from 'https://cdn.skypack.dev/@faker-js/faker';
import {getRandPosInt} from './util.js';

const COMMENTS_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const mockComments = () => Array.from({length: getRandPosInt(0, 100)}).map((value, index) => ({
  id: index + 1,
  avatar: `img/avatar-${getRandPosInt(1, 6)}.svg`,
  message: COMMENTS_MESSAGE[getRandPosInt(0, COMMENTS_MESSAGE.length - 1)],
  name: `${faker.name.firstName()  } ${  faker.name.lastName()}`,
}));


export const mockPhotos = () => Array.from({length: 25}).map((value, index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: faker.lorem.sentence(),
  likes: getRandPosInt(15, 200),
  comments: mockComments(),
}));
