function getElements() {
    $.ajax({
        url: 'http://localhost:8080/api/Score/all',
        type:'GET',
        dataType:'json',                           
        success: function(response){    
            console.log(response);           
            showData(response, 'stars', 'Score');   
        },
        error: function(response, xhr){
            alert("Error de petición");
        }
    });
}
function saveElement() {
    let elementToSend = {  
        'idScore': $("#idScore").val(),       
        'stars': $("#stars").val(),
        'messageText': $("#messageText").val()
    };

    $.ajax({
        url: 'http://localhost:8080/api/Score/save',
        type:'POST',                             
        contentType:'application/json',         
        data: JSON.stringify(elementToSend),       

        success: function(response) {
            alert("El puntaje "+elementToSend.stars+" ha sido guardado con éxito");
            getElements();               
        },
        error: function(response, xhr){
            alert("Error de petición");
        }
    });    
    
}