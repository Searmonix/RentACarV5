function loadEvents() {
    getElements();
    selectGama();
}

function selectGama() {
    // Una función que llame las gamas existentes para poder mostrarlas sin la necesidad de un id
    $.ajax({
        url: 'http://localhost:8080/api/Gama/all',
        type:'GET',
        dataType:'json',                           
        success: function(response){    
            let optionContent = "";
            optionContent += "<option value='gama1'>--Seleccione una gama--</option>" 
            response.forEach(element => {
                optionContent += `<option value=${element.idGama}>${element.name}</option>`
                console.log(element.name)
            });
            $("#gamaSelect").empty();                  
            $("#gamaSelect").append(optionContent);            
        },
        error: function(response, xhr){
            alert("Error de petición");
        }

    });
}


function getElements() {
    $.ajax({
        url: 'http://localhost:8080/api/Car/all',
        type:'GET',
        dataType:'json',                           
        success: function(response){    
            console.log(response);           
            showData(response, 'brand', 'Car');   
        },
        error: function(response, xhr){
            alert("Error de petición");
        }
    });
}
function saveElement() {
    let elementToSend = {  
        'idCar': $("#idCar").val(),       
        'name': $("#name").val(),
        'brand': $("#brand").val(),
        'year': $("#year").val(),
        'description': $("#description").val(),
        'gama': {"idGama": +$("#gamaSelect").val()}
    };

    $.ajax({
        url: 'http://localhost:8080/api/Car/save',
        type:'POST',                             
        contentType:'application/json',         
        data: JSON.stringify(elementToSend),       

        success: function(response) {
            alert("El carro "+elementToSend.brand+" se ha agregado con éxito");
            getElements();               
        },
        error: function(response, xhr){
            alert("Error de petición");
        }
    });    
    
}