// Function to fetch and display inventory items
function displayInventoryItems() {
    // Replace with your Android app's IP address and port
    const androidAppServerUrl = 'http://10.43.149.76:8080'; // Example - replace with your actual values

    fetch('/get-inventory')
    .then(response => response.json())
    .then(data => {
        // Process and display the data on the web page
        const inventoryContainer = document.getElementById('inventory-container');
        data.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `<h2>${item.description}</h2><p>Price: $${item.price}</p><p>Quantity: ${item.quantity}</p>`;
            inventoryContainer.appendChild(itemDiv);
        });
    })
    .catch(error => {
        console.error('Error fetching inventory data:', error);
    });
}

// Call the function to initially display the items
displayInventoryItems();
