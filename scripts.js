document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  let lastScrollY = window.scrollY;

  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        navbar.classList.add("shrink");
      } else {
        navbar.classList.remove("shrink");
      }
      lastScrollY = window.scrollY;
    });
  }

  // Dynamic color effect for branding
  const brand = document.querySelector(".nav-brand");
  if (brand) {
    const colors = ["#0ff", "#ff00ff", "#ff0", "#f00", "#00f"];
    let colorIndex = 0;
    setInterval(() => {
      brand.style.color = colors[colorIndex];
      brand.style.textShadow = `0 0 10px ${colors[colorIndex]}, 0 0 20px ${colors[colorIndex]}`;
      colorIndex = (colorIndex + 1) % colors.length;
    }, 2000);
  }

  // USD to INR Conversion Rate
  const conversionRate = 1;

  // Product Data
  const products = [
    {
      id: 1,
      name: "Realme Wired Earphone",
      price: 199,
      description: "High-quality wired earphones with noise isolation and premium sound.",
      images: [
        'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/earphone%200.png',
        'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/earphone%201.png',
        'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/earphone%202.png',
        'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/earphone%203.png',
        'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/earphone%204.png',
        'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/earphone%206.png',
        'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/earphone%207.png',
      ]
    },

    {
        id: 2,
        name: "Realme Wired Earphone",
        price: 199,
        description: "High-quality wired earphones with noise isolation and premium sound.",
        images: [
          'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/earphone%200.png',
          'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/earphone%201.png',
          'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/earphone%202.png',
          'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/earphone%203.png',
          'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/earphone%204.png',
          'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/earphone%206.png',
          'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/earphone%207.png',
        ]
    }

  ];

  // Cart Management
  const cart = [];

  function addToCart(product, quantity) {
    quantity = parseInt(quantity, 10);
    if (isNaN(quantity) || quantity < 1) {
      alert("Please enter a valid quantity.");
      return;
    }

    const existingProduct = cart.find(item => item.product.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }
    updateCart();
  }

  function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      const priceInRupees = item.product.price * conversionRate;
      total += priceInRupees * item.quantity;

      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <img src="${item.product.images[0]}" class="cart-item-image" alt="${item.product.name}">
        <span>${item.product.name} x ${item.quantity} - ₹${(priceInRupees * item.quantity).toFixed(2)}</span>
        <button class="remove-btn" data-index="${index}">REMOVE</button>
      `;
      cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = `Total: ₹${total.toFixed(2)}`;
  }

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-btn")) {
      const index = Number(event.target.getAttribute("data-index"));
      if (!isNaN(index) && index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        updateCart();
      }
    }
  });

  function renderProducts() {
    const productList = document.getElementById("product-list");
    if (!productList) return;

    productList.innerHTML = "";

    if (products.length === 0) {
      productList.innerHTML = '<p class="no-products">No products found.</p>';
      return;
    }

    products.forEach(product => {
      const productItem = document.createElement("div");
      productItem.classList.add("product-item");
      const priceInRupees = product.price * conversionRate;

      productItem.innerHTML = `
        <img src="${product.images[0]}" alt="${product.name}" class="product-image">
        <h3>${product.name}</h3>
        <p>₹${priceInRupees.toFixed(2)}</p>
        <input type="number" class="quantity" value="1" min="1">
        <button class="add-to-cart">Add to Cart</button>
      `;
      productList.appendChild(productItem);

      const addToCartButton = productItem.querySelector(".add-to-cart");
      const quantityInput = productItem.querySelector(".quantity");

      addToCartButton.addEventListener("click", (event) => {
        event.stopPropagation();
        const quantity = parseInt(quantityInput.value, 10);
        addToCart(product, quantity);
        quantityInput.value = 1;
      });

      productItem.addEventListener("click", (event) => {
        if (!event.target.classList.contains("add-to-cart") && !event.target.classList.contains("quantity")) {
          showProductModal(product);
        }
      });
    });
  }

  function showProductModal(product) {
    const modal = document.getElementById("product-modal");
    const modalContent = document.getElementById("modal-product-details");
    if (!modal || !modalContent) return;

    let currentIndex = 0;

    modalContent.innerHTML = `
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <div class="carousel">
        <button id="prev-btn">❮</button>
        <img id="product-image" src="${product.images[currentIndex]}" alt="${product.name}">
        <button id="next-btn">❯</button>
      </div>
      <p>Price: ₹${(product.price * conversionRate).toFixed(2)}</p>
    `;

    modal.style.display = "block";

    const productImage = document.getElementById("product-image");
    document.getElementById("prev-btn").addEventListener("click", () => {
      currentIndex = (currentIndex === 0) ? product.images.length - 1 : currentIndex - 1;
      productImage.src = product.images[currentIndex];
    });

    document.getElementById("next-btn").addEventListener("click", () => {
      currentIndex = (currentIndex === product.images.length - 1) ? 0 : currentIndex + 1;
      productImage.src = product.images[currentIndex];
    });
  }

  const modal = document.getElementById("product-modal");
  const closeModal = document.querySelector(".modal .close");

  if (modal && closeModal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  renderProducts();
});
