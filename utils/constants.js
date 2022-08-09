const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9]+\.[a-zA-Z]+(\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+)?/;
const MONGO_DEV = 'mongodb://localhost:27017/moviesdb';

const MSG_MOVIE_NOT_FOUND = 'Фильм не найден';
const MSG_USER_NOT_FOUND = 'Пользователь не найден';
const MSG_PAGE_NOT_FOUND = 'Страница не найдена';
const MSG_NOTHING_FOUND = 'По запросу ничего не найдено';
const MSG_DEL_NOT_USERS_MOVIE = 'Нельзя удалить фильм другого пользователя';
const MSG_USER_EXISTS = 'Пользователь с таким email уже существует';
const MSG_AUTH_ERR = 'Некорректный email или пароль';
const MSG_NEED_AUTH = 'Необходима авторизация';
const MSG_SERVER_ERR = 'На сервере произошла ошибка';
const MSG_NEED_URL = 'Необходимо указать ссылку';
const MSG_EMAIL_ERR = 'Необходимо ввести email в корректном формате';
const MSG_NOT_VALID_ERR = 'Переданы некорректные данные';

module.exports = {
  regex,
  MONGO_DEV,
  MSG_MOVIE_NOT_FOUND,
  MSG_DEL_NOT_USERS_MOVIE,
  MSG_USER_NOT_FOUND,
  MSG_USER_EXISTS,
  MSG_AUTH_ERR,
  MSG_NEED_AUTH,
  MSG_SERVER_ERR,
  MSG_NEED_URL,
  MSG_EMAIL_ERR,
  MSG_PAGE_NOT_FOUND,
  MSG_NOTHING_FOUND,
  MSG_NOT_VALID_ERR,
};
