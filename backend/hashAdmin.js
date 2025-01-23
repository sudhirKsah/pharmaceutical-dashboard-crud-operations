const bcrypt = require('bcrypt');
const pool = require('./db');

(async () => {
    const email = 'admin@gmail.com'; 
    const password = 'Admin123'; 
    const phone_number = '123-456-7890';
    const saltRounds = 10;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await pool.query('BEGIN');
        const result = await pool.query(
            'INSERT INTO Admin (email, password, first_name, last_name, date_of_birth, street, city, state, pincode, admin_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
            [email, hashedPassword, 'Sudhir', 'Sah', '2004-12-22', '123 Admin St', 'Kachorwa', 'Madhesh Province', '123456', 1]
        );

        const adminId = result.rows[0].admin_id;

        console.log('Admin user created:', result.rows[0]);

        await pool.query(
            'INSERT INTO AdminPhones (admin_id, phone_number) VALUES ($1, $2)',
            [adminId, phone_number]
        );
        await pool.query('COMMIT');

        console.log('Admin phone added successfully!');
        process.exit(0);
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Error creating admin user or adding phone:', error);
        process.exit(1);
    }
})();
