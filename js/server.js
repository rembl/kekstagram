import {SERVER_LOAD_LINK, SERVER_UPLOAD_LINK, LOAD_ERROR, UPLOAD_ERROR} from './util.js';

export const getDataFromServer = (onSuccess, onFail) => {
  fetch(SERVER_LOAD_LINK)
    .then((response) => {
      if (response.ok) {
        response.json().then((posts) => {
          onSuccess(posts);
        });
      } else {
        throw new Error('Not OK response');
      }
    })
    .catch(() => {
      onFail(LOAD_ERROR);
    });
};

export const sendDataToServer = (onSuccess, onFail, body) => {
  fetch(
    SERVER_UPLOAD_LINK,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail(UPLOAD_ERROR);
      }
    })
    .catch(() => {
      onFail(UPLOAD_ERROR);
    });
};
