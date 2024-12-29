// Function to fetch and display inventory items
function displayInventoryItems() {
    // Replace with your Android app's IP address and port
    const androidAppServerUrl = 'http://10.0.2.2:8080'; // IP and port

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
    // Retry the connection after a delay
    setTimeout(displayInventoryItems, 5000); // Retry after 5 seconds
  });
}

// Call the function to initially display the items
displayInventoryItems();
