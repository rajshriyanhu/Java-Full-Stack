package com.TicketBooking.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "tickets")
public class Ticket {
    private String id;
    private LocalDateTime expiryTime;
    private int price;
    private String startStation;
    private String endStation;
    private Boolean ticketUsedEnter;
    private Boolean ticketUsedExit;


}
