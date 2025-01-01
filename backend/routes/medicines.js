const express = require('express');
const pool = require('../db');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

// Get all medicines
router.get('/', authenticate, async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM Medicines');
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
});

// Get medicine by ID
router.get('/:id', authenticate, async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM Medicines WHERE medicine_id = $1', [id]);
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
});

// Create new medicine
router.post('/', authenticate, async (req, res, next) => {
    const { medicine_name, manufacture_date, expiry_date, price } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO Medicines (medicine_name, manufacture_date, expiry_date, price)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [medicine_name, manufacture_date, expiry_date, price]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
});

// Update medicine
router.put('/:id', authenticate, async (req, res, next) => {
    const { id } = req.params;
    const { medicine_name, manufacture_date, expiry_date, price } = req.body;
    try {
        const result = await pool.query(
            `UPDATE Medicines 
             SET medicine_name = $1, manufacture_date = $2, expiry_date = $3, price = $4
             WHERE medicine_id = $5 RETURNING *`,
            [medicine_name, manufacture_date, expiry_date, price, id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
});

// Delete medicine
router.delete('/:id', authenticate, async (req, res, next) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM Medicines WHERE medicine_id = $1', [id]);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

module.exports = router;
