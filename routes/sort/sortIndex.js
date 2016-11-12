module.exports =
{

    sortIndex: function (req, res) {
        var mysqlPool = require("../../utils/mysqlPool");

        console.log(req.body);

        var whereClause = " WHERE ";
        var needsAnd = false;
        var chipSort = false;
        var colorSort = false;
        if(req.body.chipID!=undefined&&req.body.chipID!=0)
        {
            whereClause+="chipID="+req.body.chipID;
            needsAnd = true;
        }

        if(req.body.colorID!=undefined&&req.body.colorID!=0)
        {
            if(needsAnd==true)
            {
                whereClause+=" AND ";
            }
            whereClause+="colorID="+req.body.colorID;
            needsAnd = true;
        }

        if(req.body.userID!=undefined)
        {
            if(needsAnd==true)
            {
                whereClause+=" AND ";
            }
            whereClause+="userID="+req.body.userID;
            needsAnd = true;
        }

        var subquery = "SELECT distinct setID FROM sets join setColors using(setID)";


        if(needsAnd)
        {
            subquery+=whereClause;
        }

        var queryString = "SELECT setID, userID, username, patternID, patternName, chipID, chipName, setName, unixTimeCreated, GROUP_CONCAT(colorPosition order by colorPosition) as colorPositions, GROUP_CONCAT(colorID order by colorPosition) as colorIDs, GROUP_CONCAT(colorName order by colorPosition) as colorNames, GROUP_CONCAT(hex order by colorPosition) as hexCodes, GROUP_CONCAT(brightnessLevel order by colorPosition) as brightnessLevels from sets join setColors using(setID) join colors USING(colorID) join chips using(chipID) join users USING(userID) join patterns USING(patternID) where setID in ("+subquery+") group by setID";

        mysqlPool.getConnection(function (err, connection) {
            connection.query(queryString, [],
                function (error, results, fields) {
                    if (error) {
                        console.log("error in sortIndex");
                        throw error;
                    } else {

                        console.log(queryString);
                        res.send(results);
                    }
                    connection.release();
                });

        });
    }
};