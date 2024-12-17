// Array to store cart items
let cart = [];

// Function to add item to the cart
function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice });
    updateCartDisplay();
}

// Function to update the cart display
function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('cart-total');
    
    cartContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        cartContainer.innerHTML += `
            <li>
                ${item.name} - $${item.price.toFixed(2)} 
                <button onclick="removeFromCart(${index})">Remove</button>
            </li>
        `;
        total += item.price;
    });

    totalContainer.innerText = `Total: $${total.toFixed(2)}`;
}

// Function to remove item from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

// PayPal payment button initialization
function initializePayPalButton() {
    paypal.Buttons({
        createOrder: function(data, actions) {
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
                alert(`Payment successful! Thank you, ${details.payer.name.given_name}`);
                cart = [];
                updateCartDisplay();
            });
        },
        onError: function(err) {
            console.error(err);
            alert('An error occurred during the payment process.');
        }
    }).render('#paypal-button-container');
}

// Initialize the PayPal button on page load
document.addEventListener('DOMContentLoaded', initializePayPalButton);

