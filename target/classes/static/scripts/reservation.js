function loadEvents() {
    selectCar();
    selectClient();
    getElements();
}

function selectClient() {
    $.ajax({
        url: 'http://localhost:8080/api/Client/all',
        type:'GET',
        dataType:'json',                           
        success: function(response){    
            let optionContent = "";
            optionContent += "<option value='client1'>--Seleccione un cliente--</option>" 
            response.forEach(element => {
                optionContent += `<option value=${element.idClient}>${element.name}</option>`
                console.log(element.name)
            });
            $("#clientSelect").empty();                  
            $("#clientSelect").append(optionContent);            
        },
        error: function(response, xhr){
            alert("Error de petición");
        }

    });
}

function selectCar() {
    $.ajax({
        url: 'http://localhost:8080/api/Car/all',
        type:'GET',
        dataType:'json',                           
        success: function(response){    
            let optionContent = "";
            optionContent += "<option value='car1'>--Seleccione un carro--</option>" 
            response.forEach(element => {
                optionContent += `<option value=${element.idCar}>${element.name}</option>`
                console.log(element.name)
            });
            $("#carSelect").empty();                  
            $("#carSelect").append(optionContent);            
        },
        error: function(response, xhr){
            alert("Error de petición");
        }

    });
}
function getElements() {
    $.ajax({
        url: 'http://localhost:8080/api/Reservation/all',
        type:'GET',
        dataType:'json',                           
        success: function(response){    
            console.log(response);           
            showData(response, 'idReservation', 'Reservation');   
        },
        error: function(response, xhr){
            alert("Error de petición");
        }
    });
}
function saveElement() {
    let elementToSend = {  
        'idReservation': $("#idReservation").val(),       
        'startDate': $("#startDate").val(),
        'devolutionDate': $("#devolutionDate").val(),
        'client': {'idClient': +$("#clientSelect").val()},
        'car': {'idCar': +$("#carSelect").val()}
    };

    $.ajax({
        url: 'http://localhost:8080/api/Reservation/save',
        type:'POST',                             
        contentType:'application/json',         
        data: JSON.stringify(elementToSend),       

        success: function(response) {
            alert("La reservación "+elementToSend.idReservation+" se ha creado con éxito");
            getElements();               
        },
        error: function(response, xhr){
            alert("Error de petición");
        }
    });    
    
}