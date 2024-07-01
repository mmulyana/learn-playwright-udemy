const { test, expect } = require('@playwright/test')
const { writeExcel } = require('../utils/excel/demo')
const { writeExcelTest } = require('../utils/excel/tes')

let url = 'https://rahulshettyacademy.com/upload-download-test/index.html'
let path = '/Users/iMuly/Downloads/download.xlsx'

test('Upload download excel validation', async ({ page }) => {
  await page.goto(url)

  const downloadEvent = page.waitForEvent('download')

  // download excel
  await page.getByRole('button', { name: 'Download' }).click()

  await downloadEvent

  writeExcelTest('Papaya', '999', { rowChange: 0, colChange: 2 }, path)

  await page.locator('#fileinput').click()
  await page.locator('#fileinput').setInputFiles(path)

  const textLocator = page.getByText('Papaya')
  const desiredRow = await page.getByRole('row').filter({ has: textLocator })
  await expect(desiredRow.locator('#cell-4-undefined')).toContainText('999')

})
