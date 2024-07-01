const { test, expect } = require('@playwright/test')

const { POManager } = require('../pageobjects/po-manager')
const { customtest } = require('../utils/test-base')

const data = JSON.parse(
  JSON.stringify(require('../utils/placeorder-test.json'))
)

test('Web client app login', async ({ page }) => {
  const poManager = new POManager(page)

  const loginPage = poManager.getLoginPage()
  await loginPage.goTo()
  await loginPage.validLogin(data.email, data.password)

  const dashboardPage = poManager.getDashboardPage()
  await dashboardPage.searchProductAddCart(data.productName)
  await dashboardPage.navigateToCart()

  const cartPage = poManager.getCartPage()
  await cartPage.VerifyProductIsDisplayed(data.productName)
  await cartPage.Checkout()

  const reviewPage = poManager.getOrdersReviewPage()
  await reviewPage.searchCountryAndSelect('ind', 'Indonesia')
  const orderId = await reviewPage.SubmitAndGetOrderId()

  console.log('orderId', orderId)

  await dashboardPage.navigateToOrders()
  const historyPage = poManager.getOrdersHistoryPage()
  await historyPage.searchOrderAndSelect(orderId)

  expect(orderId.includes(await historyPage.getOrderId())).toBeTruthy()
})

customtest.only('Client app login custom', async ({ page, data }) => {
  const { email, password, productName } = data
  const poManager = new POManager(page)
  const products = page.locator('.card-body')
  const loginPage = poManager.getLoginPage()
  await loginPage.goTo()
  await loginPage.validLogin(email, password)

  const dashboardPage = poManager.getDashboardPage()
  await dashboardPage.searchProductAddCart(productName)
  await dashboardPage.navigateToCart()

  const cartPage = poManager.getCartPage()
  await cartPage.VerifyProductIsDisplayed(productName)
  await cartPage.Checkout()
})
