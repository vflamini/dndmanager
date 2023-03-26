const mysql = require('mysql');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "dnd"
});

module.exports = db