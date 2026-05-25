package com.vishal.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.vishal.backend.model.Booking;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${admin.email}")
    private String adminEmail;

    public void sendBookingNotification(Booking booking) {
        if (adminEmail == null || adminEmail.contains("adityanale1831@gmail.com")) {
            System.out.println("⚠️ Email not configured. Skipping notification for booking: " + booking.getName());
            return;
        }
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(adminEmail);
            message.setSubject("New Booking Request - " + booking.getServiceName());
            message.setText(
                "New booking received!\n\n" +
                "Client Name : " + booking.getName() + "\n" +
                "Email       : " + booking.getEmail() + "\n" +
                "Phone       : " + (booking.getPhone() != null ? booking.getPhone() : "—") + "\n" +
                "Service     : " + booking.getServiceName() + "\n" +
                "Message     : " + (booking.getMessage() != null ? booking.getMessage() : "—") + "\n\n" +
                "Login to admin panel to manage this booking."
            );
            mailSender.send(message);
            System.out.println("✅ Email sent to " + adminEmail);
        } catch (Exception e) {
            System.err.println("❌ Email send failed: " + e.getMessage());
        }
    }
}
