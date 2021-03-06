# Описание API проекта

- [Форум](#форум)
  - [`GET /api/posts?$limit=<значение>&$page=<значение>/`](#get-apipostslimitзначениеpageзначение)
  - [`GET /api/posts/:postId/`](#get-apipostspostid)
  - [`POST /api/posts/`](#post-apiposts)
  - [`POST /api/posts/:postId/comments/`](#post-apipostspostidcomments)
  - [`POST /api/posts/:postId/like/`](#post-apipostspostidlike)
  - [`DELETE /api/posts/:postId/like/`](#delete-apipostspostidlike)
- [Пользовательская темизация](#пользовательская-темизация)
  - [`GET /api/user-theme/`](#get-apiuser-theme)
  - [`PATCH /api/user-theme/`](#patch-apiuser-theme)
- [CRUD темизации](#crud-темизации)
  - [`GET /api/themes?$limit=<значение>&$page=<значение>/`](#get-apithemeslimitзначениеpageзначение)
  - [`GET /api/themes/:themeId/`](#get-apithemesthemeid)
  - [`POST /api/themes/`](#post-apithemes)
  - [`PATCH /api/themes/:themeId/`](#patch-apithemesthemeid)
  - [`DELETE /api/themes/:themeId/`](#delete-apithemesthemeid)
- [Обратная связь](#обратная-связь)
  - [`GET /api/feedback/`](#get-apifeedback)
  - [`POST /api/feedback/`](#post-apifeedback)

## Форум

### `GET /api/posts?$limit=<значение>&$page=<значение>/`

Возвращает список постов.

Параметры запроса:

| Название  | Обязательный | Описание                                    |
| :-------- | :----------- |:------------------------------------------- |
| `$limit`  | Нет          | Максимальное количество возвращаемых постов |
| `$page`   | Нет          | Порядковый номер страницы                   |

Сигнатура ответа:

```
{
    total: number; // Общее количество постов
    items: [{ // Массив постов
        commentsCount: number; // Количество комментариев
        createdAt: string; // Дата создания
        id: number; // Идентификатор
        title: string; // Заголовок
        updatedAt: string; // Дата обновления
        user: { // Информация о пользователе, создавшем пост
            avatar: string | null; // Аватар
            display_name: string | null; // Отображаемое имя
            email: string; // E-mail
            first_name: string; // Имя
            id: number; // Идентификатор
            login: string; // Логин
            phone: string; // Телефон
            second_name: string; // Фамилия
        },
        userId: number; // Идентификатор пользователя, создавшего пост
    }];
}
```

### `GET /api/posts/:postId/`

Возвращает информацию о посте.

Параметры запроса:

| Название | Обязательный | Описание            |
| :------- | :----------- | :------------------ |
| `postId` | Да           | Идентификатор поста |

Сигнатура ответа:

```
{
    comments: [{ // Массив комментариев к посту
        children: Array; // Массив ответов к комментарию
        createdAt: string; // Дата создания комментария
        id: number; // Идентификатор комментария
        parentId: number | null; Идентификатор родительского комментария
        postId: number; // Идентификатор поста, к которому относится комментарий
        text: string; // Текст комментария
        updatedAt: string; // Дата обновления комментария
        user: { // Информация о пользователе, создавшем комментарий
            avatar: string | null; // Аватар
            display_name: string | null; // Отображаемое имя
            email: string; // E-mail
            first_name: string; // Имя
            id: number; // Идентификатор
            login: "string; // Логин
            phone: string; // Телефон
            second_name: string; // Фамилия
        },
        userId: number; // Идентификатор пользователя, создавшего комментарий
    }],
    createdAt: string; // Дата создания поста
    id: number; // Идентификатор поста
    text: string; // Текст поста
    title: string; // Заголовок поста
    updatedAt: string; // Дата обновления поста
    userId: number; // Идентификатор пользователя, создавшего пост
}
```

### `POST /api/posts/`

Создает пост.

Тело запроса:

| Название   | Тип      | Описание        |
| :--------- | :------- | :-------------- |
| `text`     | `string` | Текст поста     |
| `title`    | `string` | Заголовок поста |

Сигнатура ответа:

```
{
    createdAt: string; // Дата создания
    id: number; // Идентификатор
    text: string; // Текст
    title: string; // Заголовок
    updatedAt: string; // Дата обновления
    userId: number; // Идентификатор пользователя, создавшего пост
}
```

### `POST /api/posts/:postId/comments/`

Добавляет комментарий к посту.

Параметры запроса:

| Название | Обязательный | Описание            |
| :------- | :----------- | :-----------------  |
| `postId` | Да           | Идентификатор поста |

Тело запроса:

| Название   | Тип              | Описание                                 |
| :--------- | :--------------- | :--------------------------------------- |
| `parentId` | `number \| null` | Идентификатор родительского комментария  |
| `text`     | `string`         | Текст комментария                        |

Сигнатура ответа:

```
{
    id: number; // Идентификатор
    parentId: number | null; Идентификатор родительского комментария
    postId: number; // Идентификатор поста, к которому относится комментарий
    text: string; // Текст
    updatedAt: string; // Дата обновления
    userId: number; // Идентификатор пользователя, создавшего комментарий
}
```

### `POST /api/posts/:postId/like/`

Ставит лайк под постом.

Параметры запроса:

| Название | Обязательный | Описание            |
| :------- | :----------- | :-----------------  |
| `postId` | Да           | Идентификатор поста |

Сигнатура ответа:

```
{
    createdAt: string; // Дата создания
    id: number; // Идентификатор
    postId: number; // Идентификатор поста
    updatedAt: string; // Дата обновления
    userId: number; // Идентификатор пользователя, поставившего лайк
}
```

### `DELETE /api/posts/:postId/like/`

Убирает лайк под постом.

Параметры запроса:

| Название | Обязательный | Описание            |
| :------- | :----------- | :-----------------  |
| `postId` | Да           | Идентификатор поста |

Сигнатура ответа:

```
{
    count: number; // Количество убранных лайков
}
```

## Пользовательская темизация

### `GET /api/user-theme/`

Возвращает текущую тему пользователя

Сигнатура ответа:
```
{
    createdAt: string; // Дата создания
    id: number; // Идентификатор
    themeName: string; // Название темы
    updatedAt: string; // Дата обновления
    userId: number; // Идентификатор пользователя
}
```

### `PATCH /api/user-theme/`

Изменяет текущую тему пользователя.

Тело запроса:

| Название    | Тип      | Описание      |
| :---------- | :------- | :------------ |
| `themeName` | `string` | Название темы |

Сигнатура ответа:
```
[number] // Массив с количеством измененных тем
```


### CRUD темизации

### `GET /api/themes?$limit=<значение>&$page=<значение>/`

Возвращает список тем.

Параметры запроса:

| Название | Обязательный | Описание                                 |
| :------- | :----------- |:---------------------------------------- |
| `$limit` | Нет          | Максимальное количество возвращаемых тем |
| `$page`  | Нет          | Порядковый номер страницы                |

Сигнатура ответа:

```
{
    total: number; // Общее количество тем
    items: [{ // Массив тем
        createdAt: string; // Дата создания
        deletedAt: string | null; // Дата удаления
        description: string; // Описание
        id: number; // Идентификатор
        name: string; // Название
        updatedAt: string; // Дата обновления
    }];
}
```

### `GET /api/themes/:themeId/`

Возвращает информацию о теме.

Параметры запроса:

| Название  | Обязательный | Описание            |
| :-------- | :----------- | :------------------ |
| `themeId` | Да           | Идентификатор темы  |

Сигнатура ответа:

```
{
    createdAt: string; // Дата создания
    deletedAt: string | null; // Дата удаления
    description: string; // Описание
    id: number; // Идентификатор
    name: string; // Название
    updatedAt: string; // Дата обновления
}
```

### `POST /api/themes/`

Создает тему.

Тело запроса:

| Название      | Тип      | Описание      |
| :------------ | :------- | :------------ |
| `description` | `string` | Описание темы |
| `name`        | `string` | Название темы |

Сигнатура ответа:

```
{
    createdAt: string; // Дата создания
    deletedAt: string | null; // Дата удаления
    description: string; // Описание
    id: number; // Идентификатор
    name: string; // Название
    updatedAt: string; // Дата обновления
}
```

### `PATCH /api/themes/:themeId/`

Изменяет тему.

Параметры запроса:

| Название  | Обязательный | Описание            |
| :-------- | :----------- | :------------------ |
| `themeId` | Да           | Идентификатор темы  |

Тело запроса:

| Название      | Тип      | Описание      |
| :------------ | :------- | :------------ |
| `description` | `string` | Описание темы |
| `name`        | `string` | Название темы |

Сигнатура ответа:

```
[number] // Массив с количеством измененных тем
```

### `DELETE /api/themes/:themeId/`

Удаляет тему.

Параметры запроса:

| Название  | Обязательный | Описание            |
| :-------- | :----------- | :------------------ |
| `themeId` | Да           | Идентификатор темы  |

Сигнатура ответа:

```
{
    count: number; // Количество измененных тем
}
```

## Обратная связь

### `GET /api/feedback/`

Возвращает список сообщений обратной связи.

Параметры запроса:

| Название  | Обязательный | Описание                                       |
| :-------- | :----------- |:---------------------------------------------- |
| `$limit`  | Нет          | Максимальное количество возвращаемых сообщений |
| `$page`   | Нет          | Порядковый номер страницы                      |

Сигнатура ответа:
```
{
    total: number; // Общее количество сообщений
    items: [{ // Массив сообщений
        createdAt: string; // Дата создания
        id: string; // Идентификатор
        message: string; // Текст
        title: string; // Заголовок
        uptatedAt: string; // Дата обновления
        user: { // Информация о пользователе, отправившем сообщение
            avatar: string | null; // Аватар
            display_name: string | null; // Отображаемое имя
            email: string; // E-mail
            first_name: string; // Имя
            id: number; // Идентификатор
            login: "string; // Логин
            phone: string; // Телефон
            second_name: string; // Фамилия
        },
        userId: number; // Идентификатор пользователя, отправившего сообщение
    }];
}
```

### `POST /api/feedback/`

Отправляет сообщение обратной связи.

Тело запроса:

| Название   | Тип      | Описание            |
| :--------- | :------- | :------------------ |
| `message`  | `string` | Текст сообщения     |
| `title`    | `string` | Заголовок сообщения |

Сигнатура ответа:

```
{
    createdAt: string; // Дата создания
    message: string; // Текст
    title: string; // Заголовок
    uptatedAt: string; // Дата обновления
    userId: number; // Идентификатор пользователя, отправившего сообщение
    _id: string; // Идентификатор
}
```
