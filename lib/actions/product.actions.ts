"use server";

// Environments
const { SHOPIFY_ACCESS_TOKEN, SHOPIFY_STORE_URL } = process.env;

// Read product
export async function getProduct(name: string) {
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
            query getProduct($title: String!) {
              products(first: 1, query: $title) {
                edges {
                  node {
                    id
                    title
                    description
                    images(first: 50) {
                      edges {
                        node {
                          originalSrc
                        }
                      }
                    }
                    priceRange {
                      minVariantPrice {
                        amount
                      }
                    }
                    options {
                      name
                      values
                    }
                    variants(first: 50) {
                      edges {
                        node {
                          id
                          sku
                          priceV2 {
                            amount
                          }
                          selectedOptions {
                            name
                            value
                          }
                          image {
                            url
                          }
                          quantityAvailable
                        }
                      }
                    }
                  }
                }
              }
            }
          `,
          variables: { title: name },
        }),
      }
    );

    const data = await response.json();

    const productNode = data.data.products.edges[0];

    if (!productNode) {
      throw new Error(`Product with name ${name} not found`);
    }

    return productNode;
  } catch (error: any) {
    throw new Error(`Failed to fetch product by name: ${error.message}`);
  }
}

// Read products
export async function getProducts() {
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
          query: ` {
            products(first: 8, sortKey: BEST_SELLING, reverse: true) {
              edges {
                node {
                  id
                  title
                  collections(first: 1) { 
                    edges {
                      node {
                        title
                      }
                    }
                  }
                  images(first: 1) {
                    edges {
                      node {
                        originalSrc
                      }
                    }
                  }
                  priceRange {
                    minVariantPrice {
                      amount
                    }
                  }
                  variants(first: 1) {
                    edges {
                      node {
                        sku
                      }
                    }
                  }
                }
              }
            }
          }`,
        }),
      }
    );

    // Parse the response as JSON
    const data = await response.json();

    return data.data.products.edges;
  } catch (error: any) {
    throw new Error(`Failed to fetch all posts: ${error.message}`);
  }
}

// Read search
export async function getSearch(query: string) {
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
          query getSearch($query: String!, $first: Int) {
            search(query: $query, first: $first, types: PRODUCT) {
              edges {
                node {
                  ... on Product {
                    id
                    title
                    images(first: 1) {
                      edges {
                        node {
                          originalSrc
                        }
                      }
                    }
                    variants(first: 1) {
                      edges {
                        node {
                          priceV2 {
                            amount
                          }
                        }
                      }
                    }
                    collections(first: 1) { 
                      edges {
                        node {
                          title
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          `,
          variables: {
            query: query,
            first: 30,
          },
        }),
      }
    );

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    return data.data.search.edges;
  } catch (error: any) {
    throw new Error(`Failed to search products: ${error.message}`);
  }
}
