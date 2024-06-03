const { test, expect } = require('@playwright/test')

test('popup validation', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
  // await page.goto('https://google.com')
  // await page.goBack()
  // await page.goForward()

  await expect(page.locator('#displayed-text')).toBeVisible()
  await page.locator('#hide-textbox').click()
  await expect(page.locator('#displayed-text')).toBeHidden()

  // handle dialog
  page.on('dialog', (dialog) => dialog.accept())
  await page.locator('#confirmbtn').click()
  await page.locator('#mousehover').hover()

  // handle frame
  const framePage = page.frameLocator('#courses-iframe')
  await framePage.locator("li a[href*='lifetime-access']:visible").click()
  const textCheck = await framePage.locator('.text h2').textContent()
  console.log(textCheck)
})
