import { Privacy, Shipping, Validation } from "@/types";

export function privacyValidation(privacy: Privacy) {
  let error: Validation = {};

  if (!privacy.firstName) {
    error.firstName = "First Name is required";
  }

  if (!privacy.lastName) {
    error.lastName = "Last Name is required";
  }

  if (!privacy.email) {
    error.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(privacy.email)) {
    error.email = "Email is invalid";
  }

  if (!privacy.password) {
    error.password = "Password is required";
  }

  if (privacy.password !== privacy.confirmPassword) {
    error.password = "Passwords do not match";
  }

  return error;
}

export function shippingValidation(shipping: Shipping) {
  let error: Validation = {};

  if (!shipping.address1) {
    error.address1 = "Address is required";
  }

  if (!shipping.city) {
    error.city = "City is required";
  }

  if (!shipping.province) {
    error.province = "Province is required";
  }

  if (!shipping.zip) {
    error.zip = "Postal Code is required";
  } else {
    if (!/^.+$/.test(shipping.zip)) {
      error.zip = "Postal Code is invalid";
    }
  }

  if (!shipping.phone) {
    error.phone = "Phone Number is required";
  } else if (!/^\d{10}$/.test(shipping.phone)) {
    error.phone = "Phone Number is invalid";
  }

  return error;
}

export function signInValidation(privacy: Privacy) {
  let error: Validation = {};

  if (!privacy.email) {
    error.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(privacy.email)) {
    error.email = "Email is invalid";
  }

  if (!privacy.password) {
    error.password = "Password is required";
  }

  return error;
}

export function signUpValidation(privacy: Privacy) {
  let error: Validation = {};

  if (!privacy.firstName) {
    error.firstName = "First Name is required";
  }

  if (!privacy.lastName) {
    error.lastName = "Last Name is required";
  }

  if (!privacy.email) {
    error.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(privacy.email)) {
    error.email = "Email is invalid";
  }

  if (!privacy.password) {
    error.password = "Password is required";
  }

  if (privacy.password !== privacy.confirmPassword) {
    error.password = "Passwords do not match";
  }

  return error;
}
