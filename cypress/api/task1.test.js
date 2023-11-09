describe('ToDo Lists', () => {
  const baseUrl = "http://localhost:3030/"   
  beforeEach(() => {
    cy.visit(`${baseUrl}`)
    cy.get('div#root button[type="button"]:nth-child(3)').click()
  })
  it('retrieves lists', () => {
    cy.request(`${baseUrl}/lists`)
      .then(response => {
        expect(response.status).to.eq(200)
      })
  })
  it('invalid endpoint for get request', () => {
    cy.request({
      url: `${baseUrl}/invalid`, 
      failOnStatusCode: false 
    })
      .then(response => {
        expect(response.status).to.eq(404)
      })
  });
  it('add a list', () => {
    cy.request({
      method: 'POST', 
      url: `${baseUrl}/lists/add`, 
      body: {
        name:"School",
        items:[]
      }
    }).then(response => {
        expect(response.status).to.eq(200)
        expect(response.body.name).to.eq("School")
    })
  });
  it('Delete a List', () => {
    cy.request({
      method: 'POST', 
      url: `${baseUrl}/lists/add`, 
      body: {
        name:"School",
        items:[]
      }
    })
    cy.request('DELETE', `${baseUrl}/lists/0`)
      .then(response => {
        expect(response.status).to.eq(200)
      })
  });
})
