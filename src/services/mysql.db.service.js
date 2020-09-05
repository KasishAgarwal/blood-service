var mysql = require('mysql');

exports.dbConnection = async (req, res, next) => {
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'demo_db',
        port: 3306,
    });
    await con.connect((err) => {
        if (!err) {
            console.log("Connected the mysql database.");
        }
        else {
            console.log("Error connecting database demo_db.");
            console.log(err);
        }
    });
    return con;
};

exports.dbDisconnection = (con) => {
    if (con !== null && con !== undefined)
        con.end();
    console.log("DB Connection Ended.");
}

