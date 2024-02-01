package com.TicketBooking.controllers;

import com.TicketBooking.models.Ticket;
import com.TicketBooking.models.request.GenerateTicketRequest;
import com.TicketBooking.models.response.TicketOperationResponse;
import com.TicketBooking.services.TicketService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ticket")
@AllArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    @GetMapping("/{ticketId}")
    public TicketOperationResponse getTicket (@PathVariable String ticketId){
        return ticketService.getTicket(ticketId);
    }


    @PostMapping("/generate")
    public ResponseEntity<Ticket> generateTicket(@RequestBody GenerateTicketRequest request) {
        Ticket ticket = ticketService.generateTicket(request);
        return new ResponseEntity<>(ticket, HttpStatus.CREATED);
    }


    @GetMapping("/enter/{ticketId}")
    public TicketOperationResponse enterStation(@PathVariable String ticketId){
        return ticketService.enterStation(ticketId);
    }

    @GetMapping("/exit/{ticketId}")
    public TicketOperationResponse exitStation(@PathVariable String ticketId){
        return ticketService.exitStation(ticketId);
    }
}
