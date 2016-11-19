/**
 * Created by James on 11/9/2016.
 */
module.exports =
{
    /*getAllAddedColors: function (req,res) {

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
    },*/

    getAllAddedColorGroups: function (req, res) {

        var queryString = "select * from colorGroups";

        var mysqlPool = require("../../utils/mysqlPool");
        mysqlPool.getConnection(function (err, connection) {
            connection.query(queryString, [], function (error, results, fields) {
                if (error) {
                    console.log("Error is in addColor-getAllAddedColorGroups");
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

    addColorToChip: function(req, res, path){

        var colorAddQuery = "INSERT INTO colorsOnChip (chipID,colorGroupID,hex,colorName) VALUES ";

        var params = "";
        for (var i = 0; i < req.body.colorNumTotal; i++) {
            params += "(" + req.body.chipID + "," + req.body.colorGroup[i]+ ",\"" + req.body.hex[i] + "\",\"" + req.body.colorName[i] + "\"),"
        }

        params = params.substring(0, params.length - 1);

        console.log(colorAddQuery + params);

        var mysqlPool = require("../../utils/mysqlPool");
        mysqlPool.getConnection(function (err,connection) {

            connection.query(colorAddQuery + params, [], function (error, results, fields) {
                if (error) {
                    console.log("Error is in addChip");
                    throw error;
                }
                else {
                    console.log(params);
                    res.send("yay!!");
                    connection.release();
                }
            });
        });

}

};