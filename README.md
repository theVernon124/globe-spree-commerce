# Globe Spree Commerce Demo - Playwright E2E Tests

This repository contains sample end-to-end (E2E) test suite for the Globe Spree Commerce demo application, built using [Playwright](https://playwright.dev/).

## Description

This project is designed to automate the testing of user flows and functionalities of the Globe Spree Commerce application. It uses the Page Object Model (POM) design pattern to create a scalable and maintainable test framework.

## Getting Started

To get started with this project, you'll need to have [Node.js](https://nodejs.org/) (version 18 or higher) installed on your machine.

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/theVernon124/globe-spree-commerce.git
    cd globe-spree-commerce
    ```

2.  Install the dependencies:

    ```bash
    npm ci
    ```

3.  Install the Playwright browsers:
    ```bash
    npx playwright install --with-deps
    ```

## Running the Tests

To run the entire test suite, use the following command:

```bash
npm test
```

This will run all the tests in headless mode. You can find the test results in the `playwright-report` directory.

## Project Structure

This project follows the Page Object Model (POM) design pattern to keep the test code clean, maintainable, and reusable.

- `tests/e2e/`: This directory contains the actual test files (specs). Each file corresponds to a specific feature or user flow.
- `pages/`: This directory contains the page objects. Each file represents a page in the application and contains the locators and methods for interacting with that page.
- `utils/`: This directory contains helper functions and utilities that can be used across the test suite.
- `playwright.config.ts`: This is the main configuration file for Playwright, where you can configure browsers, reporters, and other settings.

## CI/CD

This project uses [GitHub Actions](.github/workflows/playwright.yml) for continuous integration. The tests are automatically run on every push and pull request to the `main` branch. The test reports are uploaded as artifacts, which can be downloaded and viewed from the GitHub Actions run page.

## Ideas for Improvement

Here are some ideas for improvement and useful features that can still be added:

- **Environment Configuration:** Implement a `.env` file to manage environment-specific variables like the base URL, API endpoints, and user credentials. This will make it easier to run the tests against different environments (e.g., development, staging, production).
- **Expanded Test Coverage:**
  - **Cross-Browser Testing:** Add more browsers to the test matrix in `playwright.config.ts` to ensure the application works as expected across different browsers.
  - **Mobile Viewports:** Add tests for mobile viewports to ensure the application is responsive.
  - **Visual Regression Testing:** Integrate a visual regression testing tool like [Percy](https://percy.io/) or [Applitools](https://applitools.com/) to catch visual bugs.
- **Advanced Reporting:** Integrate a more advanced reporting tool like [Allure](https://qameta.io/allure-framework/) to get more detailed and interactive test reports.
- **API Testing:** Add API-level tests to test the application's backend services directly. This can help to catch bugs earlier in the development cycle and provide faster feedback.
- **Component Testing:** Add component-level tests to test individual UI components in isolation. This can help to improve the overall quality of the application and make it easier to refactor the code.
