// Cart state
let cartItems = [];
let itemToRemove = null;
let availableProducts = [];

// DOM Elements
const cartItemsContainer = document.getElementById('cart-items-container');
const subtotalElement = document.getElementById('subtotal');
const totalElement = document.getElementById('total');
const loader = document.getElementById('loader');
const modal = document.getElementById('confirmation-modal');
const confirmRemoveBtn = document.getElementById('confirm-remove');
const cancelRemoveBtn = document.getElementById('cancel-remove');
const checkoutBtn = document.getElementById('checkout-btn');
const cartCountElement = document.querySelector('.cart-count');

// Available products data
const availableProductsData = [
    {
        id: 49839206859071,
        title: "Asgaard sofa",
        price: 25000000,
        image: "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/Asgaardsofa3.png?v=1728384481",
        product_description: "The Asgaard sofa offers unparalleled comfort and style with its sleek design and high-quality materials."
    },
    {
        id: 49839206859072,
        title: "Casaliving Wood Chair",
        price: 1299900,
        image: "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/chair.png",
        product_description: "Elegant wooden chair with comfortable cushioning and classic design."
    },
    {
        id: 49839206859073,
        title: "Modern Table Lamp",
        price: 499900,
        image: "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/lamp.png",
        product_description: "Contemporary table lamp with adjustable brightness and sleek design."
    }
];

// Format price in Indian Rupees
function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price / 100);
}

// Show loading spinner
function showLoader() {
    loader.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Hide loading spinner
function hideLoader() {
    loader.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Fetch cart data from API
async function fetchCartData() {
    try {
        showLoader();
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Failed to fetch cart data');
        }
        const data = await response.json();
        availableProducts = data.availableProducts;
        cartItems = data.items;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCart();
        updateCartCount();
    } catch (error) {
        console.error('Error fetching cart data:', error);
        showError('Failed to load cart data. Please try again later.');
    } finally {
        hideLoader();
    }
}

// Show error message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    cartItemsContainer.appendChild(errorDiv);
}

// Show available products when cart is empty
function showAvailableProducts() {
    cartItemsContainer.innerHTML = `
        <div class="empty-cart">
            <i class="fas fa-shopping-cart"></i>
            <p>Your cart is empty</p>
        </div>
        <div class="available-products">
            <h2>Available Products</h2>
            <div class="products-grid">
                ${availableProducts.map(product => `
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
                `).join('')}
            </div>
        </div>
    `;
}

// Add item to cart
function addToCart(productId) {
    const product = availableProducts.find(p => p.id === productId);
    if (product) {
        const cartItem = {
            ...product,
            quantity: 1,
            line_price: product.price,
            final_line_price: product.price
        };
        cartItems.push(cartItem);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCart();
        updateCartCount();
    }
}

// Render cart items
function renderCart() {
    cartItemsContainer.innerHTML = '';
    
    if (cartItems.length === 0) {
        showAvailableProducts();
        return;
    }
    
    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="product-info">
                <img src="${item.image}" alt="${item.title}">
                <div class="product-details">
                    <h3>${item.title}</h3>
                    <p>${item.product_description}</p>
                </div>
            </div>
            <div class="price">${formatPrice(item.price)}</div>
            <div class="quantity-control">
                <button class="quantity-btn minus" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">
                    <i class="fas fa-minus"></i>
                </button>
                <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                    onchange="updateQuantity(${item.id}, this.value)">
                <button class="quantity-btn plus" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            <div class="item-subtotal">${formatPrice(item.price * item.quantity)}</div>
            <button class="remove-item" onclick="showRemoveConfirmation(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    updateTotals();
}

// Update item quantity
function updateQuantity(itemId, newQuantity) {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
        const quantity = parseInt(newQuantity);
        if (quantity < 1) return;
        
        item.quantity = quantity;
        item.line_price = item.price * item.quantity;
        item.final_line_price = item.line_price;
        
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCart();
        updateCartCount();
    }
}

// Calculate and update totals
function updateTotals() {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal; // Add tax or shipping if needed

    subtotalElement.textContent = formatPrice(subtotal);
    totalElement.textContent = formatPrice(total);
}

// Update cart count in header
function updateCartCount() {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
}

// Show remove confirmation modal
function showRemoveConfirmation(itemId) {
    itemToRemove = itemId;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Remove item from cart
function removeItem() {
    cartItems = cartItems.filter(item => item.id !== itemToRemove);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCart();
    updateCartCount();
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event Listeners
confirmRemoveBtn.addEventListener('click', removeItem);
cancelRemoveBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

checkoutBtn.addEventListener('click', () => {
    if (cartItems.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Proceeding to checkout...');
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Initialize cart
window.addEventListener('load', () => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
        renderCart();
        updateCartCount();
    } else {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <a href="shop.html" class="continue-shopping">Go to Shop</a>
            </div>
        `;
    }
});

// Add some default items if cart is empty
function addDefaultItems() {
    const defaultItems = [
        {
            id: 49839206859071,
            quantity: 1,
            title: "Asgaard sofa",
            price: 25000000,
            line_price: 25000000,
            final_line_price: 25000000,
            image: "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/Asgaardsofa3.png?v=1728384481",
            product_description: "The Asgaard sofa offers unparalleled comfort and style with its sleek design and high-quality materials."
        },
        {
            id: 49839206859072,
            quantity: 1,
            title: "Casaliving Wood Chair",
            price: 1299900,
            line_price: 1299900,
            final_line_price: 1299900,
            image: "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/chair.png",
            product_description: "Elegant wooden chair with comfortable cushioning and classic design."
        },
        {
            id: 49839206859073,
            quantity: 1,
            title: "Modern Table Lamp",
            price: 499900,
            line_price: 499900,
            final_line_price: 499900,
            image: "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/lamp.png",
            product_description: "Contemporary table lamp with adjustable brightness and sleek design."
        }
    ];

    cartItems = defaultItems;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCart();
    updateCartCount();
}

// Add event listener for continue shopping button
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('continue-shopping')) {
        showAvailableProducts();
    }
}); 