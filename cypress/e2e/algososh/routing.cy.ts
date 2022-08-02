import { 
  backToContants,
  openPage
} from './utils/functions.cy';

describe('Корректность работы роутинга', () => {
  before(function() {
    cy.visit('http://localhost:3000');
  });

  it('По умолчанию должна открываться главная страница', () => {
    cy.contains('МБОУ АЛГОСОШ');
  });

  it('При клике на "Строка" должна открыться страница "Строка"', 
    () => {
      // cy.get('[href="/recursion"]').click();
      // cy.contains('Строка');
      openPage('Строка', 'recursion');
    }
  );

  backToContants();

  it('При клике на "Последовательность Фибоначчи" должна открыться страница "Последовательность Фибоначчи"', 
    () => {
      // cy.get('[href="/fibonacci"]').click();
      // cy.contains('Последовательность Фибоначчи');
      openPage('Последовательность Фибоначчи', 'fibonacci');
    }
  );

  backToContants();

  it('При клике на "Сортировка массива" должна открыться страница "Сортировка массива"', 
    () => {
      // cy.get('[href="/sorting"]').click();
      // cy.contains('Сортировка массива');
      openPage('Сортировка массива', 'sorting');
    }
  );

  backToContants();

  it('При клике на "Стек" должна открыться страница "Стек"', 
    () => {
      // cy.get('[href="/stack"]').click();
      // cy.contains('Стек');
      openPage('Стек', 'stack');
    }
  );

  backToContants();

  it('При клике на "Очередь" должна открыться страница "Очередь"', 
    () => {
      // cy.get('[href="/queue"]').click();
      // cy.contains('Очередь');
      openPage('Очередь', 'queue');
    }
  );

  backToContants();

  it('При клике на "Связный список" должна открыться страница "Связный список"', 
    () => {
      // cy.get('[href="/list"]').click();
      // cy.contains('Связный список');
      openPage('Связный список', 'list');
    }
  );

  backToContants();
});