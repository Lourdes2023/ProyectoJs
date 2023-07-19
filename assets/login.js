const registerPago = document.querySelector(".contact-form");
const nameInput = document.getElementById("name");
const cardNumberInput = document.getElementById("cardNumber");
const expirationDateInput = document.getElementById("expirationDate");
const cvvInput = document.getElementById("cvv");
const addressInput = document.getElementById("address");
const countryInput = document.getElementById("country");
const zipCodeInput = document.getElementById("zipCode");
const totalAmountFormElement = document.getElementById("totalAmountForm");

const isEmpty = (input) => {
  return !input.value.trim().length;
};

const showError = (input, message) => {
  const formGroup = input.parentElement;
  let errorMessageElement = formGroup.querySelector(".error-message");

  if (!errorMessageElement) {
    errorMessageElement = document.createElement("div");
    errorMessageElement.classList.add("error-message");
    formGroup.appendChild(errorMessageElement);
  }

  errorMessageElement.innerText = message;

  if (message) {
    formGroup.classList.add("has-error");
    showMessage(input, "", false);
  } else {
    formGroup.classList.remove("has-error");
    showMessage(input, "Campo válido", true);
  }
};

const showMessage = (input, message, isValid = true) => {
  const formGroup = input.parentElement;
  let messageElement = formGroup.querySelector(".message");

  if (!messageElement) {
    messageElement = document.createElement("div");
    messageElement.classList.add("message");
    formGroup.appendChild(messageElement);
  }

  messageElement.innerText = message;

  if (isValid) {
    messageElement.classList.add("success");
    messageElement.classList.remove("error");
  } else {
    messageElement.classList.add("error");
    messageElement.classList.remove("success");
  }
};

const checkTextInput = (input, minLength = 1, errorMessage) => {
  const value = input.value.trim();

  if (isEmpty(input) || value.length < minLength) {
    showError(input, errorMessage);
    return false;
  }

  showError(input, "");
  showMessage(input, "Campo válido", true);
  return true;
};

const checkNumberInput = (input) => {
  const value = input.value.trim();
  const numberPattern = /^\d+$/;

  if (isEmpty(input)) {
    showError(input, "Este campo no puede estar vacío.");
    showMessage(input, "", false);
    return false;
  }

  if (!numberPattern.test(value)) {
    showError(input, "Este campo solo permite números.");
    showMessage(input, "", false);
    return false;
  }

  showError(input, "");
  showMessage(input, "Campo válido", true);
  return true;
};

const checkDateInput = (input) => {
  const value = input.value.trim();
  const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;

  if (isEmpty(input)) {
    showError(input, "Este campo no puede estar vacío.");
    showMessage(input, "", false);
    return false;
  }

  if (!datePattern.test(value)) {
    showError(input, "Formato de fecha inválido. Usa DD/MM/YYYY.");
    showMessage(input, "", false);
    return false;
  }

  showError(input, "");
  showMessage(input, "Campo válido", true);
  return true;
};

const checkAddressInput = (input) => {
  const value = input.value.trim();
  const addressPattern = /^[a-zA-Z0-9\s]+$/;

  if (isEmpty(input)) {
    showError(input, "Este campo no puede estar vacío.");
    showMessage(input, "", false);
    return false;
  }

  if (!addressPattern.test(value)) {
    showError(input, "Este campo solo permite letras y números.");
    showMessage(input, "", false);
    return false;
  }

  showError(input, "");
  showMessage(input, "Campo válido", true);
  return true;
};

const limpiarCarrito = () => {
  localStorage.removeItem("cartItems");
  localStorage.removeItem("cartTotalPrice");
};

const handlePaymentRegistration = (e) => {
  e.preventDefault();

  const isValidName = checkTextInput(nameInput);
  const isValidCardNumber = checkNumberInput(cardNumberInput);
  const isValidExpirationDate = checkTextInput(expirationDateInput);
  const isValidCVV = checkNumberInput(cvvInput);
  const isValidAddress = checkAddressInput(addressInput);
  const isValidCountry = checkTextInput(countryInput);
  const isValidZipCode = checkNumberInput(zipCodeInput);

  if (
    isValidName &&
    isValidCardNumber &&
    isValidExpirationDate &&
    isValidCVV &&
    isValidAddress &&
    isValidCountry &&
    isValidZipCode
  ) {
    // Todos los campos son válidos, guardar en el Local Storage
    const paymentData = {
      name: nameInput.value.trim(),
      cardNumber: cardNumberInput.value.trim(),
      expirationDate: expirationDateInput.value.trim(),
      cvv: cvvInput.value.trim(),
      address: addressInput.value.trim(),
      country: countryInput.value.trim(),
      zipCode: zipCodeInput.value.trim(),
    };

    localStorage.setItem("paymentData", JSON.stringify(paymentData));
    alert("Pago realizado exitosamente. Los datos han sido guardados.");
    window.location.href = "gracias.html";
    limpiarCarrito();
    alert(
      "Por favor, verifica los campos y completa la información requerida."
    );
  }
};

const loadCartDataFromLocalStorage = () => {
  const cartTotalPrice = parseFloat(localStorage.getItem("cartTotalPrice"));
  totalAmountFormElement.textContent = `$${cartTotalPrice.toFixed(2)}`;
};

const init = () => {
  registerPago.addEventListener("submit", handlePaymentRegistration);
  nameInput.addEventListener("input", () => checkTextInput(nameInput));
  cvvInput.addEventListener("input", () => checkNumberInput(cvvInput));
  addressInput.addEventListener("input", () => checkTextInput(addressInput));
  countryInput.addEventListener("input", () => checkTextInput(countryInput));
  zipCodeInput.addEventListener("input", () => checkNumberInput(zipCodeInput));
  cardNumberInput.addEventListener("input", () =>
    checkNumberInput(cardNumberInput)
  );
  expirationDateInput.addEventListener("input", () =>
    checkTextInput(expirationDateInput)
  );
  loadCartDataFromLocalStorage();
};

init();
