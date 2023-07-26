package ensa.pfa.kitcoop;

import ensa.pfa.kitcoop.models.User;
import ensa.pfa.kitcoop.models.enums.Role;
import ensa.pfa.kitcoop.services.NotificationService;
import ensa.pfa.kitcoop.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class KitCoopApplication implements CommandLineRunner {
    private final NotificationService notificationService;
    private final UserService userService;

    @Autowired
    public KitCoopApplication(NotificationService notificationService, UserService userService) {
        this.notificationService = notificationService;
        this.userService = userService;
    }

    public static void main(String[] args) {
        SpringApplication.run(KitCoopApplication.class, args);
    }


    @Override
    public void run(String... args) throws Exception {
        notificationService.checkSeuilAndSendNotification();
        User user1 = new User(1, "nirina", "151000", "ADMIN", true, "nirinamercia@gmail.com", null);
        userService.createUser(user1);
    }
}
