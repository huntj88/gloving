function loadAndDisplaySets(params) {
    $.ajax({
        url: "../sort/sortIndex",
        type: "POST",
        data: params,
        success: function (data) {

            htmlString = "<table>";

            htmlString += "<tr style='color:orange'><td>name</td><td>chip</td><td>author</td><td>pattern</td><td>preview</td><td>color names</td></tr>"


            for (var i = 0; i < data.length; i++) {
                htmlString += "<tr>";
                htmlString += "<td>" + data[i].setName + "</td>";
                htmlString += "<td>" + data[i].chipName + "</td>";
                htmlString += "<td>" + data[i].username + "</td>";
                htmlString += "<td>" + data[i].patternName + "</td>";

                var hex = data[i].hexCodes.split(",");
                var brightness = data[i].brightnessLevels.split(",");
                var brightArray = ["", "H", "M", "L"];
                htmlString += "<td><table><tr>";
                for (var z = 0; z < hex.length; z++) {
                    htmlString += "<td><div class='colorSqaure' style='background:#" + hex[z] + "'>" + brightArray[brightness[z]] + "</div></td>";
                }
                htmlString += "</tr></table></td>";

                var colorNames = data[i].colorNames.split(",");

                htmlString += "<td><table><tr>";
                for (var z = 0; z < hex.length; z++) {
                    htmlString += "<td style='color: #" + hex[z] + "'>" + colorNames[z] + "</td>";
                    htmlString += "<td>|</td>";
                }
                htmlString += "</tr></table></td>";


                htmlString += "</tr>";
            }

            htmlString += "</table>";

            $("#gloveSetsDiv").html(htmlString);
        },
        error: function (jXHR, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}