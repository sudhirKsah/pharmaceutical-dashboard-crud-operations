const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const pool = require('./db');

const usersRoute = require('./routes/users');
const medicineRoutes = require('./routes/medicines');
const storeRoutes = require('./routes/medicalStores');
const inventoryRoutes = require('./routes/inventory');
const ordersRoutes = require('./routes/orders');
const suppliesRoutes = require('./routes/sales');

const app = express();

app.use(bodyParser.json());
// app.use(cors());
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173']
}));

// Check DB connection
pool.connect((err) => {
    if (err) {
        console.error('Database connection error:', err.message);
    } else {
        console.log('Database connected successfully.');
    }
});

app.use('/api/users', usersRoute);
app.use('/api/medicines', medicineRoutes);
app.use('/api/medicalstores', storeRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/supplies', suppliesRoutes);

app.use(errorHandler);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
