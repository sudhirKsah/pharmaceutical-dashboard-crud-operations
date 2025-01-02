const express = require('express');
const pool = require('../db');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

// Get all orders
router.get('/', authenticate, async (req, res, next) => {
    try {
        const result = await pool.query(
            `SELECT o.order_id, ms.store_id, ms.store_name, m.medicine_id, m.medicine_name, o.quantity_ordered, o.order_date, o.order_status
            FROM Orders o 
            JOIN Stores ms on o.store_id = ms.store_id
            JOIN Medicines m on o.medicine_id = m.medicine_id`
        );
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
});

// Get an order by ID
router.get('/:id', authenticate, async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM Orders WHERE order_id = $1', [id]);
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
});

// Create a new order
router.post('/', authenticate, async (req, res, next) => {
    const { store_id, medicine_id, order_date, quantity_ordered, order_status } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO Orders 
            (store_id, medicine_id, order_date, quantity_ordered, order_status) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [store_id, medicine_id, order_date, quantity_ordered, order_status]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
});

// Update an order
router.put('/:id', authenticate, async (req, res, next) => {
    const { id } = req.params;
    const { store_id, medicine_id, order_date, quantity_ordered, order_status } = req.body;

    try {
        // Update the order
        const orderResult = await pool.query(
            `UPDATE Orders 
             SET store_id = $1, medicine_id = $2, order_date = $3, 
                 quantity_ordered = $4, order_status = $5 
             WHERE order_id = $6 RETURNING *`,
            [store_id, medicine_id, order_date, quantity_ordered, order_status, id]
        );

        const updatedOrder = orderResult.rows[0];

        // If the order is fulfilled, create a sale record and update inventory
        if (order_status === 'Fulfilled') {
            // Add a sale record to the Sales table
            await pool.query(
                `INSERT INTO Sales 
                 (order_id, sale_date, quantity_sold) 
                 VALUES ($1, $2, $3)`,
                [id, order_date, quantity_ordered]
            );

            // Deduct the quantity from inventory
            await pool.query(
                `UPDATE Inventory 
                 SET quantity_in_stock = quantity_in_stock - $1 
                 WHERE medicine_id = $2`,
                [quantity_ordered, medicine_id]
            );
        }

        res.status(200).json(updatedOrder);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// Delete an order
router.delete('/:id', authenticate, async (req, res, next) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM Orders WHERE order_id = $1', [id]);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

module.exports = router;
