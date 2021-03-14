describe('checking authorization', () => {
  const onBeforeLoad = (win: Cypress.AUTWindow) => {
    // @ts-ignore
    // eslint-disable-next-line no-param-reassign,no-proto
    delete win.navigator.__proto__.serviceWorker;
  };

  beforeEach(() => {
    cy.server();
  });

  describe('checking failed user request', () => {
    beforeEach(() => {
      cy.route({
        url: /user/,
        status: 401,
        response: {},
      });
    });

    it('checking render authorization page', () => {
      cy.visit('/', { onBeforeLoad });

      cy.get('h1').should('contain', 'Авторизация');
    });

    it('checking authorization request body', () => {
      cy.visit('/', { onBeforeLoad });

      cy
        .get('[name="login"]')
        .type('Логин');

      cy
        .get('[name="password"]')
        .type('Пароль');

      cy.intercept({
        url: /signin/,
        method: 'POST',
      }, (req) => {
        req.reply((res) => {
          res.send(req.body);
        });
      }).as('loginRequest');

      cy
        .contains('Войти')
        .click();

      cy.wait('@loginRequest').its('response.body').should('eq', '{"login":"Логин","password":"Пароль"}');
    });

    it('checking successful authorization', () => {
      cy.visit('/', { onBeforeLoad });

      cy
        .get('[name="login"]')
        .type('Логин');

      cy
        .get('[name="password"]')
        .type('Пароль');

      cy.intercept({
        url: /signin/,
        method: 'POST',
      }, {
        statusCode: 200,
      });

      cy.route({
        url: /user/,
        status: 200,
        response: {
          id: 36,
        },
      });

      cy
        .contains('Войти')
        .click();

      cy.get('h1').should('contain', 'Игра');
    });

    it('checking failed authorization', () => {
      cy.visit('/', { onBeforeLoad });

      cy
        .get('[name="login"]')
        .type('Логин');

      cy
        .get('[name="password"]')
        .type('Пароль');

      cy.intercept({
        url: /signin/,
        method: 'POST',
      }, {
        statusCode: 401,
      });

      cy
        .contains('Войти')
        .click();

      cy.contains('Вы ввели неправильный логин или пароль');
    });
  });

  describe('checking successful user request', () => {
    it('checking render game page', () => {
      cy.route({
        url: /user/,
        status: 200,
        response: {
          id: 36,
        },
      });

      cy.visit('/', { onBeforeLoad });

      cy.get('h1').should('contain', 'Игра');
    });
  });
});
