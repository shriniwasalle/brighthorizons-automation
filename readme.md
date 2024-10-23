# Bright Horizons Test Project Using Playwright

## Table of Contents

- [Getting Started](#getting-started)
- [Directory Structure](#directory-structure)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Reporting](#reporting)

## Getting Started

These instructions will help you set up and run the project on your local machine for development and testing purposes.

### Prerequisites

- Node.js

## Directory Structure

```plaintext
BRIGHTHORIZONS-AUTOMATION/
│
├── allure-report/
├── allure-results/
├── node_modules/
├── src/
│   └── pages/
│       ├── find.center.page.ts
│       ├── home.page.ts
│       └── search.results.page.ts
├── test-results/
├── tests/
│   ├── find-centers.spec.ts
│   ├── helper.ts
│   └── search-functionality.spec.ts
├── .gitignore
├── package-lock.json
├── package.json
├── playwright.config.ts
└── readme.md
```

## Installation

```plaintext
git clone https://github.com/shriniwasalle/brighthorizons-automation.git
```

```plaintext
cd playwright-test
```

```plaintext
npm install
```

## Running Tests

To run all tests, use the following command:

```plaintext
npm run test
```

## Reporting

Allure Reports: After running the tests, you can generate Allure reports using the following command:

```plaintext
npm run test-generate-report
```

Open the Allure report:

```plaintext
npm run test-open-report
```

