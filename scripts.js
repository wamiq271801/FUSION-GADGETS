document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
    });

    // Product Data
    const products = [
        { id: 1, name: 'Realme wired Earphone', price: 199, image: 'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/earphone.png' },
        { id: 2, name: 'Microtek 700 watt inverter', price: 3499, image: 'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/51I-YcUjLQL._SL1500_.jpg' },
        { id: 3, name: 'Portable Lint Remover Reusable Clothes Fabric Shaver for Fabrics Furniture Blue | 1 Manual Lint Remover.', price: 199, image: 'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/81JesWfSLHL._AC_SL1500_.jpg' },
        { id: 4, name: 'Multifunctional Liquid Shoe Brush with Liquid Box, Adding Liquid Filled Brush with Soap Dispenser Press Type, Long Handle Shoe Cleaner Brush Cleaning with New Liquid Cartridge Pack of 1, Plastic', price: 249.99, image: 'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/WhatsApp%20Image%202025-01-24%20at%205.51.43%20PM%20(9).jpeg' },
        { id: 5, name: 'Smartwatch 10 Generation with 2.09 inch LCD TFT Display, Sleep Tracking, BP Monitor, Multi Sports Mode Bluetooth Calling, 10 Meter Connectivity Range, Wireless Charger, Splash Resistant (Black, 45mm)', price: 2499, image: 'https://github.com/wamiq271801/FUSION-GADGETS/blob/main/MXLJ3ref_VW_34FR+watch-case-42-aluminum-jetblack-nc-s10_VW_34FR+watch-face-42-aluminum-jetblack-s10_VW_34FR.jpeg?raw=true' },
    ];

    // Render Products
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item', 'fade-in');

        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <input type="number" class="quantity" value="1" min="1">
            <button class="add-to-cart">Add to Cart</button>
        `;
        productList.appendChild(productItem);

        // Add to Cart Functionality
        const addToCartButton = productItem.querySelector('.add-to-cart');
        const quantityInput = productItem.querySelector('.quantity');

        addToCartButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent modal from opening
            const quantity = parseInt(quantityInput.value);
            if (isNaN(quantity) || quantity < 1) {
                alert('Please enter a valid quantity.');
                return;
            }

            addToCart(product, quantity);
            quantityInput.value = 1; // Reset quantity
        });

        // Modal Functionality
        const modal = document.getElementById('product-modal');
        const modalContent = document.getElementById('modal-product-details');
        const closeModal = document.querySelector('.modal .close');

        productItem.addEventListener('click', (event) => {
            if (!event.target.classList.contains('add-to-cart') && !event.target.classList.contains('quantity')) {
                modalContent.innerHTML = `
                    <h2>${product.name}</h2>
                    <img src="${product.image}" alt="${product.name}" style="max-width: 100%; margin-bottom: 20px;">
                    <p>Price: $${product.price.toFixed(2)}</p>
                    <p>Experience the future with the ${product.name}. Equipped with the latest technology to enhance your daily life.</p>
                `;
                modal.style.display = 'block';
            }
        });

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Cart Management
    const cart = [];

    function addToCart(product, quantity) {
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
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            total += item.product.price * item.quantity;
            const cartItem = document.createElement('li');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                ${item.product.name} x ${item.quantity} - $${(item.product.price * item.quantity).toFixed(2)}
            `;
            cartItems.appendChild(cartItem);
        });

        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Search Functionality
    const searchInput = document.getElementById('search');
    const suggestions = document.getElementById('suggestions');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        suggestions.innerHTML = '';
        if (query) {
            const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
            filteredProducts.forEach(product => {
                const suggestionItem = document.createElement('div');
                suggestionItem.classList.add('suggestion-item');
                suggestionItem.textContent = product.name;
                suggestions.appendChild(suggestionItem);

                suggestionItem.addEventListener('click', () => {
                    searchInput.value = product.name;
                    suggestions.innerHTML = '';
                });
            });
        }
    });

    // Close suggestions when clicking outside
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.search-container')) {
            suggestions.innerHTML = '';
        }
    });

    // Scroll Animations
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});
