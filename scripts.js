document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const cartItems = [];
    let cartCount = 0;

    const products = [
        { id: 1, name: 'Product 1', price: 20, image: 'images/product1.jpg', description: 'Description 1', category: 'Category A' },
        { id: 2, name: 'Product 2', price: 30, image: 'images/product2.jpg', description: 'Description 2', category: 'Category B' },
        { id: 3, name: 'Product 3', price: 40, image: 'images/product3.jpg', description: 'Description 3', category: 'Category A' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        { id: 4, name: 'Product 4', price: 50, image: 'images/product4.jpg', description: 'Description 4', category: 'Category B' },
        // Add more products here
    ];

    function displayProducts(productsToDisplay = products) {
        console.log('Displaying products:', productsToDisplay);  // Debugging line
        productList.innerHTML = '';
        productsToDisplay.forEach((product, index) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-item');
            productDiv.style.setProperty('--animation-order', index);
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <h3>${product.name}</h3>
                <p>Price: $${product.price.toFixed(2)}</p>
                <div class="quantity-selector">
                    <button class="decrement">-</button>
                    <input type="number" value="1" min="1" class="quantity-input">
                    <button class="increment">+</button>
                </div>
                <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
            `;
            productList.appendChild(productDiv);
        });

        // Add event listeners to increment and decrement buttons
        document.querySelectorAll('.increment').forEach(button => {
            button.addEventListener('click', (event) => {
                const quantityInput = event.target.previousElementSibling;
                quantityInput.value = parseInt(quantityInput.value) + 1;
                animateQuantityInput(quantityInput);
            });
        });

        document.querySelectorAll('.decrement').forEach(button => {
            button.addEventListener('click', (event) => {
                const quantityInput = event.target.nextElementSibling;
                if (parseInt(quantityInput.value) > 1) {
                    quantityInput.value = parseInt(quantityInput.value) - 1;
                    animateQuantityInput(quantityInput);
                }
            });
        });
    }

    function animateQuantityInput(input) {
        input.classList.add('quantity-input-animated');
        input.addEventListener('animationend', () => {
            input.classList.remove('quantity-input-animated');
        }, { once: true });
    }

    function updateCart() {
        const cartContainer = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        cartContainer.innerHTML = '';
        let total = 0;

        cartItems.forEach(item => {
            total += item.price * item.quantity;
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <p>${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</p>
                <button class="remove-from-cart" data-product-id="${item.id}">Remove</button>
            `;
            cartContainer.appendChild(cartItemDiv);
        });

        cartTotal.innerHTML = `<p>Total: $${total.toFixed(2)}</p>`;
    }

    function filterProducts(event) {
        const searchTerm = event.target.value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    }

    function showModal(product) {
        const modal = document.getElementById('product-modal');
        const modalContent = document.getElementById('modal-product-details');
        modalContent.innerHTML = `
            <h2>${product.name}</h2>
            <img src="${product.image}" alt="${product.name}">
            <p>${product.description}</p>
            <p>Price: $${product.price.toFixed(2)}</p>
        `;
        modal.style.display = 'block';
    }

    function closeModal() {
        const modal = document.getElementById('product-modal');
        modal.style.display = 'none';
    }

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            const productId = parseInt(event.target.getAttribute('data-product-id'));
            const product = products.find(p => p.id === productId);
            const quantityInput = event.target.parentElement.querySelector('.quantity-input');
            const quantity = parseInt(quantityInput.value);

            const cartItem = cartItems.find(item => item.id === product.id);
            if (cartItem) {
                cartItem.quantity += quantity;
            } else {
                cartItems.push({ ...product, quantity: quantity });
            }

            cartCount += quantity;
            updateCart();

            // Add clicked class to change color
            event.target.classList.add('clicked');
            setTimeout(() => {
                event.target.classList.remove('clicked');
            }, 500); // Remove the class after 500ms for a smooth effect
        }

        if (event.target.classList.contains('remove-from-cart')) {
            const productId = parseInt(event.target.getAttribute('data-product-id'));
            const cartItemIndex = cartItems.findIndex(item => item.id === productId);

            if (cartItemIndex > -1) {
                cartCount -= cartItems[cartItemIndex].quantity;
                cartItems.splice(cartItemIndex, 1);
                updateCart();
            }
        }

        if (event.target.classList.contains('product-image')) {
            const productId = parseInt(event.target.parentElement.querySelector('.add-to-cart').getAttribute('data-product-id'));
            const product = products.find(p => p.id === productId);
            showModal(product);
        }

        if (event.target.classList.contains('close')) {
            closeModal();
        }
    });

    document.getElementById('search').addEventListener('input', filterProducts);

    displayProducts();
});

window.onclick = function(event) {
    const modal = document.getElementById('product-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

// Theme toggle functionality
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
