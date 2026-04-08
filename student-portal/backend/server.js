const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Load data
const dataPath = path.join(__dirname, 'data.json');
let students = [];

// Read data from JSON file
function loadData() {
    try {
        const data = fs.readFileSync(dataPath, 'utf8');
        students = JSON.parse(data);
    } catch (err) {
        console.error('Error reading data.json:', err);
        students = [];
    }
}

loadData();

// Routes
app.use('/api', require('./routes/api'));

// Serve frontend pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/about.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/services.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/contact.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/admin.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Student Portal Server running on http://localhost:${PORT}`);
});