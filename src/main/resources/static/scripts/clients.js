function getElements() {
    $.ajax({
        url: 'http://localhost:8080/api/Client/all',
        type:'GET',
        dataType:'json',                           
        success: function(response){    
            console.log(response);           
            showData(response, 'name', 'Client');   
        },
        error: function(response, xhr){
            alert("Error de petición");
        }
    });
}
function saveElement() {
    let elementToSend = {  
        'idClient': $("#idClient").val(),       
        'email': $("#email").val(),
        'password': $("#password").val(),
        'name': $("#name").val(),
        'age': $("#age").val()
    };

    $.ajax({
        url: 'http://localhost:8080/api/Client/save',
        type:'POST',                             
        contentType:'application/json',         
        data: JSON.stringify(elementToSend),       

        success: function(response) {
            alert("El cliente "+elementToSend.name+" se ha creado con éxito");
            getElements();               
        },
        error: function(response, xhr){
            alert("Error de petición");
        }
    });    
    
}