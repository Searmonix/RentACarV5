function getElements() {
    $.ajax({
        url: 'http://localhost:8080/api/Gama/all',
        type:'GET',
        dataType:'json',                           
        success: function(response){    
            console.log(response);           
            showData(response, 'name', 'Gama');   
        },
        error: function(response, xhr){
            alert("Error de petición");
        }
    });
}
function saveElement() {
    let elementToSend = {  
        'idGama': $("#idGama").val(),       
        'name': $("#name").val(),
        'description': $("#description").val()
    };

    $.ajax({
        url: 'http://localhost:8080/api/Gama/save',
        type:'POST',                             
        contentType:'application/json',         
        data: JSON.stringify(elementToSend),       

        success: function(response) {
            alert("La gama "+elementToSend.name+" se ha agregado con éxito");
            getElements();               
        },
        error: function(response, xhr){
            alert("Error de petición");
        }
    });    
    
}