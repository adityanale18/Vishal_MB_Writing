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

    @Value("${spring.mail.username}")
    private String mailFrom;

    @Value("${admin.email}")
    private String adminEmail;

    public void sendBookingNotification(Booking booking) {
        if (mailFrom == null || mailFrom.isBlank() || adminEmail == null || adminEmail.isBlank()) {
            System.out.println("⚠️ Email sender or recipient not configured. Skipping notification for booking: " + booking.getName());
            return;
        }
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(mailFrom);
            message.setTo(adminEmail);
            message.setReplyTo(booking.getEmail());
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
            System.out.println("📧 Sending booking email from " + mailFrom + " to " + adminEmail);
            mailSender.send(message);
            System.out.println("✅ Email sent to " + adminEmail);
        } catch (Exception e) {
            System.err.println("❌ Email send failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
