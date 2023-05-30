package com.example.RentACarV3.Model.DTOs;

import com.example.RentACarV3.Model.Client;
/* 
Un DTO sirve para enviar en un formato JSON objetos que normalmente no están relacionados pero necesitamos
unir:
    - User:                                 UserDTO
        name                                    name
        password                                role
    - Role:
        name
En este caso, un cliente normalmente no tiene el número de reservas hechas, pero necesitamos enviar
Un arreglo de objetos que sea [total: ...., client: ... ] Creamos un DTO que contenga esos dos datos,
la cantidad de reservas y la información del cliente, nada más
 */
public class ReservationsAndUserDTO {
    
    private Long total;

    private Client client;

    public ReservationsAndUserDTO(Long total, Client client) {
        this.total = total;
        this.client = client;
    }

    public Long getTotal() {
        return total;
    }
    public void setTotal(Long total) {
        this.total = total;
    }

    public Client getClient() {
        return client;
    }
    public void setClient(Client client) {
        this.client = client;
    }
}