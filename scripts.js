document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
    });

    const productList = document.getElementById('product-list');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cart = [];

    const products = [
        { name: 'Product 1', price: 10 },
        { name: 'Product 2', price: 20 },
        { name: 'Product 3', price: 30 },
    ];

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `<h3>${product.name}</h3><p>$${product.price}</p><button class="add-to-cart">Add to Cart</button>`;
        productList.appendChild(productItem);

        const addToCartButton = productItem.querySelector('.add-to-cart');  // Corrected line

        addToCartButton.addEventListener('click', function() {
            cart.push(product); // Add the product object to the cart
            updateCart();
        });
    });

    function updateCart() {
        cartItems.innerHTML = ''; // Clear previous cart items
        let total = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.textContent = `${item.name} - $${item.price}`;
            cartItems.appendChild(cartItem);
            total += item.price;
        });

        cartTotal.textContent = `Total: $${total}`;
    }
});
