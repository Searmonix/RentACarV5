function showData(data, tableAtribute, tableType) { 
    let tableContent = ""; 
    tableContent += "<thead><tr><th>Contenido disponible</th></tr></thead>";

    tableContent += "<tbody>";

    for(let i=0; i < data.length; i++) {
        
        tableContent += "<tr>";

        tableContent += "<td><a href='#' onclick='sessionData("+data[i]['id'+tableType] +", \""+tableType+"\");'>"+data[i][tableAtribute]+"</a></td>"; 
        tableContent += "</tr>";

    }
    
    tableContent += "</tbody>";

    $("#table").empty();                    
    $("#table").append(tableContent);   

}

function sessionData(id, tableType) {
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('tableType', tableType);
    location.href="showData.html";
}