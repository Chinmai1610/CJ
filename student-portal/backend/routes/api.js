const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dataPath = path.join(__dirname, '../data.json');

// Get all students
router.get('/students', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        res.json(data.students);
    } catch (err) {
        res.status(500).json({ error: 'Failed to load students' });
    }
});

// Add new student (Admin only)
router.post('/students', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        const newStudent = {
            id: Date.now(),
            ...req.body
        };
        data.students.push(newStudent);

        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add student' });
    }
});

// Login API
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    if (username === data.admin.username && password === data.admin.password) {
        res.json({ success: true, role: 'admin' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

module.exports = router;