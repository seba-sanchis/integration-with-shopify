export interface Bag {
  node: {
    id: string;
    quantity: number;
    merchandise: {
      id: string;
      title: string;
      price: { amount: string };
      image: {
        originalSrc: string;
      };
      product: {
        id: string;
        title: string;
        collections: { edges: [{ node: { title: string } }] };
      };
      selectedOptions: [{ name: string; value: string }];
    };
  };
}

export interface Brand {
  name: string;
  brand: {
    shortDescription: string;
    slogan: string;
    logo: {
      image: {
        url: string;
      };
      alt: string;
    };
  };
}

export interface Contact {
  name: string;
  email: string;
  message: string;
}

export interface Engagement {
  node: {
    id: string;
    fields: [
      { value: string; key: string; reference?: { image: { url: string } } }
    ];
  };
}

export interface Item {
  name: string;
  value: string;
}

export interface Privacy {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface Product {
  node: {
    id: string;
    title: string;
    collections: { edges: [{ node: { title: string } }] };
    description: string;
    images: {
      edges: [
        {
          node: {
            originalSrc: string;
          };
        }
      ];
    };
    options: [{ name: string; values: string[] }];
    priceRange: { minVariantPrice: { amount: string } };
    variants: {
      edges: [
        {
          node: {
            id: string;
            sku: string;
            priceV2: { amount: string };
            selectedOptions: [{ name: string; value: string }];
            image: { url: string };
            quantityAvailable: number;
          };
        }
      ];
    };
  };
}

export interface Section {
  node: {
    id: string;
    title: string;
  };
}

export interface Shipping {
  id: string;
  address1: string;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone: string;
}

export interface SocialMedia {
  key: string;
  value: string;
}

export interface Validation {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  address1?: string;
  city?: string;
  province?: string;
  country?: string;
  zip?: string;
  phone?: string;
}
