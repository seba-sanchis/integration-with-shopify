"use server";

// Environments
const { SHOPIFY_ACCESS_TOKEN, SHOPIFY_STORE_URL } = process.env;

// Read section
export async function getSection(name: string) {
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
            query getSection($title: String!) {
              collections(first: 1, query: $title) {
                edges {
                  node {
                    id
                    title
                    products(first: 50) {
                      edges {
                        node {
                          id
                          title
                          variants(first: 50) {
                            edges {
                              node {
                                sku
                                priceV2 {
                                  amount
                                }
                              }
                            }
                          }
                          images(first: 5) {
                            edges {
                              node {
                                originalSrc
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
              }
            }
          `,
          variables: { title: name },
        }),
      }
    );

    const data = await response.json();

    const collectionNode = data.data.collections.edges[0]?.node;

    if (!collectionNode) {
      throw new Error(`Collection with name ${name} not found`);
    }

    return collectionNode;
  } catch (error: any) {
    throw new Error(`Failed to fetch collection: ${error.message}`);
  }
}

// Read sections
export async function getSections() {
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
              {
                collections(first: 50) {
                  edges {
                    node {
                      id
                      title
                    }
                  }
                }
              }
            `,
        }),
      }
    );

    const data = await response.json();

    return data.data.collections.edges;
  } catch (error: any) {
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }
}
