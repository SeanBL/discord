let mysql = require('mysql2');
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "red999",
    database: "mydb"
})

let db = con.emit(false, '');

module.exports = {
    database: db
}