// Product Data
const products = [
    {
        id: 1,
        name: 'Classic Black T-Shirt',
        category: 'men',
        price: 29.99,
        originalPrice: 49.99,
        image: 'image1.png.png',
        rating: 4.5,
        reviews: 128,
        description: 'A versatile classic black t-shirt perfect for any occasion. Made from 100% organic cotton for ultimate comfort.',
        badge: 'Sale'
    },
    {
        id: 2,
        name: 'White Summer Dress',
        category: 'women',
        price: 59.99,
        originalPrice: 89.99,
        image: 'whitesummerdress.png',
        rating: 4.8,
        reviews: 95,
        description: 'Beautiful white summer dress with elegant design. Perfect for beach outings and casual gatherings.',
        badge: 'Sale'
    },
    {
        id: 3,
        name: 'Blue Denim Jeans',
        category: 'men',
        price: 69.99,
        originalPrice: 99.99,
        image: 'blue denim jeans.png',
        rating: 4.6,
        reviews: 156,
        description: 'Premium quality denim jeans with a perfect fit. Durable and stylish for everyday wear.',
        badge: 'Sale'
    },
    {
        id: 4,
        name: 'Floral Print Blouse',
        category: 'women',
        price: 44.99,
        originalPrice: 64.99,
        image: 'image7.png',
        rating: 4.4,
        reviews: 87,
        description: 'Elegant floral print blouse with a comfortable fit. Great for casual and professional settings.',
        badge: 'New'
    },
    {
        id: 5,
        name: 'Leather Belt',
        category: 'accessories',
        price: 24.99,
        originalPrice: 39.99,
        image: 'image8.png',
        rating: 4.7,
        reviews: 203,
        description: 'Premium leather belt with an elegant buckle. Perfect accessory for any outfit.',
        badge: 'Sale'
    },
    {
        id: 6,
        name: 'Woolen Sweater',
        category: 'women',
        price: 54.99,
        originalPrice: 79.99,
        image: 'item1.png',
        rating: 4.5,
        reviews: 112,
        description: 'Cozy woolen sweater perfect for cold weather. Available in multiple colors.',
        badge: 'Sale'
    },
    {
        id: 7,
        name: 'Casual Polo Shirt',
        category: 'men',
        price: 39.99,
        originalPrice: 59.99,
        image: 'item2.png',
        rating: 4.3,
        reviews: 76,
        description: 'Classic polo shirt suitable for casual and semi-formal occasions.',
        badge: null
    },
    {
        id: 8,
        name: 'Sunglasses',
        category: 'accessories',
        price: 89.99,
        originalPrice: 149.99,
        image: 'item3.png',
        rating: 4.6,
        reviews: 234,
        description: 'UV-protected sunglasses with stylish frames. Perfect for sunny days.',
        badge: 'Sale'
    },
    {
        id: 9,
        name: 'Red Evening Gown',
        category: 'women',
        price: 129.99,
        originalPrice: 199.99,
        image: 'item4.png',
        rating: 4.9,
        reviews: 89,
        description: 'Stunning red evening gown perfect for special occasions and events.',
        badge: 'Sale'
    },
    {
        id: 10,
        name: 'Cotton Shorts',
        category: 'men',
        price: 34.99,
        originalPrice: 54.99,
        image: 'cotton shorts.png',
        rating: 4.4,
        reviews: 98,
        description: 'Comfortable cotton shorts ideal for summer and casual wear.',
        badge: 'Sale'
    },
    {
        id: 11,
        name: 'Handbag',
        category: 'accessories',
        price: 79.99,
        originalPrice: 129.99,
        image: 'handbag.png',
        rating: 4.7,
        reviews: 167,
        description: 'Stylish and spacious handbag for everyday use. Multiple compartments for organization.',
        badge: 'Sale'
    },
    {
        id: 12,
        name: 'Striped Shirt',
        category: 'men',
        price: 44.99,
        originalPrice: 69.99,
        image: 'strip shirt.png',
        rating: 4.5,
        reviews: 145,
        description: 'Classic striped shirt perfect for work or casual outings. Available in multiple colors.',
        badge: 'Sale'
    }
];

// Cart Data
let cart = [];
let currentFilter = 'all';
let currentProduct = null;
let shippingCost = 5.99;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    displayProducts('all');
    loadCartFromStorage();
    updateCartCount();
});

// Display Products
function displayProducts(filter = 'all') {
    currentFilter = filter;
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';

    let filteredProducts = products;
    if (filter !== 'all') {
        filteredProducts = products.filter(p => p.category === filter);
    }

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.onclick = () => openProductModal(product);

        const discountPercent = Math.round((1 - product.price / product.originalPrice) * 100);

        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-content">
                <p class="product-category">${product.category}</p>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
                    <span class="reviews">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="price">$${product.price.toFixed(2)}</span>
                    <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                    <span class="discount">-${discountPercent}%</span>
                </div>
                <div class="product-actions">
                    <button class="btn-add" onclick="quickAddToCart(event, ${product.id})">Add to Cart</button>
                    <button class="btn-wishlist" onclick="addToWishlist(event)">♥</button>
                </div>
            </div>
        `;

        productsGrid.appendChild(productCard);
    });

    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Filter Products
function filterProducts(category) {
    displayProducts(category);
}

// Quick Add to Cart
function quickAddToCart(event, productId) {
    event.stopPropagation();
    const product = products.find(p => p.id === productId);
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1,
            size: 'M',
            color: 'Black'
        });
    }
    
    updateCartCount();
    saveCartToStorage();
    showNotification('Product added to cart!');
}

// Open Product Modal
function openProductModal(product) {
    currentProduct = product;
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('product-main-image').src = product.image;
    document.getElementById('product-rating').textContent = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
    document.getElementById('product-reviews').textContent = product.reviews;
    document.getElementById('quantity-input').value = 1;
    
    document.getElementById('product-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Product Modal
function closeProductModal() {
    document.getElementById('product-modal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Quantity Controls
function increaseQuantity() {
    const input = document.getElementById('quantity-input');
    input.value = parseInt(input.value) + 1;
}

function decreaseQuantity() {
    const input = document.getElementById('quantity-input');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

// Add to Cart from Modal
function addToCart() {
    const quantity = parseInt(document.getElementById('quantity-input').value);
    const size = document.getElementById('size-select').value;
    const color = document.getElementById('color-select').value;

    const existingItem = cart.find(item => 
        item.id === currentProduct.id && 
        item.size === size && 
        item.color === color
    );

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...currentProduct,
            quantity: quantity,
            size: size,
            color: color
        });
    }

    updateCartCount();
    saveCartToStorage();
    showNotification('Product added to cart!');
    closeProductModal();
}

// Add to Wishlist
function addToWishlist(event) {
    event.stopPropagation();
    if (event.target.style.color === 'red') {
        event.target.style.color = 'black';
        showNotification('Removed from wishlist');
    } else {
        event.target.style.color = 'red';
        showNotification('Added to wishlist!');
    }
}

// Toggle Mobile Menu
function toggleMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navIcons = document.getElementById('nav-icons');

    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    navIcons.classList.toggle('active');
}

// Close menu when a link is clicked
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navIcons = document.getElementById('nav-icons');

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            navIcons.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const navbar = document.querySelector('.navbar');
        if (!navbar.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            navIcons.classList.remove('active');
        }
    });
});

// Open Cart
function openCart() {
    const cartModal = document.getElementById('cart-modal');
    const cartItemsDiv = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cartItemsDiv.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <small>Size: ${item.size}</small>
                    <small>Color: ${item.color}</small>
                    <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                </div>
                <div class="cart-item-actions">
                    <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
                    <span style="padding: 0.25rem 0.5rem;">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
            cartItemsDiv.appendChild(cartItem);
        });
    }
    
    updateCartSummary();
    cartModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Update Quantity
function updateQuantity(index, change) {
    const newQuantity = cart[index].quantity + change;
    if (newQuantity > 0) {
        cart[index].quantity = newQuantity;
    } else {
        cart.splice(index, 1);
    }
    updateCartCount();
    saveCartToStorage();
    openCart();
}

// Remove from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    saveCartToStorage();
    openCart();
}

// Update Cart Summary
function updateCartSummary() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const total = subtotal + (cart.length > 0 ? shippingCost : 0);
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = cart.length > 0 ? `$${shippingCost.toFixed(2)}` : '$0.00';
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Update Cart Count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

// Close Cart
function closeCart() {
    document.getElementById('cart-modal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Proceed to Checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    closeCart();
    document.getElementById('checkout-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Checkout
function closeCheckout() {
    document.getElementById('checkout-modal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Update Shipping
function updateShipping(cost) {
    shippingCost = cost;
    updateCartSummary();
}

// Complete Order
function completeOrder() {
    // Validate form
    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value.trim();
    const zip = document.getElementById('zip').value.trim();
    const cardnumber = document.getElementById('cardnumber').value.trim();
    const expiry = document.getElementById('expiry').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    if (!fullname || !email || !phone || !address || !city || !state || !zip || !cardnumber || !expiry || !cvv) {
        showNotification('Please fill in all fields');
        return;
    }

    // Generate order number
    const orderNumber = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // Show success modal
    document.getElementById('order-number').textContent = orderNumber;
    closeCheckout();
    document.getElementById('success-modal').classList.add('active');
    document.body.style.overflow = 'hidden';

    // Clear cart
    cart = [];
    updateCartCount();
    saveCartToStorage();
    clearCheckoutForm();
}

// Clear Checkout Form
function clearCheckoutForm() {
    document.getElementById('fullname').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('address').value = '';
    document.getElementById('city').value = '';
    document.getElementById('state').value = '';
    document.getElementById('zip').value = '';
    document.getElementById('cardnumber').value = '';
    document.getElementById('expiry').value = '';
    document.getElementById('cvv').value = '';
}

// Reset and Close
function resetAndClose() {
    document.getElementById('success-modal').classList.remove('active');
    document.body.style.overflow = 'auto';
    shippingCost = 5.99;
}

// Close Success Modal
function closeSuccess() {
    document.getElementById('success-modal').classList.remove('active');
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #2ecc71;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Subscribe to Newsletter
function subscribeNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    if (email) {
        showNotification('Successfully subscribed!');
        event.target.reset();
    }
}

// Local Storage
function saveCartToStorage() {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const saved = localStorage.getItem('shoppingCart');
    if (saved) {
        cart = JSON.parse(saved);
    }
}

// Close modals when clicking outside
window.onclick = function(event) {
    const cartModal = document.getElementById('cart-modal');
    const productModal = document.getElementById('product-modal');
    const checkoutModal = document.getElementById('checkout-modal');
    const successModal = document.getElementById('success-modal');

    if (event.target === cartModal) {
        cartModal.classList.remove('active');
    }
    if (event.target === productModal) {
        productModal.classList.remove('active');
    }
    if (event.target === checkoutModal) {
        checkoutModal.classList.remove('active');
    }
    if (event.target === successModal) {
        successModal.classList.remove('active');
    }
}

// Set active nav link
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

// Handle Escape key to close modals
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeProductModal();
        closeCart();
        closeCheckout();
        closeSuccess();
    }
});
