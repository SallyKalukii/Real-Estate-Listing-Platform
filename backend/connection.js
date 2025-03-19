const { Client } = require('pg');

// PostgreSQL client configuration
const client = new Client({
    host: "localhost",
    user: "postgres",       // Replace with your PostgreSQL username
    port: 5432,
    password: "root",       // Replace with your PostgreSQL password
    database: "smartdevice" // Replace with your database name
});

module.exports = client;
