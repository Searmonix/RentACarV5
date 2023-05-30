function getElements() {
    $.ajax({
        url: 'http://140.238.190.51:8080/api/Message/all',
        type:'GET',
        dataType:'json',                           
        success: function(response){    
            console.log(response);           
            showData(response, 'messageText', 'Message');   
        },
        error: function(response, xhr){
            alert("Error de petición");
        }
    });
}
function saveElement() {
    let elementToSend = {  
        'idMessage': $("#idMessage").val(),       
        'messageText': $("#messageText").val()
    };

    $.ajax({
        url: 'http://140.238.190.51:8080/api/Message/save',
        type:'POST',                             
        contentType:'application/json',         
        data: JSON.stringify(elementToSend),       

        success: function(response) {
            alert("El mensaje "+elementToSend.messageText+" ha sido guardado con éxito");
            getElements();               
        },
        error: function(response, xhr){
            alert("Error de petición");
        }
    });    
    
}