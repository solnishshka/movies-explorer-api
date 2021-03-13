module.exports.messages = {
  200: {
    deleteMovie: 'Фильм успешно удален',
  },
  400: {
    url: 'Невалидный URL',
    email: 'Невалидный Email',
    required: 'Поле обязательно для заполнения',
    id: 'Невалидный id - может содержать только HEX-символы',
    minmax24: 'Невалидный id - должен содержать 24 символа',
    min: 'Минимум 8 символов',
    max: 'Максимум 30 символов',
  },
  401: {
    need: 'Необходима авторизация',
    error: 'Неправильные почта или пароль',
  },
  403: {
    movie: 'Можно удалять только свои фильмы',
  },
  404: {
    movie: 'Фильм с указанным id не найден',
    user: 'Пользователь с указанным id не существует',
    route: 'Запрашиваемый ресурс не найден',
  },
  409: 'Пользователь с таким email уже существует',
  default: 'Произошла ошибка на сервере',
};
