package com.example.RentACarV3.Services;

import java.util.List;
import java.util.Optional;
import java.util.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.RentACarV3.Repository.ReservationRepository;
import com.example.RentACarV3.Model.Reservation;
import com.example.RentACarV3.Model.DTOs.StatusDTO;
import com.example.RentACarV3.Model.DTOs.ReservationsAndUserDTO;
import com.example.RentACarV3.Model.Client;

@Service
public class ReservationServices {
    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> getAll() {
        return reservationRepository.findAll();
    } 

    public Optional<Reservation> getReservation(int id) {
        return reservationRepository.getReservation(id);
    }

    public Reservation save (Reservation reservation) {
        if (reservation.getIdReservation() == null) {
            return reservationRepository.save(reservation);
        } else {
            Optional<Reservation> reservationOptional = getReservation(reservation.getIdReservation());
            if (reservationOptional.isEmpty()) {
                return reservationRepository.save(reservation);
            } else {
                return reservation;
            }
        }
    }

    public Reservation update(Reservation reservation) {
        if (reservation.getIdReservation() != null) {
            Optional<Reservation> reservationToUpdate = getReservation(reservation.getIdReservation());
            if (reservationToUpdate.isPresent()) {

                if (reservation.getStartDate() != null) {
                    reservationToUpdate.get().setStartDate(reservation.getStartDate());
                }

                if (reservation.getDevolutionDate() != null) {
                    reservationToUpdate.get().setDevolutionDate(reservation.getDevolutionDate());
                }

                if (reservation.getStatus() != null) {
                    reservationToUpdate.get().setStatus(reservation.getStatus());
                }

                reservationRepository.save(reservationToUpdate.get());
                return reservationToUpdate.get();

            } else {
                return reservation;
            }
        } else {
            return reservation;
        }
    }

    public boolean deleteReservation(int id) {
        boolean dataStatus = false;
        Optional<Reservation> elementToDelete = reservationRepository.getReservation(id);
        if (elementToDelete.isPresent()) {
            reservationRepository.delete(elementToDelete.get());
            dataStatus = true;
        }
        return dataStatus;
    }

    public List<Reservation> reservationPeriods(String fDate, String sDate) {

        // SimpleDataFormat, ayuda castear de text a Date y format Date a text
        // Las especificaciones de cómo aparecerá la fecha pueden ser agregadas, de otra manera, usará el locale
        SimpleDateFormat dateFrmt = new SimpleDateFormat("yyyy-MM-dd");     // 2023-05-22

        Date a = new Date();
        Date b = new Date();

        // Al castear, se pueden encontrar problemas, por lo que intentar primero es óptimo
        try {
            a = dateFrmt.parse(fDate);
            b = dateFrmt.parse(sDate);

        // ParseException se encarga de señalar que un error ha sido encontrado 
        } catch (ParseException exception) {
            exception.printStackTrace();
        }
        // .before() Método de Date, averiguar si una fecha ocurre antes que otra
        if (a.before(b)) {
            // reservationRepository tiene las funcionalidades del CRUD, por lo que toda función es heredada de ahí
            return reservationRepository.getReservationPeriods(a, b);
        } else {
            return new ArrayList<>();
        }
    }

    public StatusDTO getReservationStatus() {
        List<Reservation> completed = reservationRepository.getReservationsByStatus("completed");
        List<Reservation> cancelled = reservationRepository.getReservationsByStatus("cancelled");

        Long completedReservations = (long) completed.size();
        Long cancelledReservations = (long) cancelled.size();

        StatusDTO reporte = new StatusDTO(completedReservations, cancelledReservations);
        
        return reporte;
    }

    // ReservationsByClient
    public List<ReservationsAndUserDTO> getReservationsByClient() {
       
        /* Queremos que sea una lista de arreglos para filtrar por orden descendiente
         los usuarios y sus reservaciones {[total, user1], [total, user2], [total, user3], [total, user4]}*/
        /* Se inicializa vacía porque no tiene cómo obtener esos valores hasta que reservationsByClient sea ejecutada
        y con esos valores que obtenga, se crea una lista de arreglos con los atributos almacenados en el DTO*/
        List<ReservationsAndUserDTO> totalAndClient = new ArrayList<>();
        
        List<Object[]> reporte = reservationRepository.getReservationsByClient();


        for (Object[] i : reporte ) {
            totalAndClient.add(new ReservationsAndUserDTO((Long) i[1], (Client)i[0]));
        }

        return totalAndClient;
    }
}