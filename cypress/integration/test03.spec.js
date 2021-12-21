/// <reference types="cypress" />
import Todos from '../../pages/todos.page';
import TodosData from '../fixtures/todo.data';

const runOn = (browser, fn) => {
  if (Cypress.isBrowser(browser)) {
    fn();
  }
};
const ignoreOn = (browser, fn) => {
  if (!Cypress.isBrowser(browser)) {
    fn();
  }
};

describe('ignore/run on ...', () => {
  const todoItem = TodosData.newItems[0];
  beforeEach(() => {
    cy.openTodoPage();
    Todos.verifyNoLinksVisible();
    Todos.addTheseItemsAndVerify.apply(Todos, TodosData.newItems);
  });
  ignoreOn('firefox', () => {
    it('ignore this run on firefox', () => {
      Todos.verifyLinksVisible();
      Todos.verifyActiveItems();
    });
  });
  ignoreOn('chrome', () => {
    it('ignore this run on chrome', () => {
      Todos.completeAndVerifyItem(todoItem);
      Todos.activeItemsCount--;
      Todos.completedItemsCount++;
      Todos.completedItems.push(todoItem);
      Todos.verifyCountOfActiveItems();
      Todos.verifyActiveItems();
      Todos.verifyCountOfCompletedItems();
      Todos.verifyCompletedItems();
    });
  });
});
