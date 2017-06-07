const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'direct.gamr.co',
    port: 3306,
    user: 'root',
    password: '798140S@b1n@d@mz',
    database: 'gamr'
});

module.exports = connection;