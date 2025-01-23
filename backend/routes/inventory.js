const express = require('express');
const pool = require('../db');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authenticate, async (req, res, next) => {
    try {
        const query = `
            SELECT i.inventory_id, m.medicine_id, m.medicine_name, i.quantity_in_stock
            FROM Inventory i
            JOIN Medicines m ON i.medicine_id = m.medicine_id
        `;

        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
});


// Get inventory by ID
router.get('/:id', authenticate, async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM Inventory WHERE inventory_id = $1', [id]);
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
});

// Create new inventory entry
router.post('/', authenticate, async (req, res, next) => {
    const { medicine_id, quantity_in_stock } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Inventory (medicine_id, quantity_in_stock) VALUES ($1, $2) RETURNING *',
            [medicine_id, quantity_in_stock]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
});

// Update inventory
router.put('/:id', authenticate, async (req, res, next) => {
    const { id } = req.params;
    const { medicine_id, quantity_in_stock } = req.body;
    try {
        const result = await pool.query(
            'UPDATE Inventory SET medicine_id = $1, quantity_in_stock = $2 WHERE inventory_id = $3 RETURNING *',
            [medicine_id, quantity_in_stock, id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
});

// Delete inventory entry
router.delete('/:id', authenticate, async (req, res, next) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM Inventory WHERE inventory_id = $1', [id]);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

module.exports = router;
