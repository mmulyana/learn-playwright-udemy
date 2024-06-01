# learn Plywright

### Table of Contents

1. [Installation](#installation)
1. [Configuration](#configuration)

## Installation

```bash
npm init plywright
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
