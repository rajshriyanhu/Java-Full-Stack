package com.TicketBooking.models.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TicketOperationResponse {
    private String message;
    private Object data;

    public TicketOperationResponse(String s) {
    }
}
