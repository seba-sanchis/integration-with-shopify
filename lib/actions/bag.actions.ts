"use server";

import { Bag } from "@/types";
import { cookies } from "next/headers";

// Environments
const { SHOPIFY_ACCESS_TOKEN, SHOPIFY_STORE_URL } = process.env;

// Create bag
export async function newBag() {
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
          mutation newBag {
            cartCreate {
              cart {
                checkoutUrl
                id
              }
            }
          }
        `,
          variables: {},
        }),
      }
    );

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    const bagId = data.data.cartCreate.cart.id;

    cookies().set("bagId", bagId);

    return;
  } catch (error: any) {
    throw new Error(`Failed to add product to bag: ${error.message}`);
  }
}

// Add items to bag
export async function addToBag(variantId: string) {
  const cartId = cookies().get("bagId")?.value;

  if (!cartId) {
    throw new Error("Bag ID not found.");
  }

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
          mutation addToBag($cartId: ID!, $variantId: ID!) {
            cartLinesAdd(cartId: $cartId, lines: [{ quantity: 1, merchandiseId: $variantId}]) {
              cart {
                lines(first: 50) {
                  edges {
                    node {
                      id
                      quantity
                      merchandise {
                        ... on ProductVariant {
                          product {
                            title
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `,
          variables: { cartId, variantId },
        }),
      }
    );

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    return;
  } catch (error: any) {
    throw new Error(`Failed to add product to bag: ${error.message}`);
  }
}

// Read bag
export async function getBag() {
  const cartId = cookies().get("bagId")?.value;

  if (!cartId) {
    throw new Error("Bag ID not found.");
  }

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
          query getBag($cartId: ID!) {
            cart(id: $cartId) {
              id
              lines(first: 50) { 
                edges {
                  node {
                    id
                    quantity
                    merchandise {
                      ... on ProductVariant {
                        id
                        title
                        price {
                          amount
                        }
                        image {
                          originalSrc
                        }
                        product {
                          id
                          title
                          collections(first: 1) { 
                            edges {
                              node {
                                title
                              }
                            }
                          }
                        }
                        selectedOptions {
                          name
                          value
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          
          `,
          variables: { cartId },
        }),
      }
    );

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    return data.data.cart.lines.edges;
  } catch (error: any) {
    throw new Error(`Failed to fetch cart: ${error.message}`);
  }
}

// Read items
export async function getItems() {
  const cartId = cookies().get("bagId")?.value;

  if (!cartId) {
    throw new Error("Bag ID not found.");
  }

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
            query getItems($cartId: ID!) {
              cart(id: $cartId) {
                id
                lines(first: 50) { 
                  edges {
                    node {
                      quantity
                      merchandise {
                        ... on ProductVariant {
                          id
                        }
                      }
                    }
                  }
                }
              }
            }
          `,
          variables: { cartId },
        }),
      }
    );

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    const items = data.data.cart.lines.edges.map((item: Bag) => ({
      variantId: item.node.merchandise.id,
      quantity: item.node.quantity,
    }));

    return items;
  } catch (error: any) {
    throw new Error(`Failed to fetch cart: ${error.message}`);
  }
}

// Update bag
export async function editBag(itemId: string, quantity: number) {
  const bagId = cookies().get("bagId")?.value;

  if (!bagId) {
    throw new Error("Bag ID not found.");
  }

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
            mutation editBag($bagId: ID!, $itemId: ID!, $quantity: Int!) {
              cartLinesUpdate(cartId: $bagId, lines: [{id: $itemId, quantity: $quantity}]) {
                cart {
                  id
                  lines(first: 50) {
                    edges {
                      node {
                        id
                        quantity
                        merchandise {
                          ... on ProductVariant {
                            id
                            title
                            price {
                              amount
                              currencyCode
                            }
                            image {
                              originalSrc
                            }
                          }
                        }
                      }
                    }
                  }
                }
                userErrors {
                  message
                }
              }
            }
          `,
          variables: { bagId, itemId, quantity },
        }),
      }
    );

    const data = await response.json();

    // Find the updated line
    const item = data.data.cartLinesUpdate.cart.lines.edges.find(
      (item: Bag) => item.node.id === itemId
    );

    return item.node.quantity;
  } catch (error: any) {
    throw new Error(`Failed to update item quantity: ${error.message}`);
  }
}

// Delete items from bag
export async function removeFromBag(itemId: string) {
  try {
    const cartId = cookies().get("bagId")?.value;

    if (!cartId) {
      throw new Error("Bag ID not found.");
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
            mutation removeFromBag($cartId: ID!, $itemId: [ID!]!) {
              cartLinesRemove(cartId: $cartId, lineIds: $itemId) {
                cart {
                  id
                  lines(first: 50) {
                    edges {
                      node {
                        id
                        quantity
                        merchandise {
                          ... on ProductVariant {
                            id
                            title
                            price {
                              amount
                              currencyCode
                            }
                            image {
                              originalSrc
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          `,
          variables: { cartId, itemId },
        }),
      }
    );

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    return;
  } catch (error: any) {
    throw new Error(`Failed to remove product from bag: ${error.message}`);
  }
}
