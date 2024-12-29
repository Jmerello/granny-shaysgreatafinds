// Function to fetch and display inventory items
function displayInventoryItems() {
    // Replace with your Android app's IP address and port
    const androidAppServerUrl = 'http://192.168.1.100:8080'; // Example IP and port

    fetch(androidAppServerUrl + '/inventory.json') // Fetch data from Android app server
        .then(response => response.json())
        .then(items => {
            const inventoryItemsContainer = document.getElementById('inventory-items-container');
            inventoryItemsContainer.innerHTML = ''; // Clear previous items

            items.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('inventory-item'); // Add a class for styling
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
            console.error('Error fetching inventory items:', error);
            // Handle the error, e.g., display an error message to the user
        });
}

// Call the function to initially display the items
displayInventoryItems();
