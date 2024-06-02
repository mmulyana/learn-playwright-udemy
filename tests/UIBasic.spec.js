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

test('Control UI', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
  const dropdown = page.locator('select.form-control')
  const documentLink = page.locator("[href*='documents-request']")

  await dropdown.selectOption('consult')
  await page.locator('.radiotextsty').last().click()
  await page.locator('#okayBtn').click()

  console.log(
    '.radio is ' + (await page.locator('.radiotextsty').last().isChecked())
  )

  await expect(page.locator('.radiotextsty').last()).toBeChecked()

  await page.locator('#terms').click()
  await expect(page.locator('#terms')).toBeChecked()

  await page.locator('#terms').uncheck()
  expect(await page.locator('#terms').isChecked()).toBeFalsy()

  await expect(documentLink).toHaveAttribute('class', 'blinkingText')
})

test('handle link that open new page', async ({ browser }) => {
  // create browser
  const context = await browser.newContext()

  // open new page
  const page = await context.newPage()
  const userName = page.locator('#username')
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
  const documentLink = page.locator("[href*='documents-request']")

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    documentLink.click(),
  ])

  // in new page
  const text = await newPage.locator('.red').textContent()
  const arrayText = text.split('@')
  const domain = arrayText[1].split('.')[0]

  // in first page
  await page.locator('#username').fill(domain)
  console.log(await page.locator('#username').textContent())
})
