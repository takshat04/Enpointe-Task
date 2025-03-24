const express = require('express');
const db = require('../config/db');

const router = express.Router();

// Get Transactions
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Accounts WHERE user_id = ?';
    db.query(query, [req.user.id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Deposit/Withdraw
router.post('/', (req, res) => {
    const { type, amount } = req.body;
    const query = 'INSERT INTO Accounts (user_id, transaction_type, amount, balance) VALUES (?, ?, ?, ?)';
    // Add logic to calculate new balance
    db.query(query, [req.user.id, type, amount, newBalance], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Transaction successful' });
    });
});

module.exports = router;