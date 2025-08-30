import { Page, Locator } from "@playwright/test";

export class SignUpPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly passwordConfirmationInput: Locator;
  readonly signUpButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: "Sign Up" });
    this.emailInput = page.getByRole("textbox", { name: "Email", exact: true });
    this.passwordInput = page.getByRole("textbox", {
      name: "Password",
      exact: true,
    });
    this.passwordConfirmationInput = page.getByRole("textbox", {
      name: "Password Confirmation",
    });
    this.signUpButton = page.getByRole("button", { name: "Sign Up" });
  }

  async waitForSignUpForm() {
    await this.heading.waitFor({ state: "visible" });
  }

  async signUp(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.passwordConfirmationInput.fill(password);
    await this.signUpButton.click();
  }
}
