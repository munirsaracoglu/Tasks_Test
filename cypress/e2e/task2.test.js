describe('List creation', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3030/')
  })
  afterEach(() => {
    cy.get('[type="button"]:nth-child(3)').click()
  })
  it('Users can have multiple Lists', () => {
    const toDoLists = ['Playwright', 'Cypress', 'Watir', 'Capybara'];
    toDoLists.forEach(list => {
      cy.get("[placeholder = 'New test list']").type(list);
      cy.get("button.btn-outline-secondary").click({ multiple: true });
    });
      cy.get("[class='ToDoList']").should('have.length', toDoLists.length);
      toDoLists.forEach(list => {
        cy.contains("[class='ToDoList']", list).should('be.visible');
    })
  });
  it('A List can contain multiple List Items', () => {
    cy.get("[placeholder = 'New test list']").type("Toptal");
    cy.get("button.btn-outline-secondary").click();
    const listItems = ['Team Onboarding', 'Platform Installation', 'Continuing with Modules'];
    listItems.forEach(item => {
      cy.get("input[placeholder='New item']").type(item);
      cy.get("div[class='AddToDoListItem list-group-item'] button[type='button']").click({multiple:true})
    })
      cy.get("label[class='form-check-label']").should('have.length', listItems.length);
      listItems.forEach(item =>{
        cy.contains("label[class='form-check-label']",item).should('be.visible');
      })
  });
});
