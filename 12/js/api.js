import { showErrorLoadMessage } from './errors.js';

const BASE_URL = 'https://29.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};


// метод для получения данных
const getData = () =>
  fetch(`${BASE_URL}${Route.GET_DATA}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      showErrorLoadMessage();
    });


// метод для  отправки данных
const sendData = (body) =>
  fetch(`${BASE_URL}${Route.SEND_DATA}`,
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch((error) => {
      throw new Error(error.message);
    });


export {getData, sendData};
