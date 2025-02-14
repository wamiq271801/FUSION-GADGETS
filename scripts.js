/************************************
  SELECTORS AND VARIABLES
************************************/

// DOM ELEMENTS
const cartButton = document.querySelector('.cart-button');
const cartCount = document.getElementById('cart-count');
const cartDrawer = document.querySelector('.cart-drawer');
const closeButton = document.querySelector('.close-button');
const checkoutButton = document.querySelector('.checkout-button');
const productsContainer = document.querySelector('.products-grid');
const notificationModal = document.getElementById('notification-modal');
const notificationMessage = notificationModal.querySelector('.notification-message');
const closeNotification = document.querySelector('.close-notification');
const notificationButton = document.querySelector('.notification-button');
const imagePopupModal = document.getElementById('image-popup-modal');
const popupImage = document.getElementById('popup-image');
const popupPrevButton = document.getElementById('popup-prev-button');
const popupNextButton = document.getElementById('popup-next-button');
const closePopup = document.querySelector('.close-popup');

// CART ARRAY
let cart = [];

// VARIABLES FOR IMAGE POPUP
let currentImageIndex = 0;
let currentProductImages = [];

/************************************
  PRODUCT DATA
************************************/
const products = {
  'Apple watch Series 9 Clone': {
    title: 'Apple watch Series 10 Clone',
    price: 2399,
    images: [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Series9/Series9%20(6).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Series9/Series9%20(5).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Series9/Series9%20(4).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Series9/Series9%20(3).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Series9/Series9%20(2).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Series9/Series9%20(1).png',
    ],

    description: 'Smartwatch 9 Generation with 2.09 inch LCD TFT Display, Sleep Tracking, BP Monitor, Multi Sports Mode, Bluetooth Calling,10 Meter Connectivity Range, Wireless Charger, Splash Resistant(Black, 45 mm).'
  },
  'TX10 Smartwatch': {
    title: 'TX10 Smartwatch',
    price: 699,
    images: [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/TX10%20Smartwatch/Untitled%20design%20(5).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/TX10%20Smartwatch/Untitled%20design%20(6).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/TX10%20Smartwatch/Untitled%20design%20(7).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/TX10%20Smartwatch/Untitled%20design%20(8).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/TX10%20Smartwatch/Untitled%20design%20(9).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/TX10%20Smartwatch/Untitled%20design%20(10).png',

    ],
    description: 'TX10 PRO MAX Smartwatch with 1.9 inch LCD TFT Display, Sleep Tracking, BP Monitor, Multi Sports Mode Bluetooth Calling, 10 Meter Connectivity Range, Wireless Charger|Black.'
  },
  'Series 10 Smartwatch': {
    title: 'Series 10 Smartwatch',
    price: 2999,
    images: 
      [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Series10Milanese/Series10Milanese%20(1).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Series10Milanese/Series10Milanese%20(2).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Series10Milanese/Series10Milanese%20(3).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Series10Milanese/Series10Milanese%20(4).png',
    ],
    description: 'Smartwatch 10 Generation with 2.09 inch LCD TFT Display, Sleep Tracking, BP Monitor, Multi Sports Mode Bluetooth Calling, 10 Meter Connectivity Range, Wireless Charger, Splash Resistant (Silver, 45mm).'
  },
};

/************************************
  INITIALIZATION
************************************/

loadCartFromLocalStorage(); // Load cart data from local storage
generateProductCards(); // Generate product cards
updateCart(); // Update cart display

/************************************
  FUNCTION DEFINITIONS
************************************/

/**
 * Generates product cards dynamically based on the products object.
 */
function generateProductCards() {
  productsContainer.innerHTML = ''; // Clear container before adding products
  for (const productId in products) {
    const product = products[productId];

    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    productCard.innerHTML = `
      <div class="product-image-container">
        <button class="prev-button" data-product="${productId}">&lt;</button>
        <img src="${product.images[0]}"
             alt="${product.title}"
             class="product-image"
             data-product="${productId}"
             data-index="0">
        <button class="next-button" data-product="${productId}">&gt;</button>
      </div>
      <div class="product-content">
        <h3 class="product-title">${product.title}</h3>
        <p class="product-description">${product.description}</p>
        <p class="product-price">₹${product.price.toFixed(2)}</p>
        <div class="product-buttons">
          <button class="button buy-now-button" data-product="${productId}">Buy Now</button>
          <button class="button add-to-cart-button" data-product="${productId}">Add to Cart</button>
        </div>
      </div>
    `;
    productsContainer.appendChild(productCard);
  }
}

/**
 * Updates the cart display, total amount, and cart count badge.
 */
function updateCart() {
  const cartItemsContainer = document.querySelector('.cart-items');
  cartItemsContainer.innerHTML = '';
  let totalAmount = 0;
  let totalQuantity = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    cartCount.style.display = 'none';
    saveCartToLocalStorage(); // Save empty cart to local storage
    return;
  }

  cart.forEach((product) => {
    const productElement = document.createElement('div');
    productElement.classList.add('cart-item');
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="cart-item-image">
      <div class="cart-item-details">
        <h4 class="cart-item-title">${product.title}</h4>
        <p class="cart-item-price">₹${product.price.toFixed(2)}</p>
        <div class="cart-item-quantity-container">
          <label for="quantity-${product.title}">Quantity:</label>
          <input type="number" id="quantity-${product.title}" class="cart-item-quantity" value="${product.quantity}" min="1" max="50" data-product="${product.title}">
        </div>
      </div>
      <button class="remove-button" data-title="${product.title}">Remove</button>
    `;
    cartItemsContainer.appendChild(productElement);
    totalAmount += product.price * product.quantity;
    totalQuantity += product.quantity;
  });

  document.getElementById('cartTotalAmount').textContent = `₹${totalAmount.toFixed(2)}`;
  cartCount.textContent = totalQuantity;
  cartCount.style.display = 'inline-block';

  saveCartToLocalStorage(); // Save cart to local storage
}

/**
 * Saves the current cart to local storage.
 */
function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Loads the cart from local storage.
 */
function loadCartFromLocalStorage() {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cart = JSON.parse(storedCart);
  }
}

/**
 * Shows a notification with the given message.
 * @param {string} message - The message to display.
 */
function showNotification(message) {
  notificationMessage.textContent = message;
  notificationModal.style.display = 'block';
  document.body.classList.add('no-scroll'); // Prevent background interaction
}

/**
 * Toggles the visibility of the cart drawer and disables background scrolling.
 * @param {boolean} open - True to open, false to close.
 */
function toggleCartDrawer(open) {
  cartDrawer.classList.toggle('open', open);
  document.body.classList.toggle('no-scroll', open);
}

/**
 * Opens the image popup modal with the current image and disables background scrolling.
 */
function openImagePopup() {
  popupImage.src = currentProductImages[currentImageIndex];
  imagePopupModal.classList.add('open');
  document.body.classList.add('no-scroll');
}

/**
 * Closes the image popup modal and re-enables background scrolling.
 */
function closeImagePopup() {
  imagePopupModal.classList.remove('open');
  document.body.classList.remove('no-scroll');
}

/**
 * Handles adding a product to the cart.
 * @param {string} productId - The ID of the product to add.
 */
function addToCart(productId) {
  const productData = products[productId];
  const existingProduct = cart.find((item) => item.title === productData.title);
  if (existingProduct) {
    if (existingProduct.quantity < 50) {
      existingProduct.quantity++;
    } else {
      showNotification('Maximum quantity reached for this item (50).');
      return;
    }
  } else {
    cart.push({
      title: productData.title,
      price: productData.price,
      image: productData.images[0],
      quantity: 1,
    });
  }
  updateCart();
}

/**
 * Handles removing a product from the cart.
 * @param {string} title - The title of the product to remove.
 */
function removeFromCart(title) {
  cart = cart.filter((product) => product.title !== title);
  updateCart();
}

/**
 * Handles updating the quantity of a product in the cart.
 * @param {Event} event - The event triggered by changing the quantity input.
 */
function updateQuantity(event) {
  const productTitle = event.target.getAttribute('data-product');
  let newQuantity = parseInt(event.target.value, 10);
  if (isNaN(newQuantity) || newQuantity < 1) newQuantity = 1;
  if (newQuantity > 50) {
    newQuantity = 50;
    showNotification('Maximum quantity for this item is 50.');
  }
  const productInCart = cart.find((product) => product.title === productTitle);
  if (productInCart) {
    productInCart.quantity = newQuantity;
    updateCart();
  }
}

/**
 * Handles the 'Buy Now' functionality, redirecting to WhatsApp with a pre-filled message.
 * @param {string} productId - The ID of the product to buy.
 */
function placeOrderWhatsApp(productId) {
  const productData = products[productId];
  if (!productData) {
    showNotification('Product not found!');
    return;
  }
  const message = `Hello, I want to buy:\n\n${productData.title}\nPrice: ₹${productData.price.toFixed(2)}\n\nPlease provide further details.`;
  const whatsappNumber = '918858763010';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}

/**
 * Handles the checkout process for all items in the cart via WhatsApp.
 */
function checkoutCart() {
  if (cart.length === 0) {
    showNotification('Your cart is empty.');
    return;
  }
  let orderSummary = 'Order Summary:\n\n';
  cart.forEach((product) => {
    orderSummary += `${product.title} - ${product.quantity} x ₹${product.price.toFixed(2)}\n`;
  });
  orderSummary += `\nTotal: ₹${document.getElementById('cartTotalAmount').textContent.trim()}`;
  const whatsappNumber = '918858763010';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderSummary)}`;
  window.open(whatsappUrl, '_blank');
}

/**
 * Handles image slider navigation within the product cards.
 * @param {HTMLElement} button - The button clicked ('prev-button' or 'next-button').
 */
function handleImageSlider(button) {
  const productCard = button.closest('.product-card');
  const imageElement = productCard.querySelector('.product-image');
  const productId = button.getAttribute('data-product');
  const product = products[productId];
  let currentIndex = parseInt(imageElement.getAttribute('data-index'), 10);
  currentIndex = button.classList.contains('prev-button')
    ? (currentIndex - 1 + product.images.length) % product.images.length
    : (currentIndex + 1) % product.images.length;
  imageElement.src = product.images[currentIndex];
  imageElement.setAttribute('data-index', currentIndex);
}

/************************************
  EVENT LISTENERS
************************************/

// Event delegation for buttons and images
document.addEventListener('click', (event) => {
  const target = event.target;

  // Handle 'Add to Cart' button
  if (target.classList.contains('add-to-cart-button')) {
    const productId = target.getAttribute('data-product');
    addToCart(productId);
    return;
  }

  // Handle 'Buy Now' button
  if (target.classList.contains('buy-now-button')) {
    const productId = target.getAttribute('data-product');
    placeOrderWhatsApp(productId);
    return;
  }

  // Handle product image click for popup
  if (target.classList.contains('product-image')) {
    const productId = target.getAttribute('data-product');
    const product = products[productId];
    currentProductImages = product.images;
    currentImageIndex = parseInt(target.getAttribute('data-index'), 10);
    openImagePopup();
    return;
  }

  // Handle image slider buttons
  if (target.classList.contains('prev-button') || target.classList.contains('next-button')) {
    handleImageSlider(target);
    return;
  }

  // Handle 'Remove' button in cart
  if (target.classList.contains('remove-button')) {
    const title = target.getAttribute('data-title');
    removeFromCart(title);
    return;
  }

  // Close notification modal when clicking outside content
  if (target === notificationModal) {
    notificationModal.style.display = 'none';
    document.body.classList.remove('no-scroll');
  }

  // Close image popup when clicking outside content
  if (target === imagePopupModal) {
    closeImagePopup();
  }
});

// Event listener for updating quantity in cart
document.addEventListener('input', (event) => {
  if (event.target.classList.contains('cart-item-quantity')) {
    updateQuantity(event);
  }
});

// Event listeners for cart drawer
cartButton.addEventListener('click', () => toggleCartDrawer(true));
closeButton.addEventListener('click', () => toggleCartDrawer(false));

// Event listener for checkout button
checkoutButton.addEventListener('click', checkoutCart);

// Event listeners for notification modal
closeNotification.addEventListener('click', () => {
  notificationModal.style.display = 'none';
  document.body.classList.remove('no-scroll');
});
notificationButton.addEventListener('click', () => {
  notificationModal.style.display = 'none';
  document.body.classList.remove('no-scroll');
});

// Event listeners for image popup modal
popupPrevButton.addEventListener('click', (event) => {
  event.stopPropagation();
  currentImageIndex = (currentImageIndex - 1 + currentProductImages.length) % currentProductImages.length;
  popupImage.src = currentProductImages[currentImageIndex];
});

popupNextButton.addEventListener('click', (event) => {
  event.stopPropagation();
  currentImageIndex = (currentImageIndex + 1) % currentProductImages.length;
  popupImage.src = currentProductImages[currentImageIndex];
});

closePopup.addEventListener('click', closeImagePopup);

popupImage.addEventListener('click', (event) => {
  event.stopPropagation();
});

imagePopupModal.addEventListener('click', closeImagePopup);

/************************************
  TOUCH GESTURES FOR POPUP
************************************/

// Add touch gestures for mobile devices
let touchStartX = 0;
let touchEndX = 0;

popupImage.addEventListener('touchstart', handleTouchStart, false);
popupImage.addEventListener('touchmove', handleTouchMove, false);
popupImage.addEventListener('touchend', handleTouchEnd, false);

function handleTouchStart(event) {
  touchStartX = event.changedTouches[0].screenX;
}

function handleTouchMove(event) {
  touchEndX = event.changedTouches[0].screenX;
}

function handleTouchEnd(event) {
  if (touchEndX < touchStartX - 50) {
    // Swipe left
    currentImageIndex = (currentImageIndex + 1) % currentProductImages.length;
    popupImage.src = currentProductImages[currentImageIndex];
  }
  if (touchEndX > touchStartX + 50) {
    // Swipe right
    currentImageIndex = (currentImageIndex - 1 + currentProductImages.length) % currentProductImages.length;
    popupImage.src = currentProductImages[currentImageIndex];
  }
}
