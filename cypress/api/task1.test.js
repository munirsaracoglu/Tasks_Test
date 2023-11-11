describe('ToDo Lists', () => {
  const baseUrl = "http://localhost:3030/"
  const list = { name: 'School', items: [] }

  beforeEach(() => {
    cy.request('POST', `${baseUrl}/overwrite_database`, [])
  })
  it('retrieves lists', () => {
    cy.request(`${baseUrl}/lists`)
      .then(response => {
        expect(response.status).to.eq(200)
      })
  })
  it('invalid endpoint for get request', () => {
    cy.request({url: `${baseUrl}/invalid`,failOnStatusCode: false})
      .then(response => {
        expect(response.status).to.eq(404)
      })
  });
  it('add a list', () => {
    cy.request('POST', `${baseUrl}/lists/add`, list)
      .then(response => {
        expect(response.status).to.eq(200)
        expect(response.body.name).to.eq(list.name)
      })
  });
  it('Delete a List', () => {
    cy.request('POST', `${baseUrl}/lists/add`, list)
    cy.request('DELETE', `${baseUrl}/lists/0`)
      .then(response => {
        expect(response.status).to.eq(200)
      })
  });
})
