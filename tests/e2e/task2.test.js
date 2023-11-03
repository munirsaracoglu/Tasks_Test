import {test, expect} from '@playwright/test'

test.describe("TodoList homepage verifications", () => {

  test.beforeEach(async ({page}) => {
    await page.goto("http://localhost:3030/")
  })

  test("A List can be removed using an X button in the List header", async ({page}) => {

    await page.locator(".btn-sm").last().click()
    const toptalList = await page.locator("text=Toptal")
    await expect(toptalList).not.toBeVisible()
  })

  test("A List Item can be added to a List with a simple form (one per List), consisting of an input field for a label, and an Add button", async ({page}) => {

    await page.fill("(//input[@class = 'form-control'])[4]", "Exams")
    await page.locator(".btn-outline-secondary").last().click()
    const schoolItemExams = await page.locator("text=Exams")
    await expect(schoolItemExams).toHaveText("Exams")
  })
})
