const { test, expect } = require('@playwright/test')

test('browser context test', async ({ browser }) => {
  const context = await browser.newContext()
  const page = await context.newPage()
  await page.goto('https://rahulshettyacademy.com/loginpagePractice/')
})

test('Browser context-validating error login', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
  const input = page.locator('#username')
  const btn = page.locator('#signInBtn')
  const cardTitle = page.locator('.card-body a')

  await input.fill('rahulshetty')
  await page.locator("[type='password']").fill('learning')
  await btn.click()

  await expect(page.locator("[style*='block']")).toContainText('Incorrect')

  await input.fill('')
  await input.fill('rahulshettyacademy')
  await btn.click()

  await page.locator('h1.my-4').waitFor()
  expect(page.locator('h1.my-4')).toContainText('Shop')
  const allCard = await cardTitle.allTextContents()
  console.log(allCard)
})
