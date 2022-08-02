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