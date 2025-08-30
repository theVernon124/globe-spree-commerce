import { expect } from "@playwright/test";
import { test } from "../../fixtures/auth";
import { HomePage } from "../../pages/HomePage";
import { ProductPage } from "../../pages/ProductPage";
import { CartPage } from "../../pages/CartPage";
import { CheckoutPage } from "../../pages/CheckoutPage";
import { OrderConfirmationPage } from "../../pages/OrderConfirmationPage";

test.describe("Spree Commerce Demo - Order Creation", () => {
  test("should allow user to create an order", async ({ page, user }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const orderConfirmationPage = new OrderConfirmationPage(page);

    const shippingDetails = {
      country: "Philippines",
      firstName: "Vernon Raineil",
      lastName: "Cenzon",
      address: "1-1 Street 1",
      city: "Angeles City",
      postalCode: "2009",
    };

    await homePage.goto();

    // Browse a product
    await homePage.navigateToSalePage();
    await productPage.openProductDetails();

    // Add the product to the cart
    await productPage.addToCart();
    await expect(productPage.productNameInCart).toBeVisible();
    await expect(productPage.lineItemQuantity).toHaveValue("1");
    await expect(productPage.cartSummary).toContainText("$54.99");

    // Proceed to checkout
    await cartPage.proceedToCheckout();

    // Fill out the checkout form
    await checkoutPage.fillAddressDetails(shippingDetails);

    // Select delivery option
    await checkoutPage.selectDeliveryOption();
    await expect(page.getByText("Delivery method Next Day · $")).toBeVisible();
    await expect(page.locator("#checkout")).toContainText("$0.00");

    // Select "Check" payment method and submit the order
    await checkoutPage.selectPaymentMethodAndPay();

    // Assert order completion
    await orderConfirmationPage.verifyOrderConfirmation(
      user.email,
      shippingDetails.firstName,
      shippingDetails.lastName,
      shippingDetails.address,
      shippingDetails.city,
      shippingDetails.postalCode,
      shippingDetails.country
    );
  });
});
