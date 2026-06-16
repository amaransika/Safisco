// --- WISHLIST MANAGEMENT ---

// Gets the wishlist from localStorage
function getWishlist() {
    return JSON.parse(localStorage.getItem('safiscoWishlist')) || [];
}

// Saves the wishlist to localStorage
function saveWishlist(wishlist) {
    localStorage.setItem('safiscoWishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    updateAllWishlistIcons();
}

// Adds or removes an item from the wishlist
function toggleWishlist(productId) {
    let wishlist = getWishlist();
    const productIndex = wishlist.indexOf(productId);
    const product = productsData[productId];

    if (productIndex > -1) {
        // Product is already in wishlist, so remove it
        wishlist.splice(productIndex, 1);
        console.log(`"${product.title}" removed from wishlist.`);
    } else {
        // Product is not in wishlist, so add it
        wishlist.push(productId);
        console.log(`"${product.title}" added to wishlist.`);
    }

    saveWishlist(wishlist);
}

// Updates the count on the navbar icon
function updateWishlistCount() {
    const wishlist = getWishlist();
    const countElement = document.getElementById('wishlist-count-badge');
    if (countElement) {
        countElement.textContent = wishlist.length;
        countElement.style.display = wishlist.length > 0 ? 'flex' : 'none';
    }
}

// Updates all heart icons on the page to show the correct state (solid or regular)
function updateAllWishlistIcons() {
    const wishlist = getWishlist();
    const allWishlistButtons = document.querySelectorAll('.wishlist-toggle-btn');

    allWishlistButtons.forEach(button => {
        const productId = button.dataset.productId;
        const icon = button.querySelector('i');
        if (wishlist.includes(productId)) {
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
            button.classList.add('active');
        } else {
            icon.classList.remove('fa-solid');
            icon.classList.add('fa-regular');
            button.classList.remove('active');
        }
    });
}

// Function to initialize all wishlist buttons on a page
function initializeWishlistButtons() {
    const wishlistButtons = document.querySelectorAll('.wishlist-toggle-btn');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Stop the link navigation if it's inside an <a>
            event.stopPropagation(); // Stop the event from bubbling up to the product link
            const productId = this.dataset.productId;
            toggleWishlist(productId);
        });
    });
}

// Run these functions when any page loads
document.addEventListener('DOMContentLoaded', () => {
    updateWishlistCount();
    updateAllWishlistIcons();
    initializeWishlistButtons();
});