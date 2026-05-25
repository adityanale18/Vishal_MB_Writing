package com.vishal.backend.controller;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vishal.backend.model.Booking;
import com.vishal.backend.service.BookingService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private BookingService bookingService;

    @GetMapping("/bookings")
    public List<Booking> getAllBookings() {
        return bookingService.getAll();
    }

    @PatchMapping("/bookings/{id}/status")
    public Booking updateStatus(@PathVariable Integer id, @RequestBody Map<String, String> body) {
        return bookingService.updateStatus(id, body.get("status"));
    }

    @GetMapping("/bookings/export")
    public ResponseEntity<byte[]> exportBookings() throws Exception {
        List<Booking> bookings = bookingService.getAll();
        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Orders");

            // Header row
            String[] headers = { "#", "Client Name", "Email", "Phone", "Service", "Message", "Status" };
            Row headerRow = sheet.createRow(0);
            CellStyle headerStyle = workbook.createCellStyle();
            Font font = workbook.createFont();
            font.setBold(true);
            headerStyle.setFont(font);
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
            }

            // Data rows
            for (int i = 0; i < bookings.size(); i++) {
                Booking b = bookings.get(i);
                Row row = sheet.createRow(i + 1);
                row.createCell(0).setCellValue(i + 1);
                row.createCell(1).setCellValue(b.getName());
                row.createCell(2).setCellValue(b.getEmail());
                row.createCell(3).setCellValue(b.getPhone() != null ? b.getPhone() : "");
                row.createCell(4).setCellValue(b.getServiceName());
                row.createCell(5).setCellValue(b.getMessage() != null ? b.getMessage() : "");
                row.createCell(6).setCellValue(b.getStatus() != null ? b.getStatus() : "New");
            }

            for (int i = 0; i < headers.length; i++) sheet.autoSizeColumn(i);

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            workbook.write(out);
            return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=orders.xlsx")
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(out.toByteArray());
        }
    }
}
