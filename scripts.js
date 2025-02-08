// scripts.js

// Fetch product data from JSON
fetch('products.json')
  .then(response => response.json())
  .then(products => {
    const featuredProductsContainer = document.getElementById('featured-products');

    // Limit the number of products displayed in the carousel
    const carouselProducts = products.slice(0, 10); // Display first 10 products in the carousel
    const totalProducts = carouselProducts.length;

    carouselProducts.forEach((product, index) => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('featured-product');
      productDiv.setAttribute('data-index', index);
      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
      `;
      featuredProductsContainer.appendChild(productDiv);
    });

    // Initialize the carousel functionality
    initializeCarousel(totalProducts);
  })
  .catch(error => console.error('Error fetching the products:', error));

// Interactive Navigation Menu
document.addEventListener('DOMContentLoaded', () => {
  const menuItems = document.querySelectorAll('nav ul li a');
  menuItems.forEach(item => {
    item.addEventListener('mouseover', () => {
      item.style.color = '#00ffcc';
    });
    item.addEventListener('mouseout', () => {
      item.style.color = '#fff';
    });
  });
});

// Image Carousel for Featured Products
function initializeCarousel(totalProducts) {
  let currentIndex = 0;
  const featuredProducts = document.querySelectorAll('.featured-product');
  const nextButton = document.getElementById('next');
  const prevButton = document.getElementById('prev');

  // Hide all products except the first one
  featuredProducts.forEach((product, index) => {
    product.style.display = index === 0 ? 'block' : 'none';
  });

  nextButton.addEventListener('click', () => {
    featuredProducts[currentIndex].style.display = 'none';
    currentIndex = (currentIndex + 1) % totalProducts;
    featuredProducts[currentIndex].style.display = 'block';
  });

  prevButton.addEventListener('click', () => {
    featuredProducts[currentIndex].style.display = 'none';
    currentIndex = (currentIndex - 1 + totalProducts) % totalProducts;
    featuredProducts[currentIndex].style.display = 'block';
  });
}

// Smooth Scroll for Anchored Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetElement = document.querySelector(this.getAttribute('href'));
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Product
