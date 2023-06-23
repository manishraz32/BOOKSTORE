const mysql = require("mysql");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: "bookstore"
});

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("db connected");
    }
});

module.exports = connection;