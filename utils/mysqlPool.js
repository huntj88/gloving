/**
 * Created by James on 11/9/2016.
 */
var mysql = require('mysql');
var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'gloving',
    password : 'eVekBqKOwLxLZn9i',
    database : 'gloving2'
});

module.exports =
{

    getConnection: function(callback) {
        pool.getConnection(function(err, conn) {
            if(err) {
                console.log("Error is in mysqlPool");
                return callback(err);
            }
            callback(err, conn);
        });
    }
};