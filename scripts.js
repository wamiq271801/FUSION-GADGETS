document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Button
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
    });

    // Product List (Example Products)
    const productList = document.getElementById('product-list');
    const products = [
        { name: 'Product 1', price: '$10' },
        { name: 'Product 2', price: '$20' },
        { name: 'Product 3', price: '$30' },
    ];

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `<h3>${product.name}</h3><p>${product.price}</p>`;
        productList.appendChild(productItem);
    });

    // Modal Functionality
    const modal = document.getElementById('product-modal');
    const modalContent = document.getElementById('modal-product-details');
    const closeModal = document.querySelector('.modal .close');

    productList.addEventListener('click', function(event) {
        if (event.target.closest('.product-item')) {
            const productName = event.target.closest('.product-item').querySelector('h3').textContent;
            modalContent.innerHTML = `<h3>${productName}</h3><p>Details about ${productName}</p>`;
            modal.style.display = 'block';
        }
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
