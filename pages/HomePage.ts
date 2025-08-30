import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly userMenuButton: Locator;
  readonly signUpLink: Locator;
  readonly loginLink: Locator;
  readonly logoutButton: Locator;
  readonly saleLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userMenuButton = page
      .getByRole("navigation", { name: "Top" })
      .getByRole("button")
      .nth(2);
    this.signUpLink = page.getByRole("link", { name: "Sign Up" });
    this.loginLink = page.getByRole("link", { name: "Login" });
    this.logoutButton = page.getByRole("button", { name: "Log out" });
    this.saleLink = page.getByLabel("Top").getByRole("link", { name: "Sale" });
  }

  async goto() {
    await this.page.goto("https://demo.spreecommerce.org/");
  }

  async clickUserMenu() {
    await this.userMenuButton.click();
  }

  async clickSignUpLink() {
    await this.signUpLink.click();
  }

  async clickLoginLink() {
    await this.loginLink.click();
  }

  async clickLogout() {
    await this.logoutButton.click();
  }

  async navigateToSalePage() {
    await this.saleLink.click();
  }
}
