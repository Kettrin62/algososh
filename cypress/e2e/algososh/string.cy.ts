import { openPage } from './utils/functions.cy';
import {
  DEFAULT_COLOR,
  CHANGING_COLOR,
  MODIFIED_COLOR
} from './utils/constants.cy';

describe('Корректно отображается страница "Строка"', () => {
  before(function() {
    cy.visit('http://localhost:3000');
    openPage('Строка', 'recursion');
  });

  it('Если инпут пустой, то кнопка заблокирована', () => {
    cy.get('input').should('be.empty');
    cy.get('button').should('be.disabled');
  });

  it('Если инпут непустой, то кнопка разблокирована', () => {
    cy.get('input').type('ketrin');
    cy.get('button').should('not.be.disabled');
  });

  it('Строка разворачивается корректно', () => {
    cy.get('button').contains('Развернуть').click();

    cy.get('[class^=circle_circle]').first().as('k');
    cy.get('ul>li').eq(1).find('[class^=circle_circle]').as('e');
    cy.get('ul>li').eq(2).find('[class^=circle_circle]').as('t');
    cy.get('ul>li').eq(3).find('[class^=circle_circle]').as('r');
    cy.get('ul>li').eq(4).find('[class^=circle_circle]').as('i');
    cy.get('[class^=circle_circle]').last().as('n');

    cy.get('@k')
      .should('have.css', 'border', CHANGING_COLOR)
      .contains('k');
    cy.get('@e')
      .should('have.css', 'border', DEFAULT_COLOR)
      .contains('e');
    cy.get('@t')
      .should('have.css', 'border', DEFAULT_COLOR)
      .contains('t');
    cy.get('@r')
      .should('have.css', 'border', DEFAULT_COLOR)
      .contains('r');
    cy.get('@i')
      .should('have.css', 'border', DEFAULT_COLOR)
      .contains('i');
    cy.get('@n')
      .should('have.css', 'border', CHANGING_COLOR)
      .contains('n');

    cy.get('@k')
      .should('have.css', 'border', MODIFIED_COLOR)
      .contains('n');
    cy.get('@e')
      .should('have.css', 'border', CHANGING_COLOR)
      .contains('e');
    cy.get('@t')
      .should('have.css', 'border', DEFAULT_COLOR)
      .contains('t');
    cy.get('@r')
      .should('have.css', 'border', DEFAULT_COLOR)
      .contains('r');
    cy.get('@i')
      .should('have.css', 'border', CHANGING_COLOR)
      .contains('i');
    cy.get('@n')
      .should('have.css', 'border', MODIFIED_COLOR)
      .contains('k');

    cy.get('@k')
      .should('have.css', 'border', MODIFIED_COLOR)
      .contains('n');
    cy.get('@e')
      .should('have.css', 'border', MODIFIED_COLOR)
      .contains('i');
    cy.get('@t')
      .should('have.css', 'border', CHANGING_COLOR)
      .contains('t');
    cy.get('@r')
      .should('have.css', 'border', CHANGING_COLOR)
      .contains('r');
    cy.get('@i')
      .should('have.css', 'border', MODIFIED_COLOR)
      .contains('e');
    cy.get('@n')
      .should('have.css', 'border', MODIFIED_COLOR)
      .contains('k');

    cy.get('@k')
      .should('have.css', 'border', MODIFIED_COLOR)
      .contains('n');
    cy.get('@e')
      .should('have.css', 'border', MODIFIED_COLOR)
      .contains('i');
    cy.get('@t')
      .should('have.css', 'border', MODIFIED_COLOR)
      .contains('r');
    cy.get('@r')
      .should('have.css', 'border', MODIFIED_COLOR)
      .contains('t');
    cy.get('@i')
      .should('have.css', 'border', MODIFIED_COLOR)
      .contains('e');
    cy.get('@n')
      .should('have.css', 'border', MODIFIED_COLOR)
      .contains('k');
  })
});