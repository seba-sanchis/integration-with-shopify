"use server";

import { getItems } from "./bag.actions";
import { getPrivacy } from "./privacy.actions";
import { getShipping } from "./shipping.actions";

// Environments
const { SHOPIFY_ACCESS_TOKEN, SHOPIFY_STORE_URL } = process.env;

export async function newCheckout() {
  const address = await getShipping();

  const customer = await getPrivacy();

  const lineItems = await getItems();

  if (lineItems.length === 0) {
    throw new Error("Bag is empty!");
  }

  const shippingAddress = {
    address1: address.address1,
    city: address.city,
    province: address.province,
    country: address.country,
    zip: address.zip,
    phone: address.phone,
    firstName: customer.firstName,
    lastName: customer.lastName,
  };

  const email = customer.email;

  try {
    const response = await fetch(
      `${SHOPIFY_STORE_URL}/api/2023-07/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN!,
        },
        body: JSON.stringify({
          query: `
            mutation NewCheckout($input: CheckoutCreateInput!) {
              checkoutCreate(input: $input) {
                checkout {
                  id
                  webUrl
                }
              }
            }
          `,
          variables: {
            input: {
              lineItems,
              shippingAddress,
              email,
            },
          },
        }),
      }
    );

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    return data.data.checkoutCreate.checkout.webUrl;
  } catch (error: any) {
    throw new Error(`Failed to create checkout: ${error.message}`);
  }
}
