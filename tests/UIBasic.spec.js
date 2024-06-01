const { test, expect } = require('@playwright/test')

test('browser context test', async ({ browser }) => {
  const context = await browser.newContext()
  const page = await context.newPage()
  await page.goto('https://rahulshettyacademy.com/loginpagePractice/')
})

test('page test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractice/')
  expect(await page.title()).toHaveTitle(
    'LoginPage Practise | Rahul Shetty Academy'
  )
})
