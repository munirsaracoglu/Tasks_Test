import {test, expect} from '@playwright/test';

test.describe("API testing", () => {
  const baseUrl = "http://localhost:3030/"
  test.beforeEach(async ({request}) => {
    await request.post(`${baseUrl}/overwrite_database`, {data: '[]'})
  })
  
  test("Add a List with POST request", async ({request}) => {
    const listName = "Toptal"
    const response = await request.post(`${baseUrl}/lists/add`, {
      data: {
        name: listName
      },
    })
      const responseBody = JSON.parse(await response.text())
      expect(responseBody.name).toBe(listName)
      expect(responseBody.items).toBeTruthy()
  }) 
  
  test("Get all Lists with their List Items", async ({request}) => {
    const response = await request.get(`${baseUrl}/lists`)
    expect(response.status()).toBe(200)
    const responseBody = JSON.parse(await response.text())
    expect(responseBody).toBeTruthy()
  })
  
  test("Assert Invalid Endpoint for GET request", async ({request}) => {
    const response = await request.get(`${baseUrl}/invalidendpoint`)
    expect(response.status()).toBe(404)
  })
  
  test("Delete a List", async ({request}) => {
    const listName = "Toptal"
    let response = await request.post(`${baseUrl}/lists/add`, {
      data: {
        name: listName
      },
    })
    response = await request.delete(`${baseUrl}/lists/0`)
    expect(response.status()).not.toBe(404) 
    })
})
