package com.example.RentACarV3.Repository.CrudRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.RentACarV3.Model.Reservation;

import java.util.List;
import java.util.Date;

public interface ReservationCrudRepository extends CrudRepository<Reservation, Integer> {
   
    /* Traer todos las Reservaciones que hayan sido iniciadas despues de la fecha "a" 
    y que la fecha de retorno sea antes de la fecha "b" */
    // @Query("SELECT * FROM Reservation WHERE startDate AFTER a AND devolutionDate BEFORE b")

    /* Query Method: query builder, un mecanismo dentro de Spring Data para crear consultas con las entidades 
    del repositorio, todo lo que Reservation contenga, atributos, servicios,
    son conocidos como entidades del repositorio. 
    find ... By, define el sujeto de la consulta
    StartDateAfter, primer criterio que tiene la consulta
    DevolutionDateBefore, segundo criterio que tiene la consulta, concatenados por AND */
    public List<Reservation> findAllByStartDateAfterAndDevolutionDateBefore(Date a, Date b);

    // @Query("SELECT * FROM Reservation WHERE status ='completed/cancelled'")
    public List<Reservation> findAllByStatus(String status);

    // Cuántas veces un cliente aparece en los registros = Cuántas reservaciones en total hizo un cliente
    @Query("SELECT c.client, COUNT(c.client) FROM Reservation AS c GROUP BY c.client ORDER BY COUNT(c.client) DESC")
    /* Cada fila dentro de la tabla creada, es un objeto, por eso es necesaria una lista de objetos,
    arreglo, porque son múltiples objetos que vamos a mostrar*/ 
    // [total], [user1], [total], [user2]
    public List<Object[]> reservationsByClient();
}
