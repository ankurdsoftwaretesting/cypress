/// <reference types="cypress" />

describe('Our first test', () => {
  const newItems = [
    'cypress automation 1',
    'cypress automation 2',
    'cypress automation 3',
  ];
  it('add items and verification', () => {
    cy.visit('/');
    cy.contains('Active').should('not.be.visible');
    cy.contains('All').should('not.be.visible');
    cy.contains('Completed').should('not.be.visible');
    newItems.forEach((item) => cy.get('.new-todo').type(`${item}{enter}`));
    cy.get(`.todo-list li`).should('have.length', 3);
    for (let i = 0; i < newItems.length; i++) {
      cy.get(`.todo-list li`)
        .eq(i)
        .should('contain.text', newItems[i]);
    }
    cy.get('.todo-count').should('contain.text', '3 items left');
    cy.contains('Active').should('be.visible');
    cy.contains('All').should('be.visible');
    cy.contains('Completed').should('be.visible');
  });

  it('complete one item', () => {
    cy.contains(newItems[0])
      .parent()
      .find('input')
      .check();
    cy.contains(newItems[0])
      .parents('li')
      .should('have.class', 'completed');
    // cy.get('.completed label').should(
    //   'have.css',
    //   'text-decoration',
    //   'line-through rgb(217, 217, 217)'
    // );
    // cy.get('.completed label').should('have.css', 'color', 'rgb(217,217,217)');
  });

  it('count Active items', () => {
    cy.contains('Active').click();
    cy.get(`.todo-list li`).should('have.length', 2);
    cy.contains(newItems[0]).should('not.exist');
  });

  it('count Completed items', () => {
    cy.contains('Completed').click();
    cy.get(`.todo-list li`).should('have.length', 1);
    cy.get('.todo-list li')
      .first()
      .should('contain.text', newItems[0]);
  });

  it('clear completed items and verify', () => {
    cy.contains('Clear completed').click();
    cy.contains(newItems[0]).should('not.exist');
  });

  it('count All items', () => {
    cy.contains('All').click();
    cy.get(`.todo-list li`).should('have.length', 2);
    cy.get('.todo-count').should('contain.text', '2 items left');
  });

  it('count All items', () => {
    cy.get('.destroy')
      .eq(0)
      .invoke('show')
      .click();
    cy.get(`.todo-list li`).should('have.length', 1);
    cy.get(`.todo-list li`).should('contain.text', newItems[2]);
    cy.contains(newItems[0]).should('not.exist');
    cy.contains(newItems[0]).should('not.exist');
    cy.get('.todo-count').should('contain.text', '1 item left');
  });

  it('remove all', () => {
    cy.get('.destroy')
      .eq(0)
      .invoke('show')
      .click();
    cy.get(`.todo-list li`).should('not.exist');
    cy.get('.todo-count').should('contain.text', '0 items left');
    cy.contains('Active').should('not.be.visible');
    cy.contains('All').should('not.be.visible');
    cy.contains('Completed').should('not.be.visible');
  });

  it('verify screenshot', () => {
    cy.get('.new-todo').toMatchImageSnapshot();
  });
});
