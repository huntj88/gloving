module.exports =
{

    sortIndex: function (req, res) {
        var mysqlPool = require("../../utils/mysqlPool");

        console.log(req.body);
        console.log(req.cookies);

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

        if(req.body.accountSortSelect==1)
        {
            subquery = "select distinct setID from pointsGiven"
        }


        if(needsAnd)
        {
            subquery+=whereClause;
        }

        var userID = req.cookies.userID;
        if(userID == undefined)
            userID=0;


        var queryString = "SELECT setID, userID, username, chipID, chipName, setName, setPoints,points.setID as pointed, unixTimeCreated, multiPatternName, multiPatternSensitivity,GROUP_CONCAT(setColors.patternID order by colorPosition) as patternIDs, GROUP_CONCAT(patternName order by colorPosition) as patternNames, GROUP_CONCAT(colorPosition order by colorPosition) as colorPositions, GROUP_CONCAT(colorID order by colorPosition) as colorIDs, GROUP_CONCAT(colorName order by colorPosition) as colorNames, GROUP_CONCAT(hex order by colorPosition) as hexCodes, GROUP_CONCAT(brightnessLevel order by colorPosition) as brightnessLevels from sets join setColors using(setID) join colors USING(colorID) join chips using(chipID) join users USING(userID) join patterns on setColors.patternID = patterns.patternID join multiPatternModifiers USING(multiPatternID) left join (select setID from pointsGiven where userID = ?)points USING(setID) where setID in ("+subquery+")";


        if(req.body.timeID==1) //all time
        {
            queryString+=" group by sets.setID order by setPoints desc";
        } else if(req.body.timeID==2)  //new
        {
            queryString+=" group by sets.setID order by sets.setID desc";
        } else if(req.body.timeID==0) //hot
        {
            //one week
            queryString+=" and UNIX_TIMESTAMP(now())-604800 < unixTimeCreated group by sets.setID order by setPoints desc";
        }

        console.log(queryString);

        mysqlPool.getConnection(function (err, connection) {
            connection.query(queryString, [userID],
                function (error, results, fields) {
                    if (error) {
                        console.log("error in sortIndex");
                        throw error;
                    } else {


                        res.send(results);
                    }
                    connection.release();
                });

        });
    }
};