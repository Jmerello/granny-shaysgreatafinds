// Function to fetch and display inventory items
function displayInventoryItems() {
    // Replace with your Android app's IP address and port
    const androidAppServerUrl = 'http://10.43.149.76:8080'; // Example - replace with your actual values

    fetch(androidAppServerUrl + '/inventory.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(items => {
            const inventoryItemsContainer = document.getElementById('inventory-items-container');
            inventoryItemsContainer.innerHTML = ''; // Clear previous items

            items.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('inventory-item');
                itemElement.innerHTML = `
                    <h3>${item.description}</h3>
                    <p>Price: $${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <img src="${item.photoPath}" alt="${item.description}"> 
                `;
                inventoryItemsContainer.appendChild(itemElement);
            });
        })
        .catch(error => {
            console.error('Error fetching or displaying inventory items:', error);
            // Handle the error, e.g., display an error message to the user
            const inventoryItemsContainer = document.getElementById('inventory-items-container');
            inventoryItemsContainer.innerHTML = '<p>Error loading inventory items. Please try again later.</p>';
        });
}

// Call the function to initially display the items
displayInventoryItems();
