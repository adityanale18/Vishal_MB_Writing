package com.vishal.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.vishal.backend.model.Booking;
import com.vishal.backend.repository.BookingRepository;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private EmailService emailService;

    public Booking save(Booking booking) {
        Booking saved = bookingRepository.save(booking);
        try {
            emailService.sendBookingNotification(saved);
        } catch (Exception e) {
            System.err.println("Email send failed: " + e.getMessage());
        }
        return saved;
    }

    public List<Booking> getAll() {
        return bookingRepository.findAll();
    }

    public Booking updateStatus(Integer id, String status) {
        Booking booking = bookingRepository.findById(id).orElseThrow();
        booking.setStatus(status);
        return bookingRepository.save(booking);
    }
}
