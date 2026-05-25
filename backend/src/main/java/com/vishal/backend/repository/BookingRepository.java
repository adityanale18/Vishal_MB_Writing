package com.vishal.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.vishal.backend.model.Booking;

public interface BookingRepository extends JpaRepository<Booking, Integer> {}
