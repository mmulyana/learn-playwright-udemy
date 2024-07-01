const { test, expect, request } = require('@playwright/test')
const { APiUtils } = require('../utils/api-utils')

const loginPayLoad = {
  userEmail: 'mulyan.t20s@gmail.com',
  userPassword: 'passworD1@',
}
const orderPayLoad = {
  orders: [
    { country: 'Indonesia', productOrderedId: '6581ca399fd99c85e8ee7f45' },
  ],
}
const fakePayLoadOrders = {
  data: [
    {
      country: 'Indonesia',
      orderBy: 'mulyan.t20s@gmail.com',
      orderById: '665c7e45ae2afd4c0bee9047',
      orderDate: null,
      orderPrice: '31500',
      productDescription: 'Zara coat for Women and girls',
      productImage:
        'https://rahulshettyacademy.com/api/ecom/uploads/productImage_1650649434146.jpeg',
      productName: 'ZARA COAT 3',
      productOrderedId: 'Sun Jun 23',
      __v: 0,
      _id: '66782b0cae2afd4c0b09188e',
    },
    {
      country: 'Indonesia',
      orderBy: 'mulyan.t20s@gmail.com',
      orderById: '665c7e45ae2afd4c0bee9047',
      orderDate: null,
      orderPrice: '31500',
      productDescription: 'Zara  girls',
      productImage:
        'https://rahulshettyacademy.com/api/ecom/uploads/productImage_1650649434146.jpeg',
      productName: 'ZARA COAT 44',
      productOrderedId: 'Sun Jun 23',
      __v: 0,
      _id: '66782b0cae2afd4c0b09188e',
    },
  ],
  message: 'Orders fetched for customer Successfully',
}

let response
test.beforeAll(async () => {
  const apiContext = await request.newContext()
  const apiUtils = new APiUtils(apiContext, loginPayLoad)
  response = await apiUtils.createOrder(orderPayLoad)
})

//create order is success
test('Place the order', async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem('token', value)
  }, response.token)
  await page.goto('https://rahulshettyacademy.com/client')

  await page.route(
    'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
    async (route) => {
      const response = await page.request.fetch(route.request())
      let body = JSON.stringify(fakePayLoadOrders)
      route.fulfill({
        response,
        body,
      })
    }
  )

  await page.locator("button[routerlink*='myorders']").click()
  await page.waitForResponse(
    'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*'
  )

  console.log(await page.locator('.mt-4').textContent())
})
