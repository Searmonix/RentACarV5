function showDataById() {
    let id = sessionStorage.getItem('id');
    let tableType = sessionStorage.getItem('tableType');


    $.ajax({
        url: 'http://localhost:8080/api/'+tableType+'/'+id,
        type:'GET',
        dataType:'json',                          
        success: function(response){  
            //console.log(response);
            showDetailedView(response);      
        },
        error: function(response, xhr){
            alert("Error de petición");
        }
    })
}

function showDetailedView(data) {
    let tableContent = "";

    tableContent += "<thead><tr>"

    Object.keys(data).forEach(element => {
            tableContent+='<th>'+element+'</th>'
    });


    tableContent += "</thead></tr>";

    tableContent += "<tbody>";

    tableContent += "<tr>"; 

    Object.entries(data).forEach(([key, value], index) => {
        console.log(value);
        console.log(key);
        if (index < 1) {   
            tableContent +="<td>"+value+"</td>"
        } else if (key == 'gama') {  
            tableContent +=`<td> ${value.name} </td>`
        } else if (key == 'messages') {     
            tableContent +=`<td> ${value.messageText} </td>`
        } else if (key == 'reservations') {  
            tableContent +=`<td> ${value.status} </td>`
        } else if (key == 'cars') {
            tableContent += `<td>`
            value.forEach(element => {
                tableContent += `${element.name}`
            });
            tableContent += `<td>`
        } else if (key == 'car') {  
            tableContent +=`<td> ${value.name} </td>`
        } else if (key == 'client') {  
            tableContent +=`<td> ${value.name} </td>`
       } else if (key == 'score') {  
            console.log(value);
            tableContent +=`<td> ${value.stars} </td>`
        } else {    
            tableContent +="<td><input value=\""+value+"\"></td>"
        }  
    // if key == gama <td><input value=\""+element+"\"></td>

    });
    tableContent += "</tr>"

    tableContent += "</tbody>";

    $("#table").empty();                  
    $("#table").append(tableContent);

}

function elementToDeleted() {
    let id = sessionStorage.getItem('id');
    let tableType = sessionStorage.getItem('tableType');

    let elementToDelete = {
        'id': id
    }

    $.ajax({
        url: 'http://localhost:8080/api'+tableType,
        type:'DELETE',
        contentType:'application/json',  
        data: JSON.stringify(elementToDelete),     
        success: function(response){               
            alert("El contenido ha sido eliminado");
            location.href='index.html';      
        },
        error: function(response, xhr){
            alert("Error de petición");
        }
    })
}

function elementToUpdate() {
    
    let tableType = sessionStorage.getItem('tableType');

    let element = "";

    if (tableType == 'Car') {
        element = elementInCar();
    } else if (tableType == 'client') {
        element = elementInClient();
    } else if (tableType == 'gama') {
        element = elementInGama();
    } else if (tableType == 'message') {
        element = elementInMessage();
    } else if (tableType == 'reservation') {
        element = elementInReservation();
    } else {
        element = elementInScore();
    }

    $.ajax({
        url: 'http://localhost:8080/api/'+tableType,
        type:'PUT',
        contentType:'application/json',
        data: JSON.stringify(element),   
        success: function(response){               
            alert("El contenido ha sido actualizado");      
        },
        error: function(response, xhr){
            alert("Error de petición");
        }
    });
}

function elementInCar() {
    
    let entity = document.getElementById("table").rows.item(1).cells; 

    let element = {
        'id': entity.item(0).innerText,      
        'name': entity.item(1).children[0].value,
        'brand': entity.item(2).children[0].value,   
        'year': entity.item(3).children[0].value,
        'description': entity.item(4).children[0].value
    };
    
    return element;
}

function elementInClient() {
    
    
    let entity = document.getElementById("table").rows.item(1).cells;

    let element = {
        'id': entity.item(0).innerText,
        'email': entity.item(1).children[0].value,
        'password': entity.item(2).children[0].value,
        'name': entity.item(3).children[0].value,
        'age': entity.item(4).children[0].value
    };

    return element;
}

function elementInGama() {
    let entity = document.getElementById('table').rows.item(1).cells;

    let element = {
        'id': entity.item(0).innerText,
        'name': entity.item(1).children[0].value,
        'description': entity.item(2).children[0].value
    };

    return element;
}

function elementInMessage() {
    let entity = document.getElementById('table').rows.item(1).cells;

    let element = {
        'id': entity.item(0).innerText,
        'messageText': entity.item(1).children[0].value
    };

    return element;
}

function elementInReservation() {
    let entity = document.getElementById('table').rows.item(1).cells;

    let element = {
        'id': entity.item(0).innerText,
        'startDate': entity.item(1).children[0].value,
        'devolutionDate': entity.item(2).children[0].value,
        'status': entity.item(3).children[0].value
    };

    return element;
}

function elementInScore() {
    let entity = document.getElementById('table').rows.item(1).cells;

    let element = {
        'id': entity.item(0).innerText,
        'stars': entity.item(1).children[0].value,
        'messageText': entity.item(2).children[0].value
    };

    return element;
}