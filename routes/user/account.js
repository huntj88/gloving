/**
 * Created by James on 11/11/2016.
 */
module.exports =
{

    login: function (req, res) {

        var bcrypt = require('bcryptjs');

        queryString = "select userID, password from users WHERE username = ?";
        var mysqlPool = require("../../utils/mysqlPool");
        mysqlPool.getConnection(function (err, connection) {
            connection.query(queryString, [req.body.username], function (error, results, fields) {
                if (error) {
                    console.log("Error is in account-login");
                    throw error;
                }
                else {
                    connection.release();
                    console.log(results);
                    bcrypt.compare(req.body.password, results[0].password, function(err, hashRes) {
                    //bcrypt.compare(results.password, req.body.password, function(err, hashRes) {

                        console.log(err);
                        if(hashRes==true)
                        {
                            res.cookie('userID', results[0].userID);
                            res.cookie('apiKey', results[0].password.substring(35));
                            res.cookie('username', req.body.username);
                            res.send("<script>location.href = '../../';</script>");
                        }
                        else
                            res.send("invalid credentials");
                    });
                }
            });
        });

    }
};