package ensa.pfa.kitcoop;

import ensa.pfa.kitcoop.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class KitCoopApplication implements CommandLineRunner {
    private final NotificationService notificationService;

    @Autowired
    public KitCoopApplication(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    public static void main(String[] args) {
        SpringApplication.run(KitCoopApplication.class, args);
    }


    @Override
    public void run(String... args) throws Exception {
        notificationService.checkSeuilAndSendNotification();
    }
}
