document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", function () {
        if (window.scrollY > lastScrollY && window.scrollY > 50) {
            // Scrolling down - Minimize Navbar
            navbar.classList.add("shrink");
        } else {
            // Scrolling up - Expand Navbar
            navbar.classList.remove("shrink");
        }
        lastScrollY = window.scrollY;
    });

    // Dynamic color effect
    const brand = document.querySelector(".nav-brand");
    setInterval(() => {
        const colors = ["#0ff", "#ff00ff", "#ff0", "#f00", "#00f"];
        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        brand.style.color = randomColor;
        brand.style.textShadow = `0 0 10px ${randomColor}, 0 0 20px ${randomColor}`;
    }, 2000);
});


document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".arrow-left").addEventListener("click", () => {
        console.log("Left arrow clicked");
        // Add logic to navigate images left
    });

    document.querySelector(".arrow-right").addEventListener("click", () => {
        console.log("Right arrow clicked");
        // Add logic to navigate images right
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", function () {
            let item = this.parentElement; // Get the parent element (cart item)
            item.style.transition = "opacity 0.3s ease-out";
            item.style.opacity = "0"; // Fade out effect

            setTimeout(() => {
                item.remove(); // Remove after animation
            }, 300);
        });
    });
});



    // USD to INR Conversion Rate
    const conversionRate = 83;

    // Product Data (Fixed IDs & Removed Duplicates)
    const products = [
        { 
            id: 1, 
            name: 'Realme Wired Earphone', 
            price: 199 / conversionRate, 
            images: [
                'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/earphone%200.png',
                'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/earphone%201.png',
                'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/earphone%202.png',
                'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/earphone%203.png',
                'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/earphone%204.png',
                'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/earphone%205.png',
                'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/earphone%206.png',
            ]
        },
        { 
            id: 2, 
            name: 'Microtek 700 Watt Inverter', 
            price: 3499 / conversionRate, 
            images: [
                'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/51I-YcUjLQL._SL1500_.jpg',
                'https://example.com/inverter2.jpg'
            ]
        }
    ];

    // Cart Management
    const cart = [];

    function addToCart(product, quantity) {
        if (quantity < 1 || isNaN(quantity)) {
            alert('Please enter a valid quantity.');
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
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');

        if (!cartItems || !cartTotal) return;

        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const priceInRupees = item.product.price * conversionRate;
            total += priceInRupees * item.quantity;

            const cartItem = document.createElement('li');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                ${item.product.name} x ${item.quantity} - ₹${(priceInRupees * item.quantity).toFixed(2)}
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartItems.appendChild(cartItem);
        });

        cartTotal.textContent = `Total: ₹${total.toFixed(2)}`;

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', removeCartItem);
        });
    }

    function removeCartItem(event) {
        const index = Number(event.target.getAttribute('data-index'));
        if (!isNaN(index)) {
            cart.splice(index, 1);
            updateCart();
        }
    }

    // Render Products
    function renderProducts() {
        const productList = document.getElementById('product-list');
        if (!productList) return;

        productList.innerHTML = '';

        if (products.length === 0) {
            productList.innerHTML = '<p class="no-products">No products found.</p>';
            return;
        }

        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            const priceInRupees = product.price * conversionRate;

            productItem.innerHTML = `
                <img src="${product.images[0]}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>₹${priceInRupees.toFixed(2)}</p>
                <input type="number" class="quantity" value="1" min="1">
                <button class="add-to-cart">Add to Cart</button>
            `;
            productList.appendChild(productItem);

            const addToCartButton = productItem.querySelector('.add-to-cart');
            const quantityInput = productItem.querySelector('.quantity');

            addToCartButton.addEventListener('click', (event) => {
                event.stopPropagation();
                const quantity = parseInt(quantityInput.value);
                addToCart(product, quantity);
                quantityInput.value = 1;
            });

            // Product Modal
            productItem.addEventListener('click', (event) => {
                if (!event.target.classList.contains('add-to-cart') && !event.target.classList.contains('quantity')) {
                    showProductModal(product);
                }
            });
        });
    }

    // Product Modal
    function showProductModal(product) {
        const modal = document.getElementById('product-modal');
        const modalContent = document.getElementById('modal-product-details');
        let currentIndex = 0;

        modalContent.innerHTML = `
            <h2>${product.name}</h2>
            <div class="carousel">
                <button id="prev-btn">❮</button>
                <img id="product-image" src="${product.images[currentIndex]}" alt="${product.name}">
                <button id="next-btn">❯</button>
            </div>
            <p>Price: ₹${(product.price * conversionRate).toFixed(2)}</p>
            <p>Experience the future with the ${product.name}. Equipped with the latest technology to enhance your daily life.</p>
        `;

        modal.style.display = 'block';

        // Handle Image Switching
        const productImage = document.getElementById('product-image');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        prevBtn.removeEventListener('click', handlePrev);
        nextBtn.removeEventListener('click', handleNext);

        function handlePrev() {
            currentIndex = (currentIndex === 0) ? product.images.length - 1 : currentIndex - 1;
            productImage.src = product.images[currentIndex];
        }

        function handleNext() {
            currentIndex = (currentIndex === product.images.length - 1) ? 0 : currentIndex + 1;
            productImage.src = product.images[currentIndex];
        }

        prevBtn.addEventListener('click', handlePrev);
        nextBtn.addEventListener('click', handleNext);
    }

    renderProducts();

    // Close Modal
    const modal = document.getElementById('product-modal');
    const closeModal = document.querySelector('.modal .close');

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
