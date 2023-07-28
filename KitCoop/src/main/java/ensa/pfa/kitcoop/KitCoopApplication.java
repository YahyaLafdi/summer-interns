package ensa.pfa.kitcoop;

import ensa.pfa.kitcoop.models.*;
import ensa.pfa.kitcoop.models.enums.Role;
import ensa.pfa.kitcoop.repositories.PointageRepository;
import ensa.pfa.kitcoop.repositories.RegistrePaieRepository;
import ensa.pfa.kitcoop.services.NotificationService;
import ensa.pfa.kitcoop.services.PersonnelService;
import ensa.pfa.kitcoop.services.UniteProdService;
import ensa.pfa.kitcoop.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;

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
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        notificationService.checkSeuilAndSendNotification();
    }
}
