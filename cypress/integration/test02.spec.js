/// <reference types="cypress" />
import Todos from '../../pages/todos.page';
import TodosData from '../fixtures/todo.data';
describe('Our first test', () => {
  const todoItem = TodosData.newItems[0]; // to be completed
  it('add items and verification', () => {
    cy.openTodoPage();
    Todos.verifyNoLinksVisible();

    //1. How to add items - 1
    // Todos.allItems = [...TodosData.newItems];
    // Todos.addNewItems();

    //2. How to add items - 2
    Todos.addTheseItemsAndVerify.apply(Todos, TodosData.newItems);

    //3. How to add items - 3
    // TodosData.newItems.forEach((item) => {
    //   Todos.allItemsCount++;
    //   Todos.allItems.push(item);
    //   Todos.activeItemsCount++;
    //   Todos.activeItems.push(item);
    //   Todos.addNewItemAndVerify(item);
    // });

    Todos.verifyLinksVisible();
    Todos.verifyActiveItems();
  });

  it('complete an item', () => {
    Todos.completeAndVerifyItem(todoItem);
    Todos.activeItemsCount--;
    Todos.completedItemsCount++;
    Todos.completedItems.push(todoItem);
  });

  it('count Active items', () => {
    Todos.verifyCountOfActiveItems();
    Todos.verifyActiveItems();
  });

  it('count Completed items', () => {
    Todos.verifyCountOfCompletedItems();
    Todos.verifyCompletedItems();
  });

  it('clear completed items and verify', () => {
    Todos.clearCompletedItems();
    Todos.verifyClearedItemsNotPresent();
  });
});
