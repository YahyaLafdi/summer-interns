package ensa.pfa.kitcoop.utils;

import ensa.pfa.kitcoop.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Component
@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "${REACT_APP_FRONTEND_URL}")
public class NotificationScheduler {
    private final NotificationService notificationService;


    @Autowired
    public NotificationScheduler(NotificationService notificationService) {
        this.notificationService = notificationService;
    }



    /*@GetMapping // Expose a GET endpoint to retrieve the notifications
    public List<String> getNotifications() {
        return notificationService.checkSeuilAndSendNotification();
    }*/
}
