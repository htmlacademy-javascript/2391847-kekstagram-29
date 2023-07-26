import { showPreloadMessage } from './errors.js';

const RETRIES_COUNT = 5;
const DELAY_TIME = 1000;

const BASE_URL = 'https://29.javascript.pages.academy/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

// устанавливает задержку
const setDelay = (ms) => new Promise ((resolve) => setTimeout(resolve, ms));

// функция для отправки / получения данных
const load = async (route, method = Method.GET, body = null) => {
  const response = await fetch(route, { method, body });
  if (!response.ok) {
    throw new Error(`Произошла ошибка ${response.status}: ${response.statusText}`);
  }
  return response.json();
};

// функция для отправки / получения данных с повторными попытками
const loadWithRetries = async (route, method = Method.GET, body = null, retriesCount = RETRIES_COUNT) => {
  try {
    return await load(`${BASE_URL}${route}`, method, body);

  } catch (err) {
    if (retriesCount > 0) {
      showPreloadMessage(retriesCount, DELAY_TIME);
      await setDelay(DELAY_TIME);
      return loadWithRetries(route, method, body, --retriesCount);
    }
    throw new Error(err);
  }
};

// функция для получения данных с сервера
const getData = () => loadWithRetries(Route.GET_DATA);

// функция для отправки данных на сервер
const sendData = (body) => loadWithRetries(Route.SEND_DATA, Method.POST, body, 0);

export { getData, sendData };
