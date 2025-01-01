const express = require('express');
const pool = require('../db');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

// Get all supplies
router.get('/', authenticate, async (req, res, next) => {
    try {
        const result = await pool.query(
            `SELECT s.sale_id, s.quantity_sold, s.sale_date, m.medicine_name, 
            st.store_name, st.store_location
            FROM Sales s
            JOIN Orders o ON s.order_id = o.order_id
            JOIN Medicines m ON o.medicine_id = m.medicine_id
            JOIN Stores st ON o.store_id = st.store_id`

        );

        res.json(result.rows);
    } catch (error) {
        next(error);
    }
});


// Get supply by ID
// router.get('/:id', authenticate, async (req, res, next) => {
//     const { id } = req.params;
//     try {
//         const result = await pool.query('SELECT * FROM Supplies WHERE supply_id = $1', [id]);
//         res.json(result.rows[0]);
//     } catch (error) {
//         next(error);
//     }
// });

// Create a new supply record
// router.post('/', authenticate, async (req, res, next) => {
//     const { medicine_id, store_id, quantity_supplied, supply_date } = req.body;
//     try {
//         const result = await pool.query(
//             `INSERT INTO Supplies 
//             (medicine_id, store_id, quantity_supplied, supply_date) 
//             VALUES ($1, $2, $3, $4) RETURNING *`,
//             [medicine_id, store_id, quantity_supplied, supply_date]
//         );
//         res.status(201).json(result.rows[0]);
//     } catch (error) {
//         next(error);
//     }
// });

// Update a supply record
// router.put('/:id', authenticate, async (req, res, next) => {
//     const { id } = req.params;
//     const { medicine_id, store_id, quantity_supplied, supply_date } = req.body;
//     try {
//         const result = await pool.query(
//             `UPDATE Supplies 
//             SET medicine_id = $1, store_id = $2, quantity_supplied = $3, supply_date = $4 
//             WHERE supply_id = $5 RETURNING *`,
//             [medicine_id, store_id, quantity_supplied, supply_date, id]
//         );
//         res.json(result.rows[0]);
//     } catch (error) {
//         next(error);
//     }
// });

// Delete a supply record
router.delete('/:id', authenticate, async (req, res, next) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM Sales WHERE sale_id = $1', [id]);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

module.exports = router;
