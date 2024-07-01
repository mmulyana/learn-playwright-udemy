const ExcelJs = require('exceljs')

export async function writeExcel(search, replace, path) {
  let row = -1
  let col = -1

  const workbook = new ExcelJs.Workbook()
  await workbook.xlsx.readFile(path)
  const worksheet = workbook.getWorksheet('Sheet1')

  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, cellNumber) => {
      if (cell.value === search) {
        row = rowNumber
        col = cellNumber
      }
    })
  })

  const cell = worksheet.getCell(row, col)
  cell.value = replace
  await workbook.xlsx.writeFile(path)
}
