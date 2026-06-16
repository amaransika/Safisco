// --- CART MANAGEMENT ---

// Function to get the cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('safiscoCart')) || [];
}

// Function to save the cart to localStorage
function saveCart(cart) {
    localStorage.setItem('safiscoCart', JSON.stringify(cart));
    updateCartIconCount();
}

// Function to add a product to the cart
function addToCart(productId, quantity = 1) {
    const cart = getCart();
    const product = productsData[productId];

    if (!product) {
        console.error("Product not found:", productId);
        return;
    }

    // Check if product already exists in cart
    const existingProductIndex = cart.findIndex(item => item.id === productId);

    if (existingProductIndex > -1) {
        // Update quantity
        cart[existingProductIndex].quantity += quantity;
    } else {
        // Add new product
        cart.push({ id: productId, quantity: quantity });
    }

    saveCart(cart);
    alert(`"${product.title}" has been added to your cart.`);
}

// Function to remove an item from the cart
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    // If on cart page, re-render the items
    if (document.body.id === 'cart-page') {
        displayCartItems();
    }
}

// Function to update item quantity
function updateQuantity(productId, quantity) {
    let cart = getCart();
    const productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex > -1) {
        if (quantity > 0) {
            cart[productIndex].quantity = quantity;
        } else {
            // If quantity is 0 or less, remove the item
            cart = cart.filter(item => item.id !== productId);
        }
        saveCart(cart);
        // If on cart page, re-render the items
        if (document.body.id === 'cart-page') {
            displayCartItems();
        }
    }
}


// Function to update the cart icon count in the navbar
function updateCartIconCount() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count-badge');

    if (cartCountElement) {
        cartCountElement.textContent = count;
        cartCountElement.style.display = count > 0 ? 'flex' : 'none';
    }
}

// Update the cart count on every page load
document.addEventListener('DOMContentLoaded', updateCartIconCount);