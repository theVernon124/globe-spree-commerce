import { Page, Locator } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly countrySelect: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly postalCodeInput: Locator;
  readonly saveAndContinueButton: Locator;
  readonly nextDayDeliveryRadio: Locator;
  readonly checkPaymentMethodRadio: Locator;
  readonly payNowButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.countrySelect = page.getByLabel("Country");
    this.firstNameInput = page.getByRole("textbox", { name: "First name" });
    this.lastNameInput = page.getByRole("textbox", { name: "Last name" });
    this.addressInput = page.getByRole("textbox", {
      name: "Street and house number",
    });
    this.cityInput = page.getByRole("textbox", { name: "City" });
    this.postalCodeInput = page.getByRole("textbox", { name: "Postal Code" });
    this.saveAndContinueButton = page.getByRole("button", {
      name: "Save and Continue",
    });
    this.nextDayDeliveryRadio = page.getByRole("radio", {
      name: "Next Day Delivery in 1-2",
    });
    this.checkPaymentMethodRadio = page.locator(
      "#order_payments_attributes__payment_method_id_24"
    );
    this.payNowButton = page.getByRole("button", { name: "Pay now" });
  }

  async fillAddressDetails(details: {
    country: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
  }) {
    await this.countrySelect.selectOption({ label: details.country });
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.addressInput.fill(details.address);
    await this.cityInput.fill(details.city);
    await this.postalCodeInput.fill(details.postalCode);
    await this.saveAndContinueButton.click();
  }

  async selectDeliveryOption() {
    await this.nextDayDeliveryRadio.check();
    await this.saveAndContinueButton.click();
  }

  async selectPaymentMethodAndPay() {
    await this.checkPaymentMethodRadio.click();
    await this.payNowButton.click();
  }
}
