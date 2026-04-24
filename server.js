const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const PRODUCTS_FILE = path.join(__dirname, 'products.json');
const ORDERS_FILE = path.join(__dirname, 'orders.json');

// Ensure files exist
if (!fs.existsSync(PRODUCTS_FILE)) fs.writeFileSync(PRODUCTS_FILE, '[]');
if (!fs.existsSync(ORDERS_FILE)) fs.writeFileSync(ORDERS_FILE, '[]');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Get all products
app.get('/api/products', (req, res) => {
    fs.readFile(PRODUCTS_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading products');
        res.json(JSON.parse(data || '[]'));
    });
});

// Add a product
app.post('/api/products', (req, res) => {
    const newProduct = req.body;
    fs.readFile(PRODUCTS_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading products');
        const products = JSON.parse(data || '[]');
        products.unshift(newProduct);
        fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), (err) => {
            if (err) return res.status(500).send('Error saving product');
            res.status(201).json(newProduct);
        });
    });
});

// Delete a product
app.delete('/api/products/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile(PRODUCTS_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading products');
        let products = JSON.parse(data || '[]');
        products = products.filter(p => p.id !== id);
        fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), (err) => {
            if (err) return res.status(500).send('Error deleting product');
            res.status(200).send('Deleted');
        });
    });
});

// Get all orders
app.get('/api/orders', (req, res) => {
    fs.readFile(ORDERS_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading orders');
        res.json(JSON.parse(data || '[]'));
    });
});

// Create an order
app.post('/api/orders', (req, res) => {
    const newOrder = req.body;
    fs.readFile(ORDERS_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading orders');
        const orders = JSON.parse(data || '[]');
        orders.unshift(newOrder);
        fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), (err) => {
            if (err) return res.status(500).send('Error saving order');
            res.status(201).json(newOrder);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
