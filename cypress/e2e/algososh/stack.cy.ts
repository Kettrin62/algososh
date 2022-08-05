import { 
  openPage, 
  addToStack, 
  notHaveTop 
} from './utils/functions.cy';
import {
  CHANGING_COLOR,
  SHORT_DELAY_IN_MS
} from './utils/constants.cy';

describe('Корректно отображается страница "Стек"', () => {
  before(function() {
    cy.visit('http://localhost:3000');
    openPage('Стек', 'stack');
  });

  it('Если инпут пустой, то кнопка заблокирована', () => {
    cy.get('input').should('be.empty');
    cy.contains('Добавить').should('be.disabled');
  });

  it('Если инпут непустой, то кнопка разблокирована', () => {
    cy.get('input').as('input');
    cy.get('@input').type('1');
    cy.get('button').contains('Добавить').should('not.be.disabled');
    cy.get('@input').clear();
  });

  it('Элемент правильно добавляется в стек', () => {
    addToStack('1');
    addToStack('2');
    cy.get('[class^=circle_circle]').first().as('prev0');
    notHaveTop('@prev0');
    addToStack('3');
    cy.get('[class^=circle_circle]').eq(1).as('prev1');
    notHaveTop('@prev1');
    addToStack('4');
    cy.get('[class^=circle_circle]').eq(2).as('prev2');
    notHaveTop('@prev2');
  });

  it('Элемент правильно удаляется из стека', () => {
    cy.get('[class^=circle_circle]').last().as('last');
    cy.get('button').contains('Удалить').click();
    cy.get(`@last`)
      .should('have.css', 'border', CHANGING_COLOR)
      .contains('4');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[class^=circle_circle]').last().as('newLast');
    cy.get('@newLast').contains('3');
    cy.get('@newLast').prev().should('have.text', 'top');
  });

  it('Правильно очищается стек по нажатию кнопки "Очистить"', () => {
    cy.get('button').contains('Очистить').click();
    cy.get('ul').children().should('have.length', '0');
  })
});