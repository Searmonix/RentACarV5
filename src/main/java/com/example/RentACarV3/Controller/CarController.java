package com.example.RentACarV3.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;

import com.example.RentACarV3.Services.CarServices;
import com.example.RentACarV3.Model.Car;

@CrossOrigin(origins = "*", methods = {
    RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE
})
@RestController
@RequestMapping("/api/Car")
public class CarController {
    @Autowired
    private CarServices carServices;

    @GetMapping("/all")
    public List<Car> getAll() {
        return carServices.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Car> getCar(@PathVariable int id) {
        return carServices.getCar(id);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Car save(@RequestBody Car car) {
        return carServices.save(car);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Car update(@RequestBody Car car) {
        return carServices.update(car);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable int id) {
        return carServices.deleteCar(id);
    }
}
