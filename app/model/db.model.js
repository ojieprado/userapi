const mysql = require('mysql');
const { DB_HOST, DB_USER, DB_PWD, DB_NAME } = process.env;
//local mysql db connection
const mysqlDb = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PWD,
    database: DB_NAME
});

mysqlDb.connect((err) => {
    if (err) {
        console.log('Error in connection');
        throw err;
    } else {
        console.log("Database Connected");
    }
});

module.exports = mysqlDb;