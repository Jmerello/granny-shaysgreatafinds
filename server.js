const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());

app.post('/update-inventory', (req, res) => {
    const inventoryData = req.body;

    // Generate HTML content from inventory data
    const htmlContent = generateHtmlFromInventory(inventoryData);

    // Write the HTML content to inventory.html
    fs.writeFileSync('inventory.html', htmlContent);

    res.status(200).send('Inventory updated');
});

// Function to generate HTML from inventory data
function generateHtmlFromInventory(inventoryData) {
    let inventoryItemsHtml = '';
    inventoryData.forEach(item => {
        inventoryItemsHtml += '
            <div class="inventory-item">
                <h3>${item.description}</h3>
                <p>Price: $${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <img src="${item.photoPath}" alt="${item.description}"> 
            </div>
        ';
    });

    return '
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Inventory - Granny & Shay's Great Finds</title>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
            <header>
                <h1>Our Inventory</h1>
                <nav>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="inventory.html">Inventory</a></li>
                        <li><a href="contact_us.html">Contact Us</a></li>
                        <li><a href="cart.html">Cart</a></li>
                    </ul>
                </nav>
            </header>
        
            <main>
                <section id="inventory">
                    ${inventoryItemsHtml} 
                </section>
            </main>
        
            <footer>
                <p>&copy; 2024 Granny & Shay's Great Finds</p>
            </footer>
        
            <script src="script.js"></script>
        </body>
        </html>
    ';
}

// Start the server
const port = 3000; // Or any port you prefer
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
