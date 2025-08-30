import { test, expect } from "@playwright/test";

test.describe("Spree Commerce Demo", () => {
  test("should allow user to create an order", async ({ page }) => {
    await page.goto("https://demo.spreecommerce.org/");

    // Click the User button while logged out
    await page
      .getByRole("navigation", { name: "Top" })
      .getByRole("button")
      .nth(2)
      .click();

    // Click the "Sign Up" link
    await page.getByRole("link", { name: "Sign Up" }).click();

    // Wait for the Sign Up form to load
    await page
      .getByRole("heading", { name: "Sign Up" })
      .waitFor({ state: "visible" });

    // Fill out the Sign Up form
    await page
      .getByRole("textbox", { name: "Email", exact: true })
      .fill("thevernon124+15@gmail.com");
    await page
      .getByRole("textbox", { name: "Password", exact: true })
      .fill("Test123!");
    await page
      .getByRole("textbox", { name: "Password Confirmation" })
      .fill("Test123!");
    await page.getByRole("button", { name: "Sign Up" }).click();

    // Assert successful sign up
    await expect(page.getByText("Welcome! You have signed up")).toBeVisible();

    // Click the User button while logged in
    await page.locator(".hidden > a").first().click();

    // Log out
    await page.getByRole("button", { name: "Log out" }).click();

    // Click the User button while logged out
    await page
      .getByRole("navigation", { name: "Top" })
      .getByRole("button")
      .nth(2)
      .click();

    // Login with the newly created account
    await page
      .getByRole("textbox", { name: "Email", exact: true })
      .fill("thevernon124+15@gmail.com");
    await page.getByRole("textbox", { name: "Password" }).fill("Test123!");
    await page.getByRole("button", { name: "Login" }).click();

    // Browse a product
    await page.getByLabel("Top").getByRole("link", { name: "Sale" }).click();

    // Open a product detail page
    await page
      .getByRole("link", { name: "Sale Gold-Framed Glasses $74.99 $" })
      .click();

    // Add the product to the cart
    await page.getByRole("button", { name: "Add To Cart" }).click();
    await expect(
      page.getByRole("link", { name: "Gold-Framed Glasses", exact: true })
    ).toBeVisible();
    await expect(page.locator("#line_item_quantity")).toHaveValue("1");
    await expect(page.locator("#cart_summary")).toContainText("$54.99");

    // Proceed to checkout
    await page.getByRole("link", { name: "Checkout" }).click();

    // Fill out the checkout form
    await page.getByLabel("Country").selectOption({ label: "Philippines" });
    await page
      .getByRole("textbox", { name: "First name" })
      .fill("Vernon Raineil");
    await page.getByRole("textbox", { name: "Last name" }).fill("Cenzon");
    await page
      .getByRole("textbox", { name: "Street and house number" })
      .fill("1-1 Street 1");
    await page.getByRole("textbox", { name: "City" }).fill("Angeles City");
    await page.getByRole("textbox", { name: "Postal Code" }).fill("2009");
    await page.getByRole("button", { name: "Save and Continue" }).click();

    // Select delivery option
    await page.getByRole("radio", { name: "Next Day Delivery in 1-2" }).check();
    await page.getByRole("button", { name: "Save and Continue" }).click();
    await expect(page.getByText("Delivery method Next Day · $")).toBeVisible();
    await expect(page.locator("#checkout")).toContainText("$0.00");

    // Select "Check" payment method
    await page
      .locator("#order_payments_attributes__payment_method_id_24")
      .click();

    // Submit the order
    await page.getByRole("button", { name: "Pay now" }).click();

    // Assert order completion
    await expect(page.getByText(/Order R\d+/)).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Thanks Vernon Raineil for your order!",
      })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Your order is confirmed!" })
    ).toBeVisible();
    await expect(page.getByText("Status Balance Due")).toBeVisible();
    await expect(page.getByText("thevernon124+15@gmail.com")).toBeVisible();
    await expect(
      page
        .getByRole("heading", { name: "Shipping Address" })
        .locator("//following-sibling::p")
        .first()
    ).toContainText(
      "Vernon Raineil Cenzon1-1 Street 1Angeles City,  2009Philippines"
    );
  });
});
