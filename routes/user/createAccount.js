/**
 * Created by James on 11/10/2016.
 */
module.exports =
{

    createAccount: function(req, res){

        var bcrypt = require('bcryptjs');

        bcrypt.hash(req.body.password, 10, function(err, hash) {

            var baseChipQuery = "INSERT INTO users (username, password, email) VALUES (?,?,?)";
            var mysqlPool = require("../../utils/mysqlPool");
            mysqlPool.getConnection(function (err,connection) {
                connection.query(baseChipQuery,[req.body.username,hash,req.body.email],function (error,results,fields) {
                    if(error)
                    {
                        console.log("Error is in createAccount");
                        throw error;
                    }
                    else{

                        connection.release();
                        res.cookie('userID', results.insertId);
                        res.cookie('apiKey', hash.substring(35));
                        res.cookie('username', req.body.username);
                        res.send("yay!");
                    }
                });
            });

        });



        //console.log(colorArray);
        //console.log(name+" "+brightnessNum);

    }
};