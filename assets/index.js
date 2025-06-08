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
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    `;
};

const renderProductCards = (productsList) => {
  const groupTotal = productsList;
  productsContainer.innerHTML = groupTotal.map(createProductTemplate).join("");
  console.log(  "este es renderProdutCards :", groupTotal);
  localStorage.setItem("products", JSON.stringify(appState.products))

};

//------------------------------------------------------------Mostrar productos buscados-----------------------------------------

function searchProduct(productName) {
  let storedProducts = JSON.parse(localStorage.getItem('products'));
  let product = storedProducts.find(p => p.name.toLowerCase() === productName.toLowerCase());
  return product ? product : null;
}

function searchAndShowProduct() {
  let productName = searchInput.value;
  let product = searchProduct(productName);
  if (product) {
    searchResults.innerHTML = createProductTemplate(product);
  } else {
    alert('Producto con nombre ' + productName + ' no diseñado aún');
  }
}
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


//------------------------------------------------------------------filtro por categoria-----------------------------------------------------------------------------
const filterProductsByCategory = (category) => {
  let filteredProducts;
  if (category === "all") {
    filteredProducts = appState.products;
    
  } else {
    filteredProducts = appState.products.filter(
      (product) => product.category === category
    );
  }
  appState.dividedGroups = divideArrayIntoGroups(
    filteredProducts,
    4,
    0,
    Math.ceil(filteredProducts.length / 4) - 1
  );
  appState.slidePosition = 0;
  productsContainer.style.transform = `translateX(${appState.slidePosition}px)`;
  verMasButton.style.display = appState.dividedGroups.length > 1 ? "block" : "none";
  verMenosButton.style.display = "none";
   renderProductCards(appState.dividedGroups[0]);
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

/*-------------------------------------ver mas y ver menos-----------------------------------------*/
// Evento para el botón "ver más"
function showAllProducts() {
  if (appState.slidePosition < appState.dividedGroups.length - 1) {
    appState.slidePosition++;
    renderProductCards(appState.dividedGroups[appState.slidePosition]);
    verMenosButton.style.display = "block";
  }

  if (appState.slidePosition === appState.dividedGroups.length - 1) {
    verMasButton.style.display = "none";
  }
}

// Evento para el botón "ver menos"
function showLessProducts() {
  if (appState.slidePosition > 0) {
    appState.slidePosition--;
    renderProductCards(appState.dividedGroups[appState.slidePosition]);
    verMasButton.style.display = "block";
  }

  if (appState.slidePosition === 0) {
    verMenosButton.style.display = "none";
  }
}

function init() {
  renderProductCards(appState.products);
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
//------------------------------------------------------------------formularioMessage-------------------------------------

function handleMessageSubmission(e) {
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
}

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
  renderProductCards(appState.dividedGroups[0 ]);
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
