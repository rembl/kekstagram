import {render} from './mini_pic.js';
import {getDataFromServer} from './server.js';
import {showDownloadErrorMessage} from './util.js';
import './upload_image.js';

getDataFromServer((posts) => {render(posts);},
  () => {showDownloadErrorMessage();});
