import { test as baseTest, expect, Page } from "@playwright/test";
import { generateUniqueEmail } from "../utils/helpers";

type MyFixtures = {
  user: {
    email: string;
    password: string;
    page: Page;
  };
};

export const test = baseTest.extend<MyFixtures>({
  user: async ({ page }, use) => {
    const email = generateUniqueEmail("thevernon124@gmail.com");
    const password = "Test123!";

    // Sign Up
    await page.goto("https://demo.spreecommerce.org/");
    await page
      .getByRole("navigation", { name: "Top" })
      .getByRole("button")
      .nth(2)
      .click();
    await page.getByRole("link", { name: "Sign Up" }).click();
    await page
      .getByRole("heading", { name: "Sign Up" })
      .waitFor({ state: "visible" });
    await page.getByRole("textbox", { name: "Email", exact: true }).fill(email);
    await page
      .getByRole("textbox", { name: "Password", exact: true })
      .fill(password);
    await page
      .getByRole("textbox", { name: "Password Confirmation" })
      .fill(password);
    await page.getByRole("button", { name: "Sign Up" }).click();
    await expect(page.getByText("Welcome! You have signed up")).toBeVisible();

    // Log out after sign up to ensure a clean login flow for the test
    await page.locator(".hidden > a").first().click();
    await page.getByRole("button", { name: "Log out" }).click();

    // Login
    await page
      .getByRole("navigation", { name: "Top" })
      .getByRole("button")
      .nth(2)
      .click();
    await page.getByRole("textbox", { name: "Email", exact: true }).fill(email);
    await page.getByRole("textbox", { name: "Password" }).fill(password);
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText("Signed in successfully")).toBeVisible();

    await use({ email, password, page });
  },
});
