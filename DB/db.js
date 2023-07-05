require('dotenv').config();
const mysql2 = require('mysql2');
const conn = mysql2.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    database : process.env.DB_NAME
});

module.exports = conn;
