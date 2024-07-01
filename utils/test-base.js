const base = require('@playwright/test')

const { email, password, productName } = JSON.parse(
  JSON.stringify(require('../utils/placeorder-test.json'))
)

exports.customtest = base.test.extend({
  data: {
    email,
    password,
    productName,
  },
})
