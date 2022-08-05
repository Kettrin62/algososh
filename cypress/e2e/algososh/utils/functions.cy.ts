import { 
  CHANGING_COLOR, 
  DEFAULT_COLOR, 
  SHORT_DELAY_IN_MS 
} from "./constants.cy";


export function backToContants() {
  it('При клике "К оглавлению" должна открыться главная страница', 
    () => {
      cy.get('button').contains('К оглавлению').click();
      cy.contains('МБОУ АЛГОСОШ');
    }
  );
}

export const openPage = (page: string, href: string) => {
  cy.get(`[href*=${href}]`).click();
  cy.contains(`${page}`);
};

export const addToStack = (value: string) => {
  cy.get('input').as('input');
  cy.get('@input').type(value);
  cy.get('button').contains('Добавить').as('buttonAdd');
  
  cy.get('@buttonAdd').click();

  cy.get('[class^=circle_circle]').last().as(value);
  cy.get(`@${value}`)
    .should('have.css', 'border', CHANGING_COLOR)
    .contains(value);
  cy.wait(SHORT_DELAY_IN_MS);
  cy.get(`@${value}`)
    .should('have.css', 'border', DEFAULT_COLOR)
    .contains(value);
  cy.get(`@${value}`).prev().should('have.text', 'top');
};

export function notHaveTop(el: string) {
  cy.get(el).prev().should('not.have.text', 'top');
}

export const addToQueue = (value: string, index: number) => {
  cy.get('input').as('input');
  cy.get('@input').type(value);
  cy.get('button').contains('Добавить').as('buttonAdd');
  
  cy.get('@buttonAdd').click();
  cy.get('[class^=circle_circle]').eq(index).as(value);
  cy.get(`@${value}`)
    .should('have.css', 'border', CHANGING_COLOR)
    .contains(value);
  cy.wait(SHORT_DELAY_IN_MS);
  cy.get(`@${value}`)
    .should('have.css', 'border', DEFAULT_COLOR)
    .contains(value);
  cy.get('[class^=circle_circle]')
    .first()
    .prev()
    .should('have.text', 'head');
  cy.get('[class^=circle_circle]')
    .eq(index)
    .next()
    .next()
    .should('have.text', 'tail');
};

export function notHaveTail(el: string) {
  cy.get(el)
    .next()
    .next()
    .should('not.have.text', 'tail');
}