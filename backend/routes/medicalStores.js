const express = require('express');
const pool = require('../db');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

// Get all stores
router.get('/', authenticate, async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM Stores');
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
});

// Get store by ID
router.get('/:id', authenticate, async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM Stores WHERE store_id = $1', [id]);
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
});

// Create new store
router.post('/', authenticate, async (req, res, next) => {
    const { store_name, store_location } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Stores (store_name, store_location) VALUES ($1, $2) RETURNING *',
            [store_name, store_location]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
});

// Update store
router.put('/:id', authenticate, async (req, res, next) => {
    const { id } = req.params;
    const { store_name, store_location } = req.body;
    try {
        const result = await pool.query(
            'UPDATE Stores SET store_name = $1, store_location = $2 WHERE store_id = $3 RETURNING *',
            [store_name, store_location, id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
});

// Delete store
router.delete('/:id', authenticate, async (req, res, next) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM Stores WHERE store_id = $1', [id]);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

module.exports = router;
