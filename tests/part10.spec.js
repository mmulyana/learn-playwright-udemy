const { test, request, expect } = require('@playwright/test')
let token
let orderId

const login = { userEmail: 'anshika@gmail.com', userPassword: 'Iamking@000' }
const order = {
  orders: [
    {
      country: 'Indonesia',
      productOrderedId: '6581ca399fd99c85e8ee7f45',
    },
  ],
}

// just once
test.beforeAll(async () => {
  // Login
  const apiContext = await request.newContext()
  const res = await apiContext.post(
    'https://rahulshettyacademy.com/api/ecom/auth/login',
    {
      data: login,
    }
  )

  expect(res.ok()).toBeTruthy()

  const resBody = await res.json()
  token = resBody.token

  // Order
  const orderResponse = await apiContext.post(
    'https://rahulshettyacademy.com/api/ecom/order/create-order',
    {
      data: order,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }
  )

  const orderResponseJson = await orderResponse.json()
  console.log(orderResponseJson)
  orderId = orderResponseJson.orders[0]
})

// run every test
test.beforeEach(async ({ page }) => {})

test('client app login', async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem('token', value)
  }, token)

  await page.goto('https://rahulshettyacademy.com/client')
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
  await page.pause()
  expect(orderId.includes(orderIdDetails)).toBeTruthy()
})
