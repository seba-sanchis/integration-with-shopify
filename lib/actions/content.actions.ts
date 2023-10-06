"use server";

// Environments
const { SHOPIFY_ACCESS_TOKEN, SHOPIFY_STORE_URL } = process.env;

// Read brand
export async function getBrand() {
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
            query getBrand {
              shop {
                brand {
                  logo {
                    image {
                      url
                    }
                    alt
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

    return data.data.shop.brand.logo;
  } catch (error: any) {
    throw new Error(`Failed to fetch brand image: ${error.message}`);
  }
}

// Read gallery
export async function getGallery() {
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
          query getGallery {
            metaobject(handle: { handle: "banner", type: "banner" }) {
              fields {
                key
                value
                reference {
                  ... on MediaImage {
                    image {
                        url
                    }
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

    return data.data.metaobject.fields;
  } catch (error: any) {
    throw new Error(`Failed to fetch banner: ${error.message}`);
  }
}

// Read engagement
export async function getEngagement() {
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
          query GetMetaobjectsByType($type: String!, $first: Int!) {
            metaobjects(type: $type, first: $first) {
              edges {
                node {
                  id
                  fields {
                    value
                    key
                    reference {
                      ... on MediaImage {
                        image {
                            url
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `,
          variables: { type: "categories", first: 2 },
        }),
      }
    );

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    return data.data.metaobjects.edges;
  } catch (error: any) {
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }
}

// Read social media
export async function getSocialMedia() {
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
          query getSocialMedia {
            metaobject(handle: { handle: "social-media", type: "social_media" }) {
              fields {
                key
                value
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

    return data.data.metaobject.fields;
  } catch (error: any) {
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }
}
