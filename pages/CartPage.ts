import { Page, Locator } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly checkoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutLink = page.getByRole("link", { name: "Checkout" });
  }

  async proceedToCheckout() {
    await this.checkoutLink.click();
  }
}
