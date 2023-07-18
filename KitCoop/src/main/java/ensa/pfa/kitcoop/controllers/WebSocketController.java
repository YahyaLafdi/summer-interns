package ensa.pfa.kitcoop.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    @MessageMapping("/notification") // The WebSocket endpoint for receiving messages
    @SendTo("/topic/notifications") // The destination to send the response message
    public String handleNotification(String message) {
        return "Received notification: " + message;
    }
}
