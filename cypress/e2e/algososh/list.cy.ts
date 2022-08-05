import { 
  openPage, 
} from './utils/functions.cy';
import {
  DEFAULT_COLOR,
  CHANGING_COLOR,
  MODIFIED_COLOR,
  SHORT_DELAY_IN_MS
} from './utils/constants.cy';

describe('Корректно отображается страница "Связный список"', () => {
  before(function() {
    cy.visit('http://localhost:3000');
    openPage('Связный список', 'list');
  });

  it('Если инпут пустой, то кнопка заблокирована', () => {
    cy.get('input').first().should('be.empty');
    cy.contains('Добавить в head').should('be.disabled');
    cy.contains('Добавить в tail').should('be.disabled');
    cy.contains('Добавить по индексу').should('be.disabled');
    cy.get('input').last().should('be.empty');
    cy.contains('Удалить по индексу').should('be.disabled');
  });

  it('Если инпут непустой, то кнопка разблокирована', () => {
    cy.get('input').first().type('a');
    cy.get('button')
      .contains('Добавить в head')
      .should('not.be.disabled');
    cy.get('button')
      .contains('Добавить в tail')
      .should('not.be.disabled');
    cy.get('input').last().type('2');
    cy.get('button')
      .contains('Добавить по индексу')
      .should('not.be.disabled');
    cy.get('button')
      .contains('Удалить по индексу')
      .should('not.be.disabled');
  });

  it('Корректно отрисовывается дефолтный список', () => {
    cy.get('ul').children().should('not.have.length', '0');
    cy.get('[class^=circle_circle]')
      .first()
      .prev()
      .should('have.text', 'head');
    cy.get('[class^=circle_circle]')
      .last()
      .next()
      .next()
      .should('have.text', 'tail');
  });

  it('Элемент правильно добавляется в head', () => {
    cy.get('[class^=circle_circle]').first().as('head');
    cy.get('button').contains('Добавить в head').click();
    cy.get('@head')
      .prev()
      .should('not.have.text', 'head')
      .and('have.text', 'a');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[class^=circle_circle]').first().as('newHead');
    cy.get('@newHead')
      .should('have.css', 'border', MODIFIED_COLOR)
      .and('have.text', 'a');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@newHead')
      .should('have.css', 'border', DEFAULT_COLOR)
      .and('have.text', 'a');
    cy.get('@newHead')
      .prev()
      .should('have.text', 'head');
  });

  it('Элемент правильно добавляется в tail', () => {
    cy.get('input').first().type('z');
    cy.get('[class^=circle_circle]').last().as('tail');
    cy.get('button').contains('Добавить в tail').click();
    cy.get('@tail')
      .prev()
      .should('have.text', 'z');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[class^=circle_circle]').last().as('newTail');
    cy.get('@newTail')
      .should('have.css', 'border', MODIFIED_COLOR)
      .and('have.text', 'z');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@newTail')
      .should('have.css', 'border', DEFAULT_COLOR)
      .and('have.text', 'z');
    cy.get('@newTail')
      .next()
      .next()
      .should('have.text', 'tail');
    cy.get('@tail')
      .prev()
      .should('not.have.text');
    cy.get('@tail')
      .next()
      .next()
      .should('not.have.text');
  });

  it('Элемент правильно добавляется по индексу', () => {
    cy.get('input').first().type('k');
    cy.get('[class^=circle_circle]').first().as('head');
    cy.get('[class^=circle_circle]').eq(1).as('el1');
    cy.get('[class^=circle_circle]').eq(2).as('el2');
    cy.get('button').contains('Добавить по индексу').click();

    cy.get('@head')
      .prev()
      .should('not.have.text', 'head')
      .and('have.text', 'k');

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@head').should('have.css', 'border', CHANGING_COLOR);
    cy.get('@head')
      .prev()
      .should('have.text', 'head');
    cy.get('@el1')
      .prev()
      .should('have.text', 'k');

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@el1').should('have.css', 'border', CHANGING_COLOR);
    cy.get('@el1')
      .prev()
      .should('not.have.text');
    cy.get('@el2')
      .prev()
      .should('have.text', 'k');

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@el2')
      .prev()
      .should('not.have.text');
    cy.get('[class^=circle_circle]')
      .eq(2)
      .should('have.css', 'border', MODIFIED_COLOR)
      .contains('k');
    
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('ul').each(($el) => {
    cy.wrap($el.find('[class^=circle_circle]'))
      .should('have.css', 'border', DEFAULT_COLOR);
    });
  })

  it('Элемент правильно удаляется из head', () => {
    cy.get('[class^=circle_circle]').first().as('head');
    cy.get('button').contains('Удалить из head').click();

    cy.get('@head').should('not.have.text');
    cy.get('@head')
      .next()
      .next()
      .contains('a');
    
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[class^=circle_circle]').first().as('newHead');
    cy.get('@newHead')
      .should('not.be.empty')
      .and('have.css', 'border', DEFAULT_COLOR);
    cy.get('@newHead')
      .prev()
      .should('have.text', 'head');
  });

  it('Элемент правильно удаляется из tail', () => {
    cy.get('[class^=circle_circle]').last().as('tail');
    cy.get('button').contains('Удалить из tail').click();

    cy.get('@tail').should('not.have.text');
    cy.get('@tail')
      .next()
      .next()
      .contains('z')
      .should('not.have.text', 'tail');

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[class^=circle_circle]').last().as('newTail');
    cy.get('@newTail')
      .should('not.be.empty')
      .and('have.css', 'border', DEFAULT_COLOR);
    cy.get('@newTail')
      .next()
      .next()
      .should('have.text', 'tail');
  });

  it('Элемент правильно удаляется по индексу', () => {
    cy.get('input').last().type('1');
    cy.get('[class^=circle_circle]').first().as('head');
    cy.get('[class^=circle_circle]').eq(1).as('el1');
    cy.get('button').contains('Удалить по индексу').click();

    cy.get('@head').should('have.css', 'border', CHANGING_COLOR);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@el1').should('have.css', 'border', CHANGING_COLOR);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@el1').should('have.not.text');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@el1')
      .next()
      .next()
      .contains('k');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@el1')
      .next()
      .next()
      .should('be.empty');
    cy.get('@head').should('have.css', 'border', DEFAULT_COLOR);
    cy.get('@el1').should('have.css', 'border', DEFAULT_COLOR);
  });
})