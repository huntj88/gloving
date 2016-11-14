/**
 * Created by James on 11/9/2016.
 */
module.exports =
{

    addSet: function (req, res) {

        var queryString = "INSERT INTO sets (userID,chipID,multiPatternID,setName,multiPatternSensitivity) VALUES (?,?,?,?,?)";

        var mysqlPool = require("../../utils/mysqlPool");

        var multiPatternID = 0;
        if (req.body.multiPatternID != undefined && req.body.multiPatternID != -1) {
            multiPatternID = req.body.multiPatternID;
        }

        var multiPatternSensitivity = 0;
        if (req.body.multiPatternSensitivity != undefined && multiPatternID != 0) {
            multiPatternSensitivity = req.body.multiPatternSensitivity;
        }

        mysqlPool.getConnection(function (err, connection) {

            connection.beginTransaction(function (err) {
                if (err) {
                    throw err;
                }
                connection.query(queryString, [req.cookies.userID, req.body.chipID, multiPatternID, req.body.setName, multiPatternSensitivity], function (err, results) {
                    if (err) {
                        return connection.rollback(function () {
                            console.log("error 1");
                            //throw err;
                            if (err) {
                                connection.release();
                                res.send("fail");
                            }
                        });
                    }

                    var setID = results.insertId;

                    var colorAddQuery = "INSERT INTO setColors (setID,colorPosition,colorID,patternID,brightnessLevel) VALUES ";

                    var params = "";
                    var count = 0;
                    var patternPosition = 0;
                    for (var i = 0; i <= req.body.colorID.length; i++) {
                        if (req.body.colorID[i] != -1 && req.body.colorID[i] != undefined) {
                            params += "(" + setID + "," + count + "," + req.body.colorID[i] + "," + req.body.patternID[patternPosition] + "," + req.body.tint[i] + "),"
                            count++;

                            if (req.body.colorID[i] == 0) {
                                patternPosition++;
                            }
                        }
                    }

                    params = params.substring(0, params.length - 1);

                    //console.log(colorAddQuery+params);

                    connection.query(colorAddQuery + params, [], function (err, results) {
                        if (err) {
                            return connection.rollback(function () {
                                console.log("error 2");
                                //throw err;
                                if (err) {
                                    connection.release();
                                    res.send("fail");
                                }
                            });
                        }

                        connection.commit(function (err) {
                            if (err) {
                                return connection.rollback(function () {
                                    console.log("error 4");
                                    throw err;
                                });
                            }
                            console.log('success!');
                            connection.release();
                            res.send("success");
                        });


                    });

                });
            });

        });

    },

    getAllAddedChips: function (req, res) {
        var queryString = "select * from chips";

        var mysqlPool = require("../../utils/mysqlPool");
        mysqlPool.getConnection(function (err, connection) {
            connection.query(queryString, [], function (error, results, fields) {
                if (error) {
                    console.log("Error is in addset-getAllAddedChips");
                    throw error;
                }
                else {

                    //res.send("done");
                    res.send(results);
                    connection.release();
                }
            });
        });
    },

    getAllColorsForChip: function (req, res) {

        var queryString = "select colorID, colorName, hex from colors join colorsOnChip using(colorID) where chipID = ?";

        var mysqlPool = require("../../utils/mysqlPool");
        mysqlPool.getConnection(function (err, connection) {
            connection.query(queryString, [req.body.chipID], function (error, results, fields) {
                if (error) {
                    console.log("Error is in addSet-getAllColorsForChip");
                    throw error;
                }
                else {

                    //res.send("done");
                    res.send(results);
                    connection.release();
                }
            });
        });
    },

    getAllPatternsForChip: function (req, res) {

        var queryString = "SELECT patternID,patternName FROM patternsOnChips join patterns USING(patternID) where chipID = ?";

        var mysqlPool = require("../../utils/mysqlPool");
        mysqlPool.getConnection(function (err, connection) {
            connection.query(queryString, [req.body.chipID], function (error, results, fields) {
                if (error) {
                    console.log("Error is in addset-getAllAddedPaterns");
                    throw error;
                }
                else {

                    //res.send("done");
                    res.send(results);
                    connection.release();
                }
            });
        });
    },


    getAllMultiPatternsForChip: function (req, res) {
        var queryString = "SELECT multiPatternID,multiPatternName FROM multiPatternsOnChip join multiPatternModifiers USING(multiPatternID) where chipID = ?";

        console.log(req.body);
        var mysqlPool = require("../../utils/mysqlPool");
        mysqlPool.getConnection(function (err, connection) {
            connection.query(queryString, [req.body.chipID], function (error, results, fields) {
                if (error) {
                    console.log("Error is in addset-getAllAddedPaterns");
                    throw error;
                }
                else {

                    //res.send("done");
                    res.send(results);
                    connection.release();
                }
            });
        });
    },

    getAllAddedPatterns: function (req, res) {

        var queryString = "select * from patterns";

        var mysqlPool = require("../../utils/mysqlPool");
        mysqlPool.getConnection(function (err, connection) {
            connection.query(queryString, [], function (error, results, fields) {
                if (error) {
                    console.log("Error is in addset-getAllAddedPaterns");
                    throw error;
                }
                else {

                    //res.send("done");
                    res.send(results);
                    connection.release();
                }
            });
        });
    },

    getAllAddedMultiPatterns: function (req, res) {

        var queryString = "select * from multiPatternModifiers";

        var mysqlPool = require("../../utils/mysqlPool");
        mysqlPool.getConnection(function (err, connection) {
            connection.query(queryString, [], function (error, results, fields) {
                if (error) {
                    console.log("Error is in addset-getAllAddedMultiPaterns");
                    throw error;
                }
                else {

                    //res.send("done");
                    res.send(results);
                    connection.release();
                }
            });
        });
    }
};