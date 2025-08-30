import { Page, Locator } from "@playwright/test";

export class ProductPage {
  readonly page: Page;
  readonly productLink: Locator;
  readonly addToCartButton: Locator;
  readonly productNameInCart: Locator;
  readonly lineItemQuantity: Locator;
  readonly cartSummary: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productLink = page.getByRole("link", {
      name: "Sale Gold-Framed Glasses $74.99 $",
    });
    this.addToCartButton = page.getByRole("button", { name: "Add To Cart" });
    this.productNameInCart = page.getByRole("link", {
      name: "Gold-Framed Glasses",
      exact: true,
    });
    this.lineItemQuantity = page.locator("#line_item_quantity");
    this.cartSummary = page.locator("#cart_summary");
  }

  async openProductDetails() {
    await this.productLink.click();
  }

  async addToCart() {
    await this.addToCartButton.click();
  }
}
