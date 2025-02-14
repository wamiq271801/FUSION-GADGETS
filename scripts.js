/************************************
  CART & PRODUCT FUNCTIONALITY
************************************/

// DOM ELEMENTS
const cartButton = document.querySelector('.cart-button');
const cartCount = document.getElementById('cart-count');
const cartDrawer = document.querySelector('.cart-drawer');
const closeButton = document.querySelector('.close-button');
const checkoutButton = document.querySelector('.checkout-button');
const productsContainer = document.querySelector('.products-grid');

// CART ARRAY
let cart = [];

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
  GENERATE PRODUCT CARDS DYNAMICALLY
************************************/
Object.keys(products).forEach(productId => {
  const product = products[productId];

  const productCard = document.createElement('div');
  productCard.classList.add('product-card');

  productCard.innerHTML = `
    <div class="product-image-container">
      <button class="prev-button" data-product="${productId}">&lt;</button>
      <img src="${product.images[0]}" alt="${product.title}" class="product-image" data-product="${productId}" data-index="0">
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
});

/************************************
  IMAGE SLIDER (PREV/NEXT)
************************************/
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('prev-button') || event.target.classList.contains('next-button')) {
    handleImageSlider(event.target);
  }
});

function handleImageSlider(button) {
  const productCard = button.closest('.product-card');
  const imageElement = productCard.querySelector('.product-image');
  const productId = button.getAttribute('data-product');
  const product = products[productId];
  let currentIndex = parseInt(imageElement.getAttribute('data-index'));
  currentIndex = button.classList.contains('prev-button') ?
    (currentIndex - 1 + product.images.length) % product.images.length :
    (currentIndex + 1) % product.images.length;
  imageElement.src = product.images[currentIndex];
  imageElement.setAttribute('data-index', currentIndex);
}

/************************************
  ADD TO CART (WITH QUANTITY UPDATE)
************************************/
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('add-to-cart-button')) {
    const productId = event.target.getAttribute('data-product');
    addToCart(productId);
  }
});

function addToCart(productId) {
  const productData = products[productId];
  const existingProduct = cart.find(item => item.title === productData.title);
  if (existingProduct) {
    if (existingProduct.quantity < 50) {
      existingProduct.quantity++;
    } else {
      showNotification("Maximum quantity reached for this item (50).");
      return;
    }
  } else {
    cart.push({
      title: productData.title,
      price: productData.price,
      image: productData.images[0],
      quantity: 1
    });
  }
  updateCart();
}

/************************************
  UPDATE CART (DISPLAY)
************************************/
function updateCart() {
  const cartItemsContainer = document.querySelector('.cart-items');
  cartItemsContainer.innerHTML = '';
  let totalAmount = 0;
  let totalQuantity = 0;

  cart.forEach(product => {
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
      <button class="remove-button" onclick="removeFromCart('${product.title}')">Remove</button>
    `;
    cartItemsContainer.appendChild(productElement);
    totalAmount += product.price * product.quantity;
    totalQuantity += product.quantity;
  });

  document.getElementById('cartTotalAmount').textContent = `₹${totalAmount.toFixed(2)}`;
  cartCount.textContent = totalQuantity;
  cartCount.style.display = totalQuantity > 0 ? 'inline-block' : 'none';
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
  }

  // Add event listeners to quantity inputs
  document.querySelectorAll('.cart-item-quantity').forEach(input => {
    input.addEventListener('change', updateQuantity);
  });
}

/************************************
  UPDATE QUANTITY IN CART
************************************/
function updateQuantity(event) {
  const productTitle = event.target.getAttribute('data-product');
  let newQuantity = parseInt(event.target.value);
  if (isNaN(newQuantity) || newQuantity < 1) newQuantity = 1;
  if (newQuantity > 50) {
    newQuantity = 50;
    showNotification("Maximum quantity for this item is 50.");
  }
  const productInCart = cart.find(product => product.title === productTitle);
  productInCart.quantity = newQuantity;
  updateCart();
}

/************************************
  REMOVE FROM CART
************************************/
function removeFromCart(title) {
  cart = cart.filter(product => product.title !== title);
  updateCart();
}


/************************************
  BUY NOW (WHATSAPP SINGLE PRODUCT)
************************************/
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('buy-now-button')) {
    const productId = event.target.getAttribute('data-product');
    placeOrderWhatsApp(productId);
  }
});

function placeOrderWhatsApp(productId) {
  const productData = products[productId];
  if (!productData) {
    showNotification("Product not found!");
    return;
  }
  // WhatsApp message for a single product
  let message = `Hello, I want to buy:\n\n${productData.title}\nPrice: ₹${productData.price.toFixed(2)}\n\nPlease provide further details.`;

  const whatsappNumber = "918858763010"; // Replace with your business number
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, '_blank');
}

/************************************
  CHECKOUT (WHATSAPP CART)
************************************/
checkoutButton.addEventListener('click', () => {
  if (cart.length === 0) {
    showNotification("Your cart is empty.");
    return;
  }

  let orderSummary = `Order Summary:\n\n`;
  cart.forEach(product => {
    orderSummary += `${product.title} - ${product.quantity} x ₹${product.price.toFixed(2)}\n`;
  });
  orderSummary += `\nTotal: ₹${document.getElementById('cartTotalAmount').textContent}`;

  const whatsappNumber = "918858763010"; // Replace with your business number
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderSummary)}`;
  window.open(whatsappUrl, '_blank');
});

/************************************
  CART DRAWER OPEN/CLOSE
************************************/
cartButton.addEventListener('click', () => {
  toggleCartDrawer(true);
});
closeButton.addEventListener('click', () => {
  toggleCartDrawer(false);
});

function toggleCartDrawer(open) {
  cartDrawer.classList.toggle('open', open);
}

/************************************
  NOTIFICATION MODAL
************************************/
function showNotification(message) {
  const modal = document.getElementById('notification-modal');
  const messageElement = modal.querySelector('.notification-message');
  messageElement.textContent = message;
  modal.style.display = 'block';
}

// Close notification when clicking on 'X' or 'OK' button
document.querySelector('.close-notification').addEventListener('click', () => {
  document.getElementById('notification-modal').style.display = 'none';
});

document.querySelector('.notification-button').addEventListener('click', () => {
  document.getElementById('notification-modal').style.display = 'none';
});

// Close notification when clicking outside the modal content
window.addEventListener('click', (event) => {
  const modal = document.getElementById('notification-modal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

/************************************
  READ MORE FEATURE
************************************/

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('read-more')) {
    event.preventDefault();
    const productId = event.target.getAttribute('data-product');
    const product = products[productId];
    showProductModal(product);
  }
});

/************************************
  PRODUCT MODAL FOR READ MORE
************************************/
function showProductModal(product) {
  // Create modal elements if not exists
  let modal = document.getElementById('product-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'product-modal';
    modal.classList.add('product-modal');
    modal.innerHTML = `
      <div class="product-modal-content">
        <span class="close-product-modal">&times;</span>
        <div class="product-modal-body">
          <img src="${product.images[0]}" alt="${product.title}" class="product-modal-image">
          <div class="product-modal-details">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p class="product-price">Price: ₹${product.price.toFixed(2)}</p>
            <div class="product-buttons">
              <button class="button buy-now-button" data-product="${productId}">Buy Now</button>
              <button class="button add-to-cart-button" data-product="${productId}">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Event listener to close the modal
    modal.querySelector('.close-product-modal').addEventListener('click', () => {
      modal.style.display = 'none';
    });

    // Close modal when clicking outside the content
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  } else {
    // Update modal content
    modal.querySelector('.product-modal-image').src = product.images[0];
    modal.querySelector('.product-modal-image').alt = product.title;
    modal.querySelector('.product-modal-details h3').textContent = product.title;
    modal.querySelector('.product-modal-details p').textContent = product.description;
    modal.querySelector('.product-price').textContent = `Price: ₹${product.price.toFixed(2)}`;
    // Update data-product attributes
    modal.querySelectorAll('.product-buttons button').forEach(button => {
      button.setAttribute('data-product', getProductIdByTitle(product.title));
    });
  }
  modal.style.display = 'block';
}

// Helper function to get product ID by title
function getProductIdByTitle(title) {
  return Object.keys(products).find(key => products[key].title === title);
}
