class Todos {
  allItemsCount = 0;
  completedItemsCount = 0;
  activeItemsCount = 0;
  allItems = [];
  activeItems = [];
  completedItems = [];
  clearedItems = [];
  navitageTo() {
    cy.visit('/');
  }
  addNewItemAndVerify(item) {
    cy.get('.new-todo').type(`${item}{enter}`);
    this.verifyCount();
  }

  addTheseItemsAndVerify(...items) {
    items.forEach((item) => {
      cy.get('.new-todo').type(`${item}{enter}`);
      this.allItemsCount++;
      this.allItems.push(item);
      this.activeItemsCount++;
      this.activeItems.push(item);
      this.verifyCount();
    });
  }

  addNewItemsAndVerify() {
    this.allItems.forEach((item) => {
      cy.get('.new-todo').type(`${item}{enter}`);
      this.allItemsCount++;
      this.activeItemsCount++;
      this.activeItems.push(item);
      this.verifyCount();
    });
  }

  verifyCount() {
    cy.get(`.todo-list li`).should('have.length', this.allItemsCount);
    if (this.allItemsCount > 1) {
      cy.get('.todo-count').should(
        'contain.text',
        `${this.allItemsCount} items left`
      );
    } else {
      cy.get('.todo-count').should('contain.text', '1 item left');
    }
  }

  completeAndVerifyItem(item) {
    cy.contains(item)
      .parent()
      .find('input')
      .check();
    const index = this.activeItems.indexOf(item);
    if (index > -1) {
      this.activeItems.splice(index, 1);
    }
    cy.contains(item)
      .parents('li')
      .should('have.class', 'completed');
  }

  removeItem() {
    cy.get('.destroy')
      .eq(0)
      .invoke('show')
      .click();
  }

  clearCompletedItems() {
    cy.contains('Clear completed').click();
    this.completedItems.forEach((item) => {
      this.allItemsCount--;
      this.clearedItems.push(item);
      const index = this.completedItems.indexOf(item);
      this.completedItems.splice(index, 1);
    });
  }

  verifyClearedItemsNotPresent() {
    this.clearedItems.forEach((item) => {
      cy.contains(item).should('not.exist');
    });
  }

  verifyNoLinksVisible() {
    cy.contains('Active').should('not.be.visible');
    cy.contains('All').should('not.be.visible');
    cy.contains('Completed').should('not.be.visible');
  }

  verifyLinksVisible() {
    cy.contains('Active').should('be.visible');
    cy.contains('All').should('be.visible');
    cy.contains('Completed').should('be.visible');
  }

  verifyCountOfActiveItems() {
    cy.contains('Active').click();
    cy.get(`.todo-list li`).should('have.length', this.activeItemsCount);
  }

  verifyCountOfCompletedItems() {
    cy.contains('Completed').click();
    cy.get(`.todo-list li`).should('have.length', this.completedItemsCount);
  }

  verifyActiveItems() {
    for (let i = 0; i < this.activeItems.length; i++) {
      cy.get(`.todo-list li`)
        .eq(i)
        .should('contain.text', this.activeItems[i]);
    }
    this.completedItems.forEach((completedItem) => {
      cy.contains(completedItem).should('not.exist');
    });
  }

  verifyCompletedItems() {
    for (let i = 0; i < this.completedItems.length; i++) {
      cy.get(`.todo-list li`)
        .eq(i)
        .should('contain.text', this.completedItems[i]);
    }
  }
}

export default new Todos();
