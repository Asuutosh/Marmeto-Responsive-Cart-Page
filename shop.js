// At the beginning of the file
let availableProducts = [];

// Add this function to fetch products
async function fetchProducts() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        availableProducts = data.availableProducts;
        renderShopProducts();
    } catch (error) {
        console.error('Error fetching products:', error);
        showError('Failed to load products. Please try again later.');
    }
}

// Format price in Indian Rupees
function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price / 100);
}

// Render products in shop
function renderShopProducts() {
    const shopProductsContainer = document.getElementById('shop-products');
    shopProductsContainer.innerHTML = availableProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.title}">
            <div class="product-details">
                <h3>${product.title}</h3>
                <p>${product.product_description}</p>
                <div class="product-price">${formatPrice(product.price)}</div>
                <button onclick="addToCart(${product.id})" class="add-to-cart-btn">
                    Add to Cart <i class="fas fa-shopping-cart"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Add to cart function
function addToCart(productId) {
    const product = availableProducts.find(p => p.id === productId);
    if (product) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingItem = cartItems.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
            existingItem.line_price = existingItem.price * existingItem.quantity;
            existingItem.final_line_price = existingItem.line_price;
        } else {
            cartItems.push({
                ...product,
                quantity: 1,
                line_price: product.price,
                final_line_price: product.price
            });
        }
        
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartCount();
        showAddedToCartMessage(product.title);
    }
}

// Update cart count
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = totalItems;
}

// Show added to cart message
function showAddedToCartMessage(productTitle) {
    const message = document.createElement('div');
    message.className = 'added-to-cart-message';
    message.textContent = `${productTitle} added to cart!`;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 2000);
}

// Update the initialization
window.addEventListener('load', () => {
    fetchProducts();
    updateCartCount();
}); 