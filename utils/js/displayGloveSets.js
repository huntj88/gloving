function bindButton(i,setID) {
    console.log(i);
    var button = $("#"+i);
   button.bind("click", function(){
        if(button.css("background-color")!="rgb(255, 165, 0)") {

            $.ajax({
                url: "../add/givePoint",
                type: "POST",
                data: "setID="+setID,
                success: function (point) {
                    console.log(point);
                    if(point=="success") {
                        button.text(parseInt(button.text()) + 1);
                        button.css("background-color", "orange");
                    }
                    else if(point=="fail")
                    {

                    }
                    else {
                        alert(point);
                    }
                },
                error: function (jXHR, textStatus, errorThrown) {
                    alert(errorThrown+" "+textStatus);
                }
            });
        }
        else {
            //remove point
        }

    });
}


function loadAndDisplaySets(params) {
    $.ajax({
        url: "../sort/sortIndex",
        type: "POST",
        data: params,
        success: function (data) {

            console.log(data);

            htmlString = "<table class='viewSetsTable'>";

            htmlString += "<tr style='color:orange'><td>points</td><td>name</td><td>chip</td><td>author</td><td>accelerometer</td><td>pattern</td><td>preview</td><td>color names</td></tr>"


            for (var i = 0; i < data.length; i++) {
                htmlString += "<tr>";
                console.log(data[i].pointed);
                if(data[i].pointed==null)
                    htmlString += "<td><button id='pointButton"+i+"'>" + data[i].setPoints + "</button></td>";
                else
                    htmlString += "<td><button style='background-color: orange' id='pointButton"+i+"'>" + data[i].setPoints + "</button></td>";
                htmlString += "<td>" + data[i].setName + "</td>";
                htmlString += "<td>" + data[i].chipName + "</td>";
                htmlString += "<td>" + "<form action='../user/viewAccount' method='POST'><input type='hidden' name='userID' value='"+data[i].userID+"' /><input type='hidden' name='username' value='"+data[i].username+"' /><a href='#' onclick='this.parentNode.submit()'>"+data[i].username+"</a></form>" + "</td>";

                //

                var multipatternText = ["","high sensitivity", "medium sensitivity","low sensitivity"];

                htmlString += "<td>"+data[i].multiPatternName+" "+multipatternText[data[i].multiPatternSensitivity]+"</td>";

                var colorIDs = data[i].colorIDs.split(",");
                console.log(colorIDs);
                var multiPatternSplitIndexs = [];

                for(var z = 0;z<colorIDs.length;z++)
                {
                    if(colorIDs[z]==0)
                    {
                        multiPatternSplitIndexs.push(z);
                    }
                }

                console.log(multiPatternSplitIndexs);

                var patternNames = data[i].patternNames.split(",");

                if(multiPatternSplitIndexs.length==0)
                    htmlString += "<td>" + patternNames[0] + "</td>";
                else {
                    htmlString += "<td><table><tr><td>" + patternNames[0] + "</td></tr><tr><td>" + patternNames[multiPatternSplitIndexs[0]+1] + "</td></tr></table></td>";
                }


                var hex = data[i].hexCodes.split(",");
                var brightness = data[i].brightnessLevels.split(",");
                var brightArray = ["", "H", "M", "L"];
                htmlString += "<td><table><tr>";
                for (var z = 0; z < hex.length; z++) {
                    if(z!=multiPatternSplitIndexs[0])
                        htmlString += "<td><div class='colorSqaure' style='background:#" + hex[z] + "'>" + brightArray[brightness[z]] + "</div></td>";
                    else
                        htmlString += "</tr><tr>";
                }
                htmlString += "</tr></table></td>";

                var colorNames = data[i].colorNames.split(",");

                htmlString += "<td><table><tr>";
                for (var z = 0; z < hex.length; z++) {
                    if(z!=multiPatternSplitIndexs[0]) {
                        htmlString += "<td style='color: #" + hex[z] + "'>" + colorNames[z] + "</td>";
                        htmlString += "<td>|</td>";
                    }
                    else
                        htmlString += "</tr><tr>";
                }
                htmlString += "</tr></table></td>";


                htmlString += "</tr>";
            }

            htmlString += "</table>";

            $("#gloveSetsDiv").html(htmlString);

            //$("tr:even").css("background-color", "#728aa0");

            //bindButton("pointButton1");
            for (i = 0; i < data.length; i++) {

                (function (i) {
                    bindButton("pointButton"+i,data[i].setID);
                }(i));


            }
        },
        error: function (jXHR, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}