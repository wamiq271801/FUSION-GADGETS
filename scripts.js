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
  PRODUCT DATA (Add Up To 500)
************************************/
// Example structure for each product:
//  key: {
//    title: '...',
//    price: 999.99,
//    images: ['img1.jpg','img2.jpg', ...]
//  }
const products = {
  'quantum-headphones': {
    title: 'Quantum Headphones',
    price: 29999.99,
    images: [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/4in1%20Cable/4in1_Cable%20(1).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/AIRPODS_BLACK/Airpods_Black%20(1).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/AIRPODS_WHITE/Airpods_White%20(1).png',
    ]
  },
  'airpods-black': {
    title: 'AirPods Black',
    price: 19999.99,
    images: [
      'https://example.com/airpods-black1.png',
      'https://example.com/airpods-black2.png'
    ]
  },
  'airpimkadninkhite': {
    title: 'AirPimkadninkhite',
    price: 19999.99,
    images: [
      'https://example.com/airpimkadninkhite1.png',
      'https://example.com/airpimkadninkhite2.png'
    ]
  },
  'hololens-pro': {
    title: 'HoloLens Pro',
    price: 89999.99,
    images: [
      'https://example.com/product3-1.png',
      'https://example.com/product3-2.png',
      'https://example.com/product3-3.png'
    ]
  },
  'quanknjkb jbknnes': {
    title: 'Quantum Headphones',
    price: 29999.99,
    images: [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/4in1%20Cable/4in1_Cable%20(1).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/AIRPODS_BLACK/Airpods_Black%20(1).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/AIRPODS_WHITE/Airpods_White%20(1).png',
    ]
  },  'quantlihkbbjbjs': {
    title: 'Quantum Headphones',
    price: 29999.99,
    images: [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/4in1%20Cable/4in1_Cable%20(1).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/AIRPODS_BLACK/Airpods_Black%20(1).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/AIRPODS_WHITE/Airpods_White%20(1).png',
    ]
  },
  // Add more products here as needed...
  // You can go up to 500 products in the same format
};

/************************************
  GENERATE PRODUCT CARDS DYNAMICALLY
************************************/
Object.keys(products).forEach(productId => {
  const product = products[productId];

  // Create a .product-card div
  const productCard = document.createElement('div');
  productCard.classList.add('product-card');

  // Card HTML with image slider controls, product info, buttons
  productCard.innerHTML = `
    <div class="product-image-container">
      <button class="prev-button" data-product="${productId}">&lt;</button>
      <img 
        src="${product.images[0]}" 
        alt="${product.title}" 
        class="product-image" 
        data-product="${productId}" 
        data-index="0"
      >
      <button class="next-button" data-product="${productId}">&gt;</button>
    </div>
    <div class="product-content">
      <h3 class="product-title">${product.title}</h3>
      <p class="product-description">Discover the innovation behind ${product.title}.</p>
      <p class="product-price">₹${product.price.toFixed(2)}</p>
      <div class="product-buttons">
        <button class="button buy-now-button" data-product="${productId}">Buy Now</button>
        <button class="button add-to-cart-button" data-product="${productId}">Add to Cart</button>
      </div>
    </div>
  `;

  // Append to the .products-grid container
  productsContainer.appendChild(productCard);
});

/************************************
  IMAGE SLIDER (PREV/NEXT)
************************************/
document.addEventListener('click', (event) => {
  // Check if prev-button or next-button was clicked
  if (event.target.classList.contains('prev-button') || event.target.classList.contains('next-button')) {
    const button = event.target;
    // Find the closest product card
    const productCard = button.closest('.product-card');
    // Within that card, select the main image
    const imageElement = productCard.querySelector('.product-image');
    const productId = button.getAttribute('data-product');
    const product = products[productId];
    
    let currentIndex = parseInt(imageElement.getAttribute('data-index'));
    
    if (button.classList.contains('prev-button')) {
      currentIndex = (currentIndex - 1 + product.images.length) % product.images.length;
    } else {
      currentIndex = (currentIndex + 1) % product.images.length;
    }
    
    // Update the image src and data-index
    imageElement.src = product.images[currentIndex];
    imageElement.setAttribute('data-index', currentIndex);
  }
});

/************************************
  ADD TO CART
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
    existingProduct.quantity++;
  } else {
    // We'll store the first image in "image" so we can show it in the cart
    cart.push({
      title: productData.title,
      price: productData.price,
      images: productData.images,
      image: productData.images[0], 
      quantity: 1
    });
  }
  updateCart();
}

/************************************
  REMOVE FROM CART
************************************/
function removeFromCart(productTitle) {
  cart = cart.filter(item => item.title !== productTitle);
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
        <p class="cart-item-quantity">Quantity: ${product.quantity}</p>
      </div>
      <button class="remove-button" onclick="removeFromCart('${product.title}')">Remove</button>
    `;
    cartItemsContainer.appendChild(productElement);

    totalAmount += product.price * product.quantity;
    totalQuantity += product.quantity;
  });

  // Update total price & cart count
  document.getElementById('cartTotalAmount').textContent = `₹${totalAmount.toFixed(2)}`;
  cartCount.textContent = totalQuantity;

  // Show or hide the notification badge based on cart count
  if (totalQuantity > 0) {
    cartCount.style.display = 'inline-block'; // Show badge
  } else {
    cartCount.style.display = 'none'; // Hide badge
  }

  // If empty, show placeholder text
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
  }
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
    alert("Product not found!");
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
    alert("Your cart is empty.");
    return;
  }

  let orderSummary = `Order Summary:\n\n`;
  cart.forEach(product => {
    orderSummary += `${product.title} - ${product.quantity} x ₹${product.price.toFixed(2)}\n`;
  });
  orderSummary += `\nTotal: ₹${document.getElementById('cartTotalAmount').textContent}`;

  const whatsappUrl = `https://wa.me/918858763010?text=${encodeURIComponent(orderSummary)}`;
  window.open(whatsappUrl, '_blank');
});

/************************************
  CART DRAWER OPEN/CLOSE
************************************/
cartButton.addEventListener('click', () => {
  cartDrawer.classList.add('open');
});
closeButton.addEventListener('click', () => {
  cartDrawer.classList.remove('open');
});
