describe('checking authorization', () => {
  beforeEach(() => {
    cy.server();

    cy.intercept('GET', /auth\/user/, {
      statusCode: 200,
      body: {
        id: 36,
        first_name: 'Иван',
        second_name: 'Иванов',
      },
    });

    cy.intercept('GET', /user-theme/, {
      statusCode: 200,
      body: {
        themeName: 'light',
      },
    });
  });

  describe('checking posts list', () => {
    it('checking render posts list', () => {
      cy.intercept('GET', /posts/, {
        statusCode: 200,
        body: {
          items: [{
            commentsCount: 0,
            createdAt: '2021-03-03T12:15:15.080Z',
            id: 2,
            title: 'Заголовок 2',
            updatedAt: '2021-03-03T12:15:15.080Z',
            user: {
              first_name: 'Иван',
              second_name: 'Иванов',
            },
          }, {
            commentsCount: 2,
            createdAt: '2021-03-03T12:25:15.080Z',
            id: 1,
            title: 'Заголовок 1',
            updatedAt: '2021-03-03T12:25:15.080Z',
            user: {
              first_name: 'Петр',
              second_name: 'Петров',
            },
          }],
          total: 2,
        },
      });

      cy.visit('/forum');

      cy.get('h1').should('contain', 'Форум');

      cy.contains('Заголовок 1').should('exist');

      cy.contains('Создано 3 марта 2021 в 15:15 пользователем Иван Иванов').should('exist');

      cy.contains('0 комментариев').should('exist');

      cy.contains('Заголовок 2').should('exist');

      cy.contains('Создано 3 марта 2021 в 15:25 пользователем Петр Петров').should('exist');

      cy.contains('2 комментария').should('exist');
    });

    it('checking creating post', () => {
      cy.intercept('GET', /posts/, {
        statusCode: 200,
        body: {
          items: [],
          total: 0,
        },
      });

      cy.visit('/forum');

      cy
        .get('[name="title"]')
        .type('Заголовок');

      cy
        .get('[name="text"]')
        .type('Сообщение');

      cy.intercept({
        url: /api\/posts/,
        method: 'POST',
      }, (req) => {
        req.reply({
          ...req.body,
          createdAt: '2021-03-03T12:52:09.974Z',
          id: 1,
          updatedAt: '2021-03-03T12:52:09.974Z',
          userId: 36,
        });
      }).as('createPostRequest');

      cy
        .contains('Создать')
        .click();

      cy.wait('@createPostRequest');

      cy.contains('Заголовок').should('exist');

      cy.contains('Создано 3 марта 2021 в 15:52 пользователем Иван Иванов').should('exist');

      cy.contains('0 комментариев').should('exist');
    });
  });

  describe('checking post page', () => {
    beforeEach(() => {
      cy.intercept('GET', /posts\/1/, {
        statusCode: 200,
        body: {
          comments: [{
            children: [],
            createdAt: '2021-03-03T13:16:52.136Z',
            id: 1,
            parentId: null,
            postId: 3,
            text: 'Комментарий 1',
            updatedAt: '2021-03-03T13:16:52.136Z',
            user: {
              id: 36,
              first_name: 'Иван',
              second_name: 'Иванов',
            },
          }],
          createdAt: '2021-03-03T12:52:09.974Z',
          id: 3,
          likes: [{ userId: 1 }, { userId: 2 }, { userId: 3 }],
          text: 'Текст',
          title: 'Заголовок',
          user: {
            id: 36,
            first_name: 'Петр',
            second_name: 'Петров',
          },
          updatedAt: '2021-03-03T12:52:09.974Z',
        },
      });
    });

    it('checking post information', () => {
      cy.visit('/forum/1');

      cy.get('h1').should('contain', 'Заголовок');

      cy.contains('Автор: Петр Петров').should('exist');

      cy.contains('Создано: 3 марта 2021 в 15:52').should('exist');

      cy.contains('Текст').should('exist');

      cy.contains('Всего лайков: 3').should('exist');

      cy.contains('Иван Иванов написал 3 марта 2021 в 16:16').should('exist');

      cy.contains('Комментарий 1').should('exist');
    });

    it('checking comment creating', () => {
      cy.visit('/forum/1');

      cy
        .get('[name="text"]')
        .type('Комментарий 2');

      cy.intercept({
        url: /comments/,
        method: 'POST',
      }, (req) => {
        req.reply({
          ...req.body,
          createdAt: '2021-03-03T13:30:12.025Z',
          parentId: null,
          postId: 1,
          id: 2,
          updatedAt: '2021-03-03T13:30:12.025Z',
          userId: 36,
        });
      }).as('createCommentRequest');

      cy
        .contains('Добавить')
        .click();

      cy.wait('@createCommentRequest');

      cy.get('ul li:nth-child(2)').should('contain', 'Иван Иванов написал 3 марта 2021 в 16:30');

      cy.get('ul li:nth-child(2)').should('contain', 'Комментарий 2');
    });

    it('checking comment child creating', () => {
      cy.visit('/forum/1');

      cy
        .contains('Ответить')
        .click();

      cy
        .get('ul li [name="text"]')
        .type('Комментарий 2');

      cy.intercept({
        url: /comments/,
        method: 'POST',
      }, (req) => {
        req.reply({
          ...req.body,
          createdAt: '2021-03-03T13:30:12.025Z',
          parentId: 1,
          postId: 1,
          id: 2,
          updatedAt: '2021-03-03T13:30:12.025Z',
          userId: 36,
        });
      }).as('createCommentRequest');

      cy
        .get('[aria-label="Отправить ответ на комментарий"]')
        .click();

      cy.wait('@createCommentRequest');

      cy.get('ul li ul li').should('contain', 'Иван Иванов написал 3 марта 2021 в 16:30');

      cy.get('ul li ul li').should('contain', 'Комментарий 2');
    });
  });
});
