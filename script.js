document.addEventListener('DOMContentLoaded', () => {
    loadCartItems();
    setupPayPalButton();
});

// Function to load cart items from localStorage and display them
function loadCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<li>Your cart is empty.</li>';
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)}
                <button onclick="removeItem(${index})">Remove</button>
            `;
            cartItemsContainer.appendChild(listItem);
        });
    }

    cartTotalElement.textContent = total.toFixed(2);
}

// Function to remove an item from the cart
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
}

// Function to set up PayPal checkout
function setupPayPalButton() {
    paypal.Buttons({
        createOrder: function(data, actions) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            let total = cart.reduce((sum, item) => sum + item.price, 0);

            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: total.toFixed(2)
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('Transaction completed by ' + details.payer.name.given_name);
                // Clear the cart after successful payment
                localStorage.removeItem('cart');
                loadCartItems();
            });
        },
        onError: function(err) {
            console.error('PayPal Checkout Error:', err);
            alert('An error occurred during the transaction. Please try again.');
        }
    }).render('#paypal-button-container');
}

