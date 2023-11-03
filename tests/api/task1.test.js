import {test, expect} from '@playwright/test';

test.describe("API testing", () => {

  const baseUrl = "http://localhost:3030/"

  test("Get all Lists with their List Items", async ({request}) => {

    const response = await request.get(`${baseUrl}/lists`)
    expect(response.status()).toBe(200)

    const responseBody = JSON.parse(await response.text())
    console.log(responseBody)
  })

  test("Assert Invalid Endpoint for GET request", async ({request}) => {

    const response = await request.get(`${baseUrl}/invalidendpoint`)
    expect(response.status()).toBe(404)
  })

  test("Add a List with POST request", async ({request}) => {

    const response = await request.post(`${baseUrl}/lists/add`, {
      data: {
        name: "Toptal"
      },
    })

      const responseBody = JSON.parse(await response.text())
    // console.log(responseBody)
      expect(responseBody.name).toBe("Toptal")
      expect(responseBody.items).toBeTruthy()
  })

    test("Delete a List", async ({request}) => {

      const response = await request.delete(`${baseUrl}/lists/4`)
      expect(response.status()).not.toBe(404) 
    })


})
