function displayInventoryItems() {
    fetch('/get-inventory')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const inventoryContainer = document.getElementById('inventory-container');
            if (data && data.length > 0) {
                data.forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.innerHTML = `<h2>${item.description}</h2><p>Price: $${item.price}</p><p>Quantity: ${item.quantity}</p>`;
                    inventoryContainer.appendChild(itemDiv);
                });
            } else {
                // Display a default message if no data is available
                const defaultMessage = document.createElement('p');
                defaultMessage.textContent = 'No inventory items found.';
                inventoryContainer.appendChild(defaultMessage);
            }
        })
        .catch(error => {
            console.error('Error fetching inventory data:', error);
            // Display an error message on the web page
            const errorDiv = document.createElement('div');
            errorDiv.textContent = 'Error loading inventory data. Please try again later.';
            document.body.appendChild(errorDiv); // Or append to a specific container
        });
}

displayInventoryItems();
