import { 
  openPage, 
  addToQueue, 
  notHaveTail
} from './utils/functions.cy';
import {
  DEFAULT_COLOR,
  CHANGING_COLOR,
  SHORT_DELAY_IN_MS
} from './utils/constants.cy';

describe('Корректно отображается страница "Очередь"', () => {
  before(function() {
    cy.visit('http://localhost:3000');
    openPage('Очередь', 'queue');
  });

  it('Если инпут пустой, то кнопка заблокирована', () => {
    cy.get('input').should('be.empty');
    cy.contains('Добавить').should('be.disabled');
  });

  it('Если инпут непустой, то кнопка разблокирована', () => {
    cy.get('input').as('input');
    cy.get('input').type('1');
    cy.get('button').contains('Добавить').should('not.be.disabled');
    cy.get('@input').clear();
  });

  it('Элементы правильно добавляются в очередь', () => {
    addToQueue('1', 0);
    addToQueue('2', 1);
    cy.get('[class^=circle_circle]').first().as('prev0');
    notHaveTail('@prev0');
    addToQueue('3', 2);
    cy.get('[class^=circle_circle]').eq(1).as('prev1');
    notHaveTail('@prev1');
    addToQueue('4', 3);
    cy.get('[class^=circle_circle]').eq(2).as('prev2');
    notHaveTail('@prev2');
  });

  it('Элемент правильно удаляется из очереди', () => {
    cy.get('[class^=circle_circle]').first().as('first');
    cy.get('button').contains('Удалить').click();
    cy.get(`@first`)
      .should('have.css', 'border', CHANGING_COLOR)
      .contains('1');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(`@first`)
      .should('have.css', 'border', DEFAULT_COLOR)
      .should('not.have.text');
    cy.get(`@first`)
      .prev()
      .should('not.have.text', 'head');
    cy.get('[class^=circle_circle]')
      .eq(1)
      .prev()
      .should('have.text', 'head');
  });

  it('Правильно очищается очередь по нажатию кнопки "Очистить"', () => {
    cy.get('button').contains('Очистить').click();
    cy.get('ul').each(($el) => {
      cy.wrap($el.find('[class^=circle_circle]')).should('not.have.text');
    });
  });
})