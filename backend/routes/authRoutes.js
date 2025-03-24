const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // 1. Find user by email
        const [users] = await db.promise().query(
            'SELECT * FROM Users WHERE email = ?', 
            [email]
        );
        
        if (users.length === 0) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid credentials' 
            });
        }

        const user = users[0];
        
        // 2. Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid credentials' 
            });
        }

        // 3. Successful login
        res.json({ 
            success: true,
            message: 'Login successful',
            accessToken: 'your-generated-token', // Generate real token here
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ 
            success: false,
            message: 'Server error' 
        });
    }
});