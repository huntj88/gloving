module.exports =
{
    givePoint: function (req,res) {

        //console.log(req.body+" "+req.cookies.userID);

        var mysqlPool = require("../../utils/mysqlPool");
        mysqlPool.getConnection(function (err,connection) {
            connection.beginTransaction(function(err) {
                if (err) { throw err; }
                connection.query('INSERT INTO pointsGiven SET userID=?,setID=?', [req.cookies.userID,req.body.setID], function(err, result) {
                    if (err) {
                        return connection.rollback(function() {
                            console.log("error 1");
                            //throw err;
                            if(err)
                            {
                                connection.release();
                                res.send("fail");
                            }
                        });
                    }

                    connection.query('UPDATE sets SET setPoints=(SELECT setPoints+1 from (select * from sets where setID = ?) as blah) WHERE setID=?', [req.body.setID,req.body.setID], function(err, result) {
                        if (err) {
                            return connection.rollback(function() {
                                console.log("error 2");
                                throw err;
                            });
                        }
                        connection.commit(function(err) {
                            if (err) {
                                return connection.rollback(function() {
                                    console.log("error 3");
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
    }
};