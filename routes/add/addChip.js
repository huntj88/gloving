module.exports =
{

    addChip: function(req, res){

        var baseChipQuery = "INSERT INTO chips (chipName, numColors,colorsPerMode, numPatterns, brightnessLevels) VALUES (?,?,?,?,?)";
        var mysqlPool = require("../../utils/mysqlPool");
        mysqlPool.getConnection(function (err,connection) {
           connection.query(baseChipQuery,[req.body.name,req.body.colorNumTotal,req.body.colorNum,req.body.numPatterns,req.body.brightnessNum],function (error,results,fields) {
               if(error)
               {
                   console.log("Error is in addChip");
                   throw error;
               }
               else{

                   addColors(req,res,connection,results.insertId);
               }
           });
        });

        //console.log(colorArray);
        //console.log(name+" "+brightnessNum);

    }
};



function addColors(req,res,connection,insertID) {

    var colorAddQuery = "INSERT INTO colorsOnChip (chipID,colorID) VALUES ";

    var params = "";
    for(var i=0;i<req.body.colorNumTotal;i++)
    {
        params+="("+insertID+","+req.body.color[i]+"),"
    }

    params = params.substring(0, params.length-1);

    console.log(colorAddQuery+params);

    connection.query(colorAddQuery+params,[],function (error,results,fields) {
        if(error)
        {
            console.log("Error is in addChip");
            throw error;
        }
        else{
            console.log(params);
            res.send(params);
            connection.release();
        }
    });
}