# learn Playwright

### Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Locator](#locator)

## Installation

```bash
npm init playwright
```

then you have to choose a directory name for testing

## Basic Test

- import test from @playwright/test
- start test `test(name_test, fn)`
- because js is synchronous. add wait for the code to be executed sequentially

```javascript
const { test } = require('@playwright/test')

test('first test', () {
    // test here
})
```

## Configuration

- `testDir` directory for test
- `timeout` maximum time one test can run for
- `expect` maximum time for assertion can run for
- `reporter` report result test
- `use` what browser you want use, get screenshot, logs, etc
  - `browserName` choose the browser you want to use for the test, e.g., WebKit/Safari or Chromium.
  - `headless` by default is false, if true test will running without open browser only in terminal

### how to run single test only

use `only`

```javascript
test.only(name, fn)
```

## Locator

locator ini digunakan untuk menemukan element, kenapa? contohnya ketika ingin mengisi sebuah form yang pertama kali dilakukan adalah mengarahkan cursor ke input baru kemudian bisa mengisi form, jika di automation test sebelum bisa mengisi di input maka element input harus dicari dahulu

### rules
1. if there `id` use `#` e.g., #name or tag#name
2. if there `class` use `.` e.g., .name or tag.name
3. by attributes or property use `[attribute='value']`
4. by traversing e.g., `.wrapper > .items > item`
5. by test use `text=textValue`

### how to type in textfield

use `fill` for latest version cause `type` is deprecated

### How to handle redirect case 

use `waitFor` 

```javascript
await page.locator('h1.title').waitFor()
```
test runner will wait until h1 with class title is defined

