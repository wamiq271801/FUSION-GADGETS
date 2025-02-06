/* General Styles */
body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    background: linear-gradient(135deg, #1f1c2c 0%, #928dab 100%); /* Gradient background */
    color: #fff;
    transition: background-color 0.3s, color 0.3s; /* Smooth transition for theme change */
}

body.dark-theme {
    background: linear-gradient(135deg, #000000 0%, #434343 100%); /* Dark gradient background */
    color: #fff;
}

header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background: rgba(0, 0, 0, 0.8); /* Semi-transparent background */
    color: #fff;
    transition: background-color 0.3s; /* Smooth transition for theme change */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow effect */
}

header .logo-container img {
    max-width: 100px;
}

header .search-container {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
}

header .search-container input[type="text"] {
    padding: 10px;
    width: 100%;
    max-width: 300px;
    margin-right: 10px;
    border: 2px solid #ddd;
    border-radius: 5px; /* Rounded corners */
    background-color: rgba(255, 255, 255, 0.1); /* Semi-transparent background */
    color: #fff;
    transition: border-color 0.3s, background-color 0.3s; /* Smooth transition for theme change */
}

header .theme-toggle {
    padding: 10px;
    background: linear-gradient(135deg, #00c6ff 0%, #0072ff 100%); /* Gradient button */
    border: none;
    cursor: pointer;
    border-radius: 5px; /* Rounded corners */
    transition: background-color 0.3s; /* Smooth transition for theme change */
}

header .theme-toggle:hover {
    background: linear-gradient(135deg, #0072ff 0%, #00c6ff 100%); /* Hover effect */
}

.center-text {
    text-align: center;
}

.product-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
    padding: 10px;
}

.product-list .product-item {
    border: 1px solid #444;
    padding: 10px;
    text-align: center;
    transition: transform 0.2s, background-color 0.3s; /* Smooth resizing and color change */
    background: linear-gradient(135deg, #292e49 0%, #536976 100%); /* Gradient background */
    border-radius: 8px; /* Rounded corners */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow effect */
}

.product-list .product-item:hover {
    transform: scale(1.05); /* Slightly enlarge the product on hover */
    background: linear-gradient(135deg, #536976 0%, #292e49 100%); /* Hover effect */
}

.product-item .add-to-cart {
    margin-top: 10px;
    padding: 10px;
    background: linear-gradient(135deg, #ff007a 0%, #ff1a8c 100%); /* Gradient button */
    border: none;
    cursor: pointer;
    border-radius: 5px; /* Rounded corners */
    color: #fff;
    transition: background-color 0.3s; /* Smooth transition */
}

.product-item .add-to-cart:hover {
    background: linear-gradient(135deg, #ff1a8c 0%, #ff007a 100%); /* Hover effect */
}

.modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);
    padding-top: 60px;
    transition: opacity 0.3s; /* Smooth transition for modal appearance */
}

.modal-content {
    background-color: #292e49;
    margin: 5% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    animation: modal-appear 0.3s; /* Animation for modal appearance */
    border-radius: 10px; /* Rounded corners for modal */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow effect */
}

.modal .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.modal .close:hover,
.modal .close:focus {
    color: white;
    text-decoration: none;
}

/* Keyframe Animation for Modal */
@keyframes modal-appear {
    from {opacity: 0;}
    to {opacity: 1;}
}

/* Responsive Styles */
@media (max-width: 600px) {
    header .logo-container, 
    header .search-container, 
    header .theme-toggle {
        width: 100%;
        text-align: center;
        margin-bottom: 10px;
    }

    .product-list {
        grid-template-columns: 1fr;
    }

    .product-list .product-item {
        font-size: 14px; /* Adjust font size for smaller screens */
        padding: 5px; /* Adjust padding for smaller screens */
    }
}
