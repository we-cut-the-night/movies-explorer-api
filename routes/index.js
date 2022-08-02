const router = require('express').Router();

// создаёт пользователя с переданными в теле
// email, password и name
router.post('/signup', () => {});

// проверяет переданные в теле почту и пароль
// и возвращает JWT
router.post('/signin', () => {});

// возвращает информацию о пользователе (email и имя)
router.get('/users/me', () => {});

// обновляет информацию о пользователе (email и имя)
router.patch('/users/me', () => {});

// возвращает все сохранённые текущим  пользователем фильмы
router.get('/movies', () => {});

// создаёт фильм с переданными в теле
// country, director, duration, year, description, image, trailer
// nameRU, nameEN и thumbnail, movieId
router.post('/movies', () => {});

// удаляет сохранённый фильм по id
router.delete('/movies/_id', () => {});

// router.use((req, res, next) => next(new NotFoundErr('Страница не найдена')));

module.exports = router;
