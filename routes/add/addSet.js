/**
 * Created by James on 11/9/2016.
 */
module.exports =
{

    addSet: function(req, res){

        var queryString = "INSERT IGNORE INTO sets (userID,patternID,chipID,setName) VALUES (?,?,?,?)";

        var mysqlPool = require("../../utils/mysqlPool");
        mysqlPool.getConnection(function (err,connection) {
            connection.query(queryString,[req.cookies.userID,req.body.patternID,req.body.chipID,req.body.setName],function (error,results,fields) {
                if(error)
                {
                    console.log("Error is in addset");
                    throw error;
                }
                else{

                    var setID = results.insertId;

                    var colorAddQuery = "INSERT INTO setColors (setID,colorPosition,colorID,brightnessLevel) VALUES ";

                    var lastIndex = 0;
                    console.log(req.body.colorID.length);
                    for(var i = 0;i<req.body.colorID.length;i++)
                    {
                        if(req.body.colorID[i]!=0)
                            lastIndex = i;
                    }
                    console.log(lastIndex);

                    var params = "";
                    for(var i=0;i<=lastIndex;i++)
                    {
                        params+="("+setID+","+i+","+req.body.colorID[i]+","+req.body.tint[i]+"),"
                    }

                    params = params.substring(0, params.length-1);

                    connection.query(colorAddQuery+params,[],function (error,results,fields) {
                        if(error)
                        {
                            console.log("Error is in addSet");
                            throw error;
                        }
                        else{
                            console.log(params);
                            res.send("set added!");
                            connection.release();
                        }
                    });
                }
            });
        });

    },

    getAllAddedChips: function (req,res) {
        var queryString = "select * from chips";

        var mysqlPool = require("../../utils/mysqlPool");
        mysqlPool.getConnection(function (err,connection) {
            connection.query(queryString,[],function (error,results,fields) {
                if(error)
                {
                    console.log("Error is in addset-getAllAddedChips");
                    throw error;
                }
                else{

                    //res.send("done");
                    res.send(results);
                    connection.release();
                }
            });
        });
    },

    getAllColorsForChip: function (req,res) {

        var queryString = "select colorID, colorName, hex from colors join colorsOnChip using(colorID) where chipID = ?";

        var mysqlPool = require("../../utils/mysqlPool");
        mysqlPool.getConnection(function (err,connection) {
            connection.query(queryString,[req.body.chipID],function (error,results,fields) {
                if(error)
                {
                    console.log("Error is in addSet-getAllColorsForChip");
                    throw error;
                }
                else{

                    //res.send("done");
                    res.send(results);
                    connection.release();
                }
            });
        });
    },

    getAllPatternsForChip: function (req,res) {

        var queryString = "SELECT patternID,patternName FROM patternsOnChips join patterns USING(patternID) where chipID = ?";

        var mysqlPool = require("../../utils/mysqlPool");
        mysqlPool.getConnection(function (err,connection) {
            connection.query(queryString,[req.body.chipID],function (error,results,fields) {
                if(error)
                {
                    console.log("Error is in addset-getAllAddedPaterns");
                    throw error;
                }
                else{

                    //res.send("done");
                    res.send(results);
                    connection.release();
                }
            });
        });
    },

    getAllAddedPatterns: function (req,res) {

        var queryString = "select * from patterns";

        var mysqlPool = require("../../utils/mysqlPool");
        mysqlPool.getConnection(function (err,connection) {
            connection.query(queryString,[],function (error,results,fields) {
                if(error)
                {
                    console.log("Error is in addset-getAllAddedPaterns");
                    throw error;
                }
                else{

                    //res.send("done");
                    res.send(results);
                    connection.release();
                }
            });
        });
    }
};