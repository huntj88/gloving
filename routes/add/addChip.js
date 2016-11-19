module.exports =
{

    addChip: function (req, res) {

        var baseChipQuery = "INSERT INTO chips (chipName, numColors,colorsPerMode, numPatterns, brightnessLevels,multiPattern) VALUES (?,?,?,?,?,?)";
        var mysqlPool = require("../../utils/mysqlPool");
        mysqlPool.getConnection(function (err, connection) {

            var multiPatternBoolean = 0;
            if (req.body.numMultiPatterns > 0) {
                multiPatternBoolean = 1;
            }


            var chipID;

            connection.beginTransaction(function (err) {
                if (err) {
                    throw err;
                }
                connection.query(baseChipQuery, [req.body.name, req.body.colorNumTotal, req.body.colorNum, req.body.numPatterns, req.body.brightnessNum, multiPatternBoolean], function (err, results) {
                    if (err) {
                        return connection.rollback(function () {
                            console.log("error 1");
                            console.log(err);
                            //throw err;
                            if (err) {
                                connection.release();
                                res.send("fail");
                            }
                        });
                    }


                    chipID = results.insertId;
                    var params = "";

                    var patternQuery = "INSERT INTO patternsOnChips (chipID,patternID) VALUES ";
                    params = "";
                    for (var i = 0; i < req.body.numPatterns; i++) {
                        params += "(" + chipID + "," + req.body.pattern[i] + "),"
                    }

                    params = params.substring(0, params.length - 1);

                    connection.query(patternQuery + params, [], function (err, results) {
                        if (err) {
                            return connection.rollback(function () {
                                console.log("error 3");
                                console.log(err);
                                if (err) {
                                    connection.release();
                                    res.send("fail");
                                }
                            });
                        }

                        if (multiPatternBoolean == 0) {
                            commitAddChip(res, connection);
                        } else {

                            var multiPatternQuery = "INSERT INTO multiPatternsOnChip (chipID,multiPatternID) VALUES ";
                            params = "";
                            for (var i = 0; i < req.body.numMultiPatterns; i++) {
                                params += "(" + chipID + "," + req.body.multiPattern[i] + "),"
                            }

                            params = params.substring(0, params.length - 1);

                            connection.query(multiPatternQuery + params, [], function (err, results) {
                                if (err) {
                                    return connection.rollback(function () {
                                        console.log("error 4");
                                        console.log(err);
                                        if (err) {
                                            connection.release();
                                            res.send("fail");
                                        }
                                    });
                                }

                                commitAddChip(res, connection);
                            });
                        }


                    });

                });
            });


        });

    }
};


function commitAddChip(res, connection) {
    connection.commit(function (err) {
        if (err) {
            return connection.rollback(function () {
                console.log("error 5");
                console.log(err);
            });
        }
        console.log('success!');
        connection.release();
        res.send("success");
    });
}