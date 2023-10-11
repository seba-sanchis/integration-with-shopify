import { Privacy, Shipping, Validation } from "@/types";

export function privacyValidation(privacy: Privacy) {
  let error: Validation = {};

  if (!privacy.firstName) {
    error.firstName = "El nombre es requerido.";
  }

  if (!privacy.lastName) {
    error.lastName = "El apellido es requerido.";
  }

  if (!privacy.email) {
    error.email = "El email es requerido.";
  } else if (!/\S+@\S+\.\S+/.test(privacy.email)) {
    error.email = "El email no es válido.";
  }

  if (!privacy.password) {
    error.password = "La contraseña es requerida.";
  }

  if (privacy.password !== privacy.confirmPassword) {
    error.password = "Las contraseñas no coinciden.";
  }

  return error;
}

export function shippingValidation(shipping: Shipping) {
  let error: Validation = {};

  if (!shipping.address1) {
    error.address1 = "La dirección es requerida.";
  }

  if (!shipping.city) {
    error.city = "La ciudad es requerida.";
  }

  if (!shipping.province) {
    error.province = "La provincia es requerida.";
  }

  if (!shipping.zip) {
    error.zip = "El CP es requerido.";
  } else {
    if (!/^.+$/.test(shipping.zip)) {
      error.zip = "El CP no es válido.";
    }
  }

  if (!shipping.phone) {
    error.phone = "El número de teléfono es requerido.";
  } else if (!/^\d{10}$/.test(shipping.phone)) {
    error.phone = "El número de teléfono no es válido.";
  }

  return error;
}

export function signInValidation(privacy: Privacy) {
  let error: Validation = {};

  if (!privacy.email) {
    error.email = "El email es requerido";
  } else if (!/\S+@\S+\.\S+/.test(privacy.email)) {
    error.email = "El email no es válido";
  }

  if (!privacy.password) {
    error.password = "La contraseña es requerida";
  }

  return error;
}

export function signUpValidation(privacy: Privacy) {
  let error: Validation = {};

  if (!privacy.firstName) {
    error.firstName = "El nombre es requerido.";
  }

  if (!privacy.lastName) {
    error.lastName = "El apellido es requerido.";
  }

  if (!privacy.email) {
    error.email = "El email es requerido";
  } else if (!/\S+@\S+\.\S+/.test(privacy.email)) {
    error.email = "El email no es válido";
  }

  if (!privacy.password) {
    error.password = "La contraseña es requerida";
  }

  if (privacy.password !== privacy.confirmPassword) {
    error.password = "Las contraseñas no coinciden.";
  }

  return error;
}
