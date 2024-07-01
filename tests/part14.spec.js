const { test, expect } = require('@playwright/test')

const user = {
  email: 'mulyan.t20s@gmail.com',
  password: 'passworD1@',
}

const url = {
  login: 'https://rahulshettyacademy.com/client',
  dash: 'https://rahulshettyacademy.com/client/dashboard/dash',
}

test('client app login', async ({ page }) => {
  const productName = 'ZARA COAT 3'
  const products = page.locator('.card-body')

  await page.goto(url.login)
  await page.locator('#userEmail').fill(user.email)
  await page.locator('#userPassword').fill(user.password)
  await page.locator('#login').click()

  //   await page.locator('div#sidebar > p').waitFor()

  await expect(page).toHaveURL(url.dash)

  const titles = await page.locator('.card-body b').allTextContents()
  console.log(titles)

  const totalProducts = await products.count()
  for (let i = 0; i < totalProducts; i++) {
    if ((await products.nth(i).locator('b').textContent()) === productName) {
      await products.nth(i).locator('text=Add To Cart').click()
      break
    }
  }

  // open cart page
  await page.locator("[routerlink*='cart']").click()
  await page.locator('div li').first().waitFor()

  const item = await page.locator(`h3:has-text('${productName}')`).isVisible()
  expect(item).toBeTruthy()

  await page.locator('text=Checkout').click()

  await page
    .locator("[placeholder*='Country']")
    .pressSequentially('ind', { delay: 100 })

  const dropdown = page.locator('.ta-results')
  await dropdown.waitFor()

  const totalOption = await dropdown.locator('button').count()
  for (let i = 0; i < totalOption; i++) {
    const text = await dropdown.locator('button').nth(i).textContent()
    if (text.trim() === 'Indonesia') {
      await dropdown.locator('button').nth(i).click()
      break
    }
  }

  expect(page.locator(".user__name [type='text']").first()).toHaveText(
    user.email
  )

  // click place order
  await page.locator('.action__submit').click()
  expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ')

  const orderId = await page
    .locator('.em-spacer-1 .ng-star-inserted')
    .textContent()
  console.log(orderId)

  await page.locator("button[routerlink*='myorders']").click()
  await page.locator('tbody').waitFor()
  const rows = await page.locator('tbody tr')

  for (let i = 0; i < (await rows.count()); ++i) {
    const rowOrderId = await rows.nth(i).locator('th').textContent()
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator('button').first().click()
      break
    }
  }
  const orderIdDetails = await page.locator('.col-text').textContent()
  expect(orderId.includes(orderIdDetails)).toBeTruthy()

  for (let i = 0; i < (await rows.count()); ++i) {
    const rowOrderId = await rows.nth(i).locator('th').textContent()
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator('button').last().click()
      break
    }
  }
})
