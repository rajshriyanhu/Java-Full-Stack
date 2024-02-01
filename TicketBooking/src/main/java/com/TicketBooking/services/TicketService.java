package com.TicketBooking.services;

import com.TicketBooking.models.Ticket;
import com.TicketBooking.models.request.GenerateTicketRequest;
import com.TicketBooking.models.response.TicketOperationResponse;
import com.TicketBooking.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TicketService {
    private final TicketRepository ticketRepository;

    public Ticket generateTicket(GenerateTicketRequest request){
        Ticket ticket = new Ticket(UUID.randomUUID().toString(), LocalDateTime.now().plusHours(18), request.getPrice(), request.getStartStation(), request.getEndStation(),false,false);
        ticketRepository.save(ticket);
        return ticket;
    }

    public TicketOperationResponse enterStation(String ticketId) {
        Optional<Ticket> optionalTicket = ticketRepository.findById(ticketId);

        if (optionalTicket.isEmpty()) {
            return new TicketOperationResponse("Ticket not found", null);
        }

        Ticket ticket = optionalTicket.get();

        if (ticket.getExpiryTime().isBefore(LocalDateTime.now())) {
            return new TicketOperationResponse("Ticket is expired", null);
        }

        if (ticket.getTicketUsedEnter() && ticket.getTicketUsedExit()) {
            return new TicketOperationResponse("Ticket has been used for enter and exit stations", null);
        }

        if (ticket.getTicketUsedEnter()) {
            return new TicketOperationResponse("Ticket is already used for enter a station", null);
        }

        ticket.setTicketUsedEnter(true);
        ticketRepository.save(ticket);

        return new TicketOperationResponse("You have used ticket to enter a station", ticket);
    }

    public TicketOperationResponse exitStation(String ticketId) {
        Optional<Ticket> optionalTicket = ticketRepository.findById(ticketId);

        if (optionalTicket.isEmpty()) {
            return new TicketOperationResponse("Ticket not found", null);
        }

        Ticket ticket = optionalTicket.get();

        if (ticket.getExpiryTime().isBefore(LocalDateTime.now())) {
            return new TicketOperationResponse("Ticket is expired", null);
        }

        if (!ticket.getTicketUsedEnter()) {
            return new TicketOperationResponse("Ticket is not used for enter a station! You cannot exit before entering", null);
        }

        if (ticket.getTicketUsedExit()) {
            return new TicketOperationResponse("Ticket has already reached usage limit", null);
        }

        ticket.setTicketUsedExit(true);
        ticketRepository.save(ticket);

        return new TicketOperationResponse("You have used ticket to exit a station", ticket);
    }

    public TicketOperationResponse getTicket(String ticketId) {
        Optional<Ticket> optionalTicket = ticketRepository.findById(ticketId);

        if (optionalTicket.isEmpty()) {
            return new TicketOperationResponse("Ticket not found", null);
        }

        return new TicketOperationResponse("Ticket retrieved successfully", optionalTicket.get());
    }
}
