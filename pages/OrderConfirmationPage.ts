import { Page, Locator, expect } from "@playwright/test";

export class OrderConfirmationPage {
  readonly page: Page;
  readonly orderNumberText: Locator;
  readonly orderConfirmedHeading: Locator;
  readonly statusBalanceDueText: Locator;
  readonly shippingAddress: Locator;

  constructor(page: Page) {
    this.page = page;
    this.orderNumberText = page.getByText(/Order R\d+/);
    this.orderConfirmedHeading = page.getByRole("heading", {
      name: "Your order is confirmed!",
    });
    this.statusBalanceDueText = page.getByText("Status Balance Due");
    this.shippingAddress = page
      .getByRole("heading", { name: "Shipping Address" })
      .locator("//following-sibling::p")
      .first();
  }

  async verifyOrderConfirmation(
    email: string,
    firstName: string,
    lastName: string,
    address: string,
    city: string,
    postalCode: string,
    country: string
  ) {
    await expect(this.orderNumberText).toBeVisible();
    await expect(
      this.page.getByRole("heading", {
        name: `Thanks ${firstName} for your order!`,
      })
    ).toBeVisible();
    await expect(this.orderConfirmedHeading).toBeVisible();
    await expect(this.statusBalanceDueText).toBeVisible();
    await expect(this.page.getByText(email)).toBeVisible();
    await expect(this.shippingAddress).toContainText(
      `${firstName} ${lastName}${address}${city},  ${postalCode}${country}`
    );
  }
}
