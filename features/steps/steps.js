const { Given, When, Then } = require('@cucumber/cucumber')
const { POManager } = require('../../pageobjects/po-manager')
const playwright = require('@playwright/test')
const { expect } = require('@playwright/test')

Given(
  'a login to ecommerce application with {string} and {string}',
  { timeout: 100 * 1000 },
  async function (email, password) {
    const browser = await playwright.chromium.launch()
    const context = await browser.newContext()
    const page = await context.newPage()

    this.poManager = new POManager(page)
    const products = page.locator('.card-body')
    const loginPage = this.poManager.getLoginPage()
    await loginPage.goTo()
    await loginPage.validLogin(email, password)
  }
)

When(
  'add {string} to Cart',
  { timeout: 100 * 1000 },
  async function (productName) {
    this.dashboardPage = this.poManager.getDashboardPage()
    await this.dashboardPage.searchProductAddCart(productName)
    await this.dashboardPage.navigateToCart()
  }
)

Then(
  'Verify {string} is displayed in the Cart',
  { timeout: 300 * 1000 },
  async function (productName) {
    this.cartPage = this.poManager.getCartPage()
    await this.cartPage.VerifyProductIsDisplayed(productName)
  }
)

When(
  'Enter valid details and place the order',
  { timeout: 100 * 1000 },
  async function () {
    await this.cartPage.Checkout()

    const reviewPage = this.poManager.getOrdersReviewPage()
    await reviewPage.searchCountryAndSelect('ind', 'Indonesia')
    this.orderId = await reviewPage.SubmitAndGetOrderId()
    console.log(this.orderId)
  }
)

Then(
  'Verify order in present in the orderHistory',
  { timeout: 100 * 1000 },
  async function () {
    await this.dashboardPage.navigateToOrders()
    const historyPage = this.poManager.getOrdersHistoryPage()
    await historyPage.searchOrderAndSelect(this.orderId)
  }
)
