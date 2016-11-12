/**
 * Created by James on 11/9/2016.
 */
module.exports =
{

    addColor: function(req, res, path){

        var queryString = "INSERT IGNORE INTO colors (colorName,hex) VALUES (?,?)";

        var mysqlPool = require("../../utils/mysqlPool");
        mysqlPool.getConnection(function (err,connection) {
            connection.query(queryString,[req.body.color,req.body.hex],function (error,results,fields) {
                if(error)
                {
                    console.log("Error is in addColor");
                    throw error;
                }
                else{

                    res.sendFile(path.join(__dirname+'/html/addColor.html'));
                }
                connection.release();
            });
        });

    },
    getAllAddedColors: function (req,res) {

        var queryString = "select * from colors";

        var mysqlPool = require("../../utils/mysqlPool");
        mysqlPool.getConnection(function (err,connection) {
            connection.query(queryString,[],function (error,results,fields) {
                if(error)
                {
                    console.log("Error is in addColor");
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