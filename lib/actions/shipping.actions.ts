"use server";

import { Shipping } from "@/types";
import { cookies } from "next/headers";

// Environments
const { SHOPIFY_ACCESS_TOKEN, SHOPIFY_STORE_URL } = process.env;

// Create shipping
export async function addShipping(account: Shipping) {
  const accessToken = cookies().get("accessToken")?.value;

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
              mutation addShipping {
                customerAddressCreate(
                  customerAccessToken: "${accessToken}",
                  address: {
                    address1: "${account.address1}",
                    city: "${account.city}",
                    province: "${account.province}",
                    country: "${account.country}",
                    zip: "${account.zip}",
                    phone: "${account.phone}",
                  }
                ) {
                  customerAddress {
                    id
                  }
                  userErrors {
                    field
                    message
                  }
                }
              }
            `,
        }),
      }
    );

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    return data.data.customerAddressCreate.customerAddress;
  } catch (error: any) {
    throw new Error(`Failed to add address: ${error.message}`);
  }
}

// Read shipping
export async function getShipping() {
  try {
    const accessToken = cookies().get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Access token not found.");
    }

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
              query getShipping {
                customer(customerAccessToken: "${accessToken}") {
                  addresses(first: 1) {
                    edges {
                      node {
                        id
                        address1
                        city
                        province
                        country
                        zip
                        phone
                      }
                    }
                  }
                }
              }
            `,
        }),
      }
    );

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    return data.data.customer.addresses.edges[0]?.node;
  } catch (error: any) {
    throw new Error(`Failed to fetch address: ${error.message}`);
  }
}

// Update shipping
export async function editShipping(account: Shipping) {
  const accessToken = cookies().get("accessToken")?.value;

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
              mutation editShipping {
                customerAddressUpdate(
                  customerAccessToken: "${accessToken}",
                  id: "${account.id}",
                  address: {
                    address1: "${account.address1}",
                    city: "${account.city}",
                    province: "${account.province}",
                    country: "${account.country}",
                    zip: "${account.zip}",
                    phone: "${account.phone}",
                  }
                ) {
                  customerAddress {
                    id
                  }
                  userErrors {
                    field
                    message
                  }
                }
              }
            `,
        }),
      }
    );

    const data = await response.json();

    if (data.data.customerAddressUpdate.userErrors[0]) {
      throw new Error(data.data.customerAddressUpdate.userErrors[0].message);
    }

    return data.data.customerAddressUpdate.customerAddress;
  } catch (error: any) {
    throw new Error(`Failed to update address: ${error.message}`);
  }
}
