const productsContainer = document.querySelector("#productCards");
const verMasButton = document.querySelector("#verMasButton");
const sliderContainer = document.querySelector(".slider-container");
const slider = document.querySelector(".slider");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const verMenosButton = document.querySelector("#verMenosButton");
const categoryContainer = document.getElementById("categories");
const categoryButtons = document.querySelectorAll(".category-button");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchResults = document.getElementById("result-container");
const cartTotal = document.getElementById("cart-total");
const cartItemsContainer = document.querySelector(".cart-items");
const cartCountElement = document.getElementById("cart-count");
const cartContainer = document.querySelector(".cart");
const cartIcon = document.querySelector(".cart-icon");
const navbarcollapse = document.querySelector(".navbar-collapse");
console.log(navbarcollapse);
const navbarToggleIcon = document.getElementById("navbarToggle");
const checkoutButton = document.querySelector(".checkout");
const myForm = document.getElementById("myForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const submitButton = document.getElementById("submitButton");

//--------------------------------------------------------------variables globales------------------------------------------

let cartTotalPrice = parseFloat(localStorage.getItem("cartTotalPrice")) || 0;
let currentPosition = 0;
let groups = [];
const defaultProduct = {
  id: 0,
  name: "Victoria",
  price: 4.25,
  image: "assets/img/Aros/ArosGotasNaraja.png",
  meaning:
    "Este aro simboliza la gracia y la belleza que florecen en tu vida, aportando alegría y encanto a tu entorno.",
};
//-------------------------------------------------------------Generar dinámicamente productos-----------------------------
const createProductTemplate = (product) => {
  const { id, name, price, image, meaning } = product;
  return `
      <div class="card-container col-lg-4 col-md-6 col-sm-12">
        <div class="card">
          <img src=${image} alt=${name} class="card-img" />
          <div class="overlay">
            <h3 class="card-title">${name}</h3>
            <p class="card-price">$${price}</p>
            <p class="card-description">
              ${meaning}
            </p>
            <button class="btn btn-primary add-to-cart-button" 
            data-name="${name}"
            data-price="${price}" 
            data-image="${image}"
            data-id="${id}"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    `;
};

const renderProductCards = (productsList) => {
  const groupTotal = productsList;
  productsContainer.innerHTML = groupTotal.map(createProductTemplate).join("");
  console.log(groupTotal);
};
//------------------------------------------------------------Botones Ver mas y ver menos-----------------------------------------
const showAllProducts = () => {
  const groupToShow = appState.dividedGroups[currentPosition];
  renderProductCards(groupToShow);
  slider.classList.add("wrap-container");
  prevButton.style.display = "none";
  nextButton.style.display = "none";

  currentPosition = (currentPosition + 1) % appState.dividedGroups.length;

  if (currentPosition === 0 && appState.dividedGroups.length > 1) {
    verMasButton.style.display = "none";
    verMenosButton.style.display = "block";
  } else {
    verMasButton.style.display = "block";

    verMenosButton.style.display = "block";
  }
};

const showLessProducts = () => {
  slider.classList.remove("wrap-container");
  prevButton.style.display = "block";
  nextButton.style.display = "block";
  verMasButton.style.display = "block";

  verMenosButton.style.display = "none";
};
//------------------------------------------------------------Mostrar productos buscados-----------------------------------------

const getProductByName = (name) => {
  const product = appState.products.find(
    (product) => product.name.toLowerCase() === name.toLowerCase()
  );
  console.log("ultimoBuscado", appState.products);
  console.log("ultimoBuscado", product);
  return product;
};

const showSearchedProduct = (product) => {
  searchResults.innerHTML = createProductTemplate(product);
};

const searchAndShowProduct = () => {
  const productName = searchInput.value.trim();
  const searchedProduct = getProductByName(productName) || defaultProduct;
  localStorage.setItem("ultimoBuscado", JSON.stringify(searchedProduct));
  showSearchedProduct(searchedProduct);
};

const lastSearchedProduct = JSON.parse(localStorage.getItem("ultimoBuscado"));
showSearchedProduct(lastSearchedProduct || defaultProduct);

//---------------------------------------------------------------Agregar al carrito--------------------------------------------------

const getCartItemsFromLocalStorage = () => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  return cartItems ? cartItems : [];
};

const saveCartItemsToLocalStorage = (cartItems) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

const getCartTotalPrice = () => {
  return parseFloat(localStorage.getItem("cartTotalPrice")) || 0;
};

const updateCartTotalPrice = (newTotalPrice) => {
  if (typeof newTotalPrice === "number" && !isNaN(newTotalPrice)) {
    localStorage.setItem("cartTotalPrice", newTotalPrice.toFixed(2));
    cartTotal.innerText = newTotalPrice.toFixed(2);
    cartTotalPrice = newTotalPrice;
  } else {
    console.error("Error: newTotalPrice is not a valid number.");
  }
};

const updateCartUI = () => {
  const cartItems = getCartItemsFromLocalStorage();
  cartItemsContainer.innerHTML = "";
  let totalPrice = 0;

  cartItems.forEach((item) => {
    const { productId, name, price, Image, quantity } = item;
    const productTotalPrice = price * quantity;
    totalPrice += productTotalPrice;

    const cartItem = document.createElement("li");
    cartItem.classList.add("cart-item");
    cartItem.dataset.id = productId;
    cartItem.innerHTML = `
      <div class="item-info">
        <img src="${Image}"alt="${name}" />
        <div class="item-details">
          <h3>${name}</h3>
          <p>Precio: $${price.toFixed(2)}</p>
          <p>Cantidad: ${quantity}</p>
        </div>
      </div>
      <button class="remove-item" onclick="removeFromCart(event)">
  <i class="bi bi-trash"></i>
</button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });
  cartTotalPrice = totalPrice;
  updateCartTotalPrice(cartTotalPrice);
};

const addToCart = (event) => {
  const button = event.target;
  const productName = button.dataset.name;
  const productPrice = parseFloat(button.dataset.price);
  const productId = button.dataset.id;
  const productImage = button.dataset.image;
  const cartItems = getCartItemsFromLocalStorage();
  const existingCartItem = cartItems.find(
    (item) => item.productId === productId
  );

  if (existingCartItem) {
    existingCartItem.quantity += 1;
    existingCartItem.totalPrice =
      existingCartItem.price * existingCartItem.quantity;
  } else {
    const newCartItem = {
      productId,
      name: productName,
      price: productPrice,
      quantity: 1,
      totalPrice: productPrice,
      Image: productImage,
    };
    cartItems.push(newCartItem);
  }
  cartTotalPrice += productPrice;
  saveCartItemsToLocalStorage(cartItems);
  updateCartTotalPrice(cartTotalPrice);
  updateCartUI();
  updateCartCount();
};

const removeFromCart = (event) => {
  event.stopPropagation();
  const button = event.target;
  const isIconClick = button.classList.contains("bi-trash");
  const cartItem = isIconClick ? button.closest(".cart-item") : button;

  if (cartItem) {
    const productId = cartItem.dataset.id;
    const cartItems = getCartItemsFromLocalStorage();
    const existingCartItem = cartItems.find(
      (item) => item.productId === productId
    );

    if (existingCartItem) {
      const currentQuantity = existingCartItem.quantity;
      if (currentQuantity > 1) {
        existingCartItem.quantity -= 1;
        existingCartItem.totalPrice =
          existingCartItem.price * existingCartItem.quantity;
      } else {
        const existingCartItemIndex = cartItems.findIndex(
          (item) => item.productId === productId
        );
        if (existingCartItemIndex !== -1) {
          cartItems.splice(existingCartItemIndex, 1);
        }
      }
      saveCartItemsToLocalStorage(cartItems);
      cartTotalPrice -= existingCartItem.price;
      updateCartTotalPrice(cartTotalPrice);
      updateCartUI();
      updateCartCount();
    }
  }
};
const updateCartCount = () => {
  const cartItems = getCartItemsFromLocalStorage();
  let totalCount = 0;
  cartItems.forEach((item) => {
    totalCount += item.quantity;
  });
  const totalCountAsNumber = parseInt(totalCount);
  cartCountElement.textContent = totalCountAsNumber;
};
//------------------------------------------------------------------toggle---------------------------------------------------

const toggleCartVisibility = () => {
  cartContainer.classList.toggle("openCart");
  if (navbarcollapse.classList.contains("openMenu")) {
    navbarcollapse.classList.remove("openMenu");
  }
};

const toggleMenu = () => {
  navbarcollapse.classList.toggle("openMenu");
  if (cartContainer.classList.contains("openCart")) {
    cartContainer.classList.remove("openCart");
  }
};

const closeCartAndMenu = () => {
  if (cartContainer.classList.contains("openCart")) {
    cartContainer.classList.remove("openCart");
  }

  if (navbarcollapse.classList.contains("openMenu")) {
    navbarcollapse.classList.remove("openMenu");
  }
};
//------------------------------------------------------------------Formulario de pago-----------------------------------
const handleCheckout = () => {
  if (cartTotalPrice <= 0) {
    alert("El carrito está vacío. Agrega productos para continuar.");
  } else {
    const paymentModal = document.getElementById("paymentModal");
    const paymentAmount = document.getElementById("paymentAmount");
    paymentAmount.textContent = cartTotalPrice.toFixed(2);
    paymentModal.style.display = "block";
    const confirmPaymentButton = document.getElementById("confirmPayment");
    const cancelPaymentButton = document.getElementById("cancelPayment");
    confirmPaymentButton.addEventListener("click", () => {
      window.location.href = "/assets/login.html";
    });
    cancelPaymentButton.addEventListener("click", () => {
      paymentModal.style.display = "none";
    });
  }
};

//-------------------------------------------------------------------Deslizar productos---------------------------------------

//---------------------------------------------------------Botones de deslizamiento-----------------------------------------------------------------------------

const slideLeft = () => {
  const cardWidth = 300;
  const numProductsToSlide = Math.floor(window.innerWidth / cardWidth);
  appState.slidePosition += cardWidth * numProductsToSlide;

  const maxSlidePosition = 0;
  const minSlidePosition = -(
    productsContainer.scrollWidth - productsContainer.clientWidth
  );

  if (appState.slidePosition > maxSlidePosition) {
    appState.slidePosition = maxSlidePosition;
  }
  if (appState.slidePosition < minSlidePosition) {
    appState.slidePosition = minSlidePosition;
  }

  productsContainer.style.transform = `translateX(${appState.slidePosition}px)`;
};

const slideRight = () => {
  const cardWidth = 300;
  const numProductsToSlide = Math.floor(window.innerWidth / cardWidth);
  appState.slidePosition -= cardWidth * numProductsToSlide;

  const maxSlidePosition = 0;
  const minSlidePosition = -(
    productsContainer.scrollWidth - productsContainer.clientWidth
  );

  if (appState.slidePosition < minSlidePosition) {
    appState.slidePosition = minSlidePosition;
  }
  if (appState.slidePosition > maxSlidePosition) {
    appState.slidePosition = maxSlidePosition;
  }

  productsContainer.style.transform = `translateX(${appState.slidePosition}px)`;
};

//------------------------------------------------------------------filtro por categoria-----------------------------------------------------------------------------
//Función para filtrar los productos por categoría
const filterProductsByCategory = (category) => {
  if (category === "all") {
    renderProductCards(appState.products);
    if (slider.classList.contains("wrap-container")) {
      verMasButton.style.display = "none";
      verMenosButton.style.display = "block";
    }
  } else {
    const filteredProducts = appState.products.filter(
      (product) => product.category === category
    );
    renderProductCards(filteredProducts);
    if (slider.classList.contains("wrap-container")) {
      verMasButton.style.display = "none";
      verMenosButton.style.display = "block";
    }
  }
  appState.slidePosition = 0;
  productsContainer.style.transform = `translateX(${appState.slidePosition}px)`;
};
categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;
    filterProductsByCategory(category);
    categoryButtons.forEach((btn) => {
      btn.classList.remove("active");
    });
    button.classList.add("active");
  });
});

//------------------------------------------------------------------formularioMessage-------------------------------------

const handleMessageSubmission = (e) => {
  e.preventDefault();
  const isValidName = checkTextInput(nameInput);
  const isValidEmail = checkEmailInput(emailInput);
  const isValidMessage = checkMessageInput(messageInput);

  if (isValidName && isValidEmail && isValidMessage) {
    submitButton.innerHTML =
      '<i class="fa fa-spinner fa-spin"></i> Enviando...';
    submitButton.disabled = true;
    setTimeout(() => {
      submitButton.innerHTML = '<i class="fa fa-check"></i> Enviado';
      setTimeout(() => {
        submitButton.innerHTML = "Enviar";
        submitButton.disabled = false;
      }, 1000);
      myForm.reset();
    }, 3000);
  } else {
    return;
  }
};

const checkTextInput = (input) => {
  const value = input.value.trim();
  const minCharacters = 3;

  if (value.length < minCharacters) {
    showError(input, "El campo debe tener al menos 3 caracteres.");
    return false;
  }
  showError(input, "");
  return true;
};

const checkEmailInput = (input) => {
  const value = input.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(value)) {
    showError(input, "Ingresa un correo electrónico válido.");
    return false;
  }
  showError(input, "");
  return true;
};

const checkMessageInput = (input) => {
  const value = input.value.trim();
  const minCharacters = 10;

  if (value.length < minCharacters) {
    showError(input, "El mensaje debe tener al menos 10 caracteres.");
    return false;
  }
  showError(input, "");
  return true;
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

//.................................................................Inicializacion.......................................................................................

function init() {
  renderProductCards(appState.products);
  prevButton.addEventListener("click", slideLeft);
  nextButton.addEventListener("click", slideRight);
  verMasButton.addEventListener("click", showAllProducts);
  verMenosButton.addEventListener("click", showLessProducts);
  searchButton.addEventListener("click", searchAndShowProduct);
  checkoutButton.addEventListener("click", handleCheckout);
  cartIcon.addEventListener("click", toggleCartVisibility);
  navbarToggleIcon.addEventListener("click", toggleMenu);
  window.addEventListener("scroll", closeCartAndMenu);
  document.addEventListener("DOMContentLoaded", () => {
    updateCartUI();
    updateCartCount();
  });
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-item")) {
      removeFromCart(event);
    } else if (event.target.classList.contains("add-to-cart-button")) {
      addToCart(event);
    }
  });
  searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      searchAndShowProduct();
    }
  });
  appState.products.unshift(defaultProduct);
  myForm.addEventListener("submit", handleMessageSubmission);
  nameInput.addEventListener("input", () => checkTextInput(nameInput));
  emailInput.addEventListener("input", () => checkEmailInput(emailInput));
  messageInput.addEventListener("input", () => checkMessageInput(messageInput));
}

init();
