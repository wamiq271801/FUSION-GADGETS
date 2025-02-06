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
        { 
            id: 1, 
            name: 'Realme wired Earphone', 
            price: 199 / conversionRate, 
            images: [
                'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/earphone.png',
                'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/earphones%202.png'
                'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/earphone%203.jpg'
                // Add more image URLs here
            ]
        },
        { 
            id: 2, 
            name: 'Microtek 700 watt inverter', 
            price: 3499 / conversionRate, 
            images: [
                'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/51I-YcUjLQL._SL1500_.jpg',
                'https://example.com/inverter2.jpg'
            ]
        },
        { 
            id: 2, 
            name: 'Microtek 700 watt inverter', 
            price: 3499 / conversionRate, 
            images: [
                'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/51I-YcUjLQL._SL1500_.jpg',
                'https://example.com/inverter2.jpg'
            ]
        },
        { 
            id: 2, 
            name: 'Microtek 700 watt inverter', 
            price: 3499 / conversionRate, 
            images: [
                'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/51I-YcUjLQL._SL1500_.jpg',
                'https://example.com/inverter2.jpg'
            ]
        },
        { 
            id: 2, 
            name: 'Microtek 700 watt inverter', 
            price: 3499 / conversionRate, 
            images: [
                'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/51I-YcUjLQL._SL1500_.jpg',
                'https://example.com/inverter2.jpg'
            ]
        },
        { 
            id: 2, 
            name: 'Microtek 700 watt inverter', 
            price: 3499 / conversionRate, 
            images: [
                'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/51I-YcUjLQL._SL1500_.jpg',
                'https://example.com/inverter2.jpg'
            ]
        },
        { 
            id: 2, 
            name: 'Microtek 700 watt inverter', 
            price: 3499 / conversionRate, 
            images: [
                'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/51I-YcUjLQL._SL1500_.jpg',
                'https://example.com/inverter2.jpg'
            ]
        },
        { 
            id: 2, 
            name: 'Microtek 700 watt inverter', 
            price: 3499 / conversionRate, 
            images: [
                'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/51I-YcUjLQL._SL1500_.jpg',
                'https://example.com/inverter2.jpg'
            ]
        },

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
                if (isNaN(quantity) || quantity < 1) {
                    alert('Please enter a valid quantity.');
                    return;
                }
                addToCart(product, quantity);
                quantityInput.value = 1;
            });

            // Product Modal with Image Carousel
            const modal = document.getElementById('product-modal');
            const modalContent = document.getElementById('modal-product-details');

            productItem.addEventListener('click', (event) => {
                if (!event.target.classList.contains('add-to-cart') && !event.target.classList.contains('quantity')) {
                    let currentIndex = 0;

                    modalContent.innerHTML = `
                        <h2>${product.name}</h2>
                        <div class="carousel">
                            <button id="prev-btn">❮</button>
                            <img id="product-image" src="${product.images[currentIndex]}" alt="${product.name}" style="max-width: 100%; margin-bottom: 20px;">
                            <button id="next-btn">❯</button>
                        </div>
                        <p>Price: ₹${priceInRupees.toFixed(2)}</p>
                        <p>Experience the future with the ${product.name}. Equipped with the latest technology to enhance your daily life.</p>
                    `;

                    modal.style.display = 'block';

                    // Handle image switching
                    const productImage = document.getElementById('product-image');
                    document.getElementById('prev-btn').addEventListener('click', () => {
                        currentIndex = (currentIndex === 0) ? product.images.length - 1 : currentIndex - 1;
                        productImage.src = product.images[currentIndex];
                    });

                    document.getElementById('next-btn').addEventListener('click', () => {
                        currentIndex = (currentIndex === product.images.length - 1) ? 0 : currentIndex + 1;
                        productImage.src = product.images[currentIndex];
                    });
                }
            });
        });
    }

    renderProducts(products);

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
