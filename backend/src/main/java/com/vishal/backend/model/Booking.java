package com.vishal.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Table(name = "bookings")
@AllArgsConstructor
@NoArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String email;
    private String phone;
    private String serviceName;
    private String message;
    private String status;
}
