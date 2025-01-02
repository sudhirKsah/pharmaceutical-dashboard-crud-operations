const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const router = express.Router();

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM Admin WHERE email = $1', [email]);
        const user = result.rows[0];
        if (!user) return res.status(401).json({ message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

        const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
