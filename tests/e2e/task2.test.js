import {test, expect} from '@playwright/test'

test.describe("TodoList homepage verifications", () => {
  test.beforeEach(async ({page}) => {
    await page.goto("http://localhost:3030/")
  })

  test("A List can be added by using Add button in the List header", async ({page}) => {
    await page.fill(".form-control", "School")
    await page.click("text=Add")
    const addedNewList = await page.locator("text=School")
    await expect(addedNewList).toHaveText("School")
  })

  test("A List Item can be added to a List with a simple form", async ({page}) => {
    await page.fill("(//input[@class = 'form-control'])[2]", "Exams")
    await page.locator(".btn-outline-secondary").last().click()
    const schoolItemExams = await page.locator("text=Exams")
    await expect(schoolItemExams).toHaveText("Exams")
  })
})
