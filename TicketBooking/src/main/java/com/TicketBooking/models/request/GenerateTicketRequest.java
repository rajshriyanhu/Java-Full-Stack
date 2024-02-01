package com.TicketBooking.models.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GenerateTicketRequest {
    private int price;
    private String startStation;
    private String endStation;
}
