document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
        });
    }

    // USD to INR Conversion Rate
    const conversionRate = 83; // 1 USD = 83 INR

    // Product Data
    const products = [
        { id: 1, name: 'Realme wired Earphone', price: 199 / conversionRate, image: 'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/earphone.png' },
        { id: 2, name: 'Microtek 700 watt inverter', price: 3499 / conversionRate, image: 'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/51I-YcUjLQL._SL1500_.jpg' },
        { id: 3, name: 'Portable Lint Remover', price: 199 / conversionRate, image: 'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/81JesWfSLHL._AC_SL1500_.jpg' },
        { id: 4, name: 'Multifunctional Liquid Shoe Brush', price: 249.99 / conversionRate, image: 'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/WhatsApp%20Image%202025-01-24%20at%205.51.43%20PM%20(9).jpeg' },
        { id: 5, name: 'Smartwatch 10 Generation', price: 2499 / conversionRate, image: 'https://github.com/wamiq271801/FUSION-GADGETS/blob/main/MXLJ3ref_VW_34FR+watch-case-42-aluminum-jetblack-nc-s10_VW_34FR+watch-face-42-aluminum-jetblack-s10_VW_34FR.jpeg?raw=true' },
    ];

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

    // Scroll Animations
    const appearOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    // Render Products
    function renderProducts(productArray) {
        const productList = document.getElementById('product-list');
        if (!productList) return;

        productList.innerHTML = '';

        if (productArray.length === 0) {
            productList.innerHTML = '<p class="no-products">No products found.</p>';
            return;
        }

        productArray.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item', 'fade-in');
            const priceInRupees = product.price * conversionRate;

            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
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
                if (isNaN(quantity) || quantity < 1) {
                    alert('Please enter a valid quantity.');
                    return;
                }
                addToCart(product, quantity);
                quantityInput.value = 1;
            });

            // Product Modal
            const modal = document.getElementById('product-modal');
            const modalContent = document.getElementById('modal-product-details');
            productItem.addEventListener('click', (event) => {
                if (!event.target.classList.contains('add-to-cart') && !event.target.classList.contains('quantity')) {
                    modalContent.innerHTML = `
                        <h2>${product.name}</h2>
                        <img src="${product.image}" alt="${product.name}" style="max-width: 100%; margin-bottom: 20px;">
                        <p>Price: ₹${priceInRupees.toFixed(2)}</p>
                        <p>Experience the future with the ${product.name}. Equipped with the latest technology to enhance your daily life.</p>
                    `;
                    modal.style.display = 'block';
                }
            });
        });

        document.querySelectorAll('.fade-in').forEach(fader => {
            appearOnScroll.observe(fader);
        });
    }

    renderProducts(products);

    // Search Functionality with Debounce
    const searchInput = document.getElementById('search');
    let searchTimeout;

    function handleSearch() {
        const query = searchInput.value.toLowerCase().trim();
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            if (query) {
                renderProducts(products.filter(product => product.name.toLowerCase().includes(query)));
            } else {
                renderProducts(products);
            }
        }, 300);
    }

    searchInput.addEventListener('input', handleSearch);

    // Navbar Hide on Scroll
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector("header");

    window.addEventListener("scroll", () => {
        if (window.scrollY > lastScrollY && window.scrollY > 50) {
            navbar.classList.add("hidden");
        } else {
            navbar.classList.remove("hidden");
        }
        lastScrollY = window.scrollY;
    });

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
});
