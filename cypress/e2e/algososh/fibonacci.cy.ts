import { openPage } from './utils/functions.cy';
import { SHORT_DELAY_IN_MS} from './utils/constants.cy';

describe('Корректно отображается страница "Последовательность Фибоначчи"', () => {
  before(function() {
    cy.visit('http://localhost:3000');
    openPage('Последовательность Фибоначчи', 'fibonacci');
  });

  it('Если инпут пустой, то кнопка заблокирована', () => {
    cy.get('input').should('be.empty');
    cy.get('button').should('be.disabled');
  });

  it('Если инпут непустой, то кнопка разблокирована', () => {
    cy.get('input').type('5');
    cy.get('button').should('not.be.disabled');
  });

  it('Последовательность рассчитывается корректно', () => {
    cy.get('button').contains('Рассчитать').click();

    cy.get('[class^=circle_circle]').first().contains('0');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('ul>li')
      .eq(1)
      .find('[class^=circle_circle]')
      .contains('1');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('ul>li')
      .eq(2)
      .find('[class^=circle_circle]')
      .contains('1');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('ul>li')
      .eq(3)
      .find('[class^=circle_circle]')
      .contains('2');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('ul>li')
      .eq(4)
      .find('[class^=circle_circle]')
      .contains('3');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[class^=circle_circle]').last().contains('5');
  })
});