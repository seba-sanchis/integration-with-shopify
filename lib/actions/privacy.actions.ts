"use server";

import { Privacy } from "@/types";
import { cookies } from "next/headers";

// Environments
const { SHOPIFY_ACCESS_TOKEN, SHOPIFY_STORE_URL } = process.env;

// Create Privacy
export async function newPrivacy(account: Privacy) {
  const { firstName, lastName, email, password } = account;

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
          mutation newPrivacy {
            customerCreate(input: {
              email: "${email}",
              password: "${password}",
              firstName: "${firstName}",
              lastName: "${lastName}"
            }) {
              customer {
                id
                email
              }
              userErrors {
                field
                message
              }
            }
          }`,
        }),
      }
    );

    const data = await response.json();

    return data.data.customerCreate.customer;
  } catch (error: any) {
    throw new Error(`Failed to fetch all posts: ${error.message}`);
  }
}

// Read Privacy
export async function getPrivacy() {
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
          "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN!, // Replace with your Shopify storefront access token
        },
        body: JSON.stringify({
          query: `
          query getPrivacy {
            customer(customerAccessToken: "${accessToken}") {
              id
              email
              firstName
              lastName
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

    return data.data.customer;
  } catch (error: any) {
    throw new Error(`Failed to fetch customer: ${error.message}`);
  }
}

// Update privacy
export async function editPrivacy(account: Privacy) {
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
            mutation editCustomerInformation {
              customerUpdate(
                customerAccessToken: "${accessToken}",
                customer: {
                  id: "${account.id}",
                  firstName: "${account.firstName}",
                  lastName: "${account.lastName}",
                  email: "${account.email}",
                }
              ) {
                customer {
                  id
                  firstName
                  lastName
                  email
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

    if (data.data.customerUpdate.userErrors[0]) {
      throw new Error(data.data.customerUpdate.userErrors[0].message);
    }

    return data.data.customerUpdate.customer;
  } catch (error: any) {
    throw new Error(`Failed to update customer information: ${error.message}`);
  }
}
