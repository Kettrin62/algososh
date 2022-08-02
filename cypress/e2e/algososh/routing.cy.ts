function backToContants() {
  it('При клике "К оглавлению" должна открыться главная страница', 
    () => {
      cy.get('button').contains('К оглавлению').click();
      cy.contains('МБОУ АЛГОСОШ');
    }
  );
}

describe('Корректность работы роутинга', () => {
  before(function() {
    cy.visit('http://localhost:3000');
  });

  it('По умолчанию должна открываться главная страница', () => {
    cy.contains('МБОУ АЛГОСОШ');
  });

  it('При клике на "Строка" должна открыться страница "Строка"', 
    () => {
      cy.get('[href="/recursion"]').click();
      cy.contains('Строка');
    }
  );

  backToContants();

  it('При клике на "Последовательность Фибоначчи" должна открыться страница "Последовательность Фибоначчи"', 
    () => {
      cy.get('[href="/fibonacci"]').click();
      cy.contains('Последовательность Фибоначчи');
    }
  );

  backToContants();

  it('При клике на "Сортировка массива" должна открыться страница "Сортировка массива"', 
    () => {
      cy.get('[href="/sorting"]').click();
      cy.contains('Сортировка массива');
    }
  );

  backToContants();

  it('При клике на "Стек" должна открыться страница "Стек"', 
    () => {
      cy.get('[href="/stack"]').click();
      cy.contains('Стек');
    }
  );

  backToContants();

  it('При клике на "Очередь" должна открыться страница "Очередь"', 
    () => {
      cy.get('[href="/queue"]').click();
      cy.contains('Очередь');
    }
  );

  backToContants();

  it('При клике на "Связный список" должна открыться страница "Связный список"', 
    () => {
      cy.get('[href="/list"]').click();
      cy.contains('Связный список');
    }
  );

  backToContants();
});