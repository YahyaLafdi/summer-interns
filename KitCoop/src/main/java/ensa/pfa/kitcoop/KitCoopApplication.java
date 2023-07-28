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
    private final UserService userService;
    private final PersonnelService personnelService;
    private final UniteProdService uniteProdService;
    private final PointageRepository pointageRepository;
    private final RegistrePaieRepository registrePaieRepository;
    @Autowired
    public KitCoopApplication(NotificationService notificationService,PointageRepository pointageRepository, UserService userService, PersonnelService personnelService, UniteProdService uniteProdService, RegistrePaieRepository registrePaieRepository) {
        this.notificationService = notificationService;
        this.userService = userService;
        this.personnelService = personnelService;
        this.uniteProdService = uniteProdService;
        this.registrePaieRepository = registrePaieRepository;
        this.pointageRepository = pointageRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(KitCoopApplication.class, args);
    }


    @Override
    public void run(String... args) throws Exception {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        notificationService.checkSeuilAndSendNotification();
        User user1 = new User(1, "nirina", "151000", "ADMIN", true, "nirinamercia@gmail.com", null);
        userService.createUser(user1);
        Personnel personnel1 = new Personnel(1l, "2023001", false, "Rakotoniary","Nirina", "Supérieur","Masculin", "https://res.cloudinary.com/deqm1j9ey/image/upload/v1680881071/Kitcoop/default_pic_bdegda.png", LocalDate.parse("2023-05-05", formatter), LocalDate.parse("2023-05-12", formatter), "", 0, "dev front", "JK00650A", "178", "Tilila", "Agadir",LocalDate.parse("2002-07-18", formatter), "mensuelle", 70.0, true, "0631821328", "Célibataire", 0, LocalDate.parse("2022-04-15", formatter), "très actif et performant", new ArrayList<Enfant>());
        personnelService.createPersonnel(personnel1);
        UniteProd uniteProd = new UniteProd(1l, "unite_prod_1","El Houda", "Agadir");
        uniteProdService.createUniteProd(uniteProd);
        Pointage pointage = new Pointage(1l, "001", LocalDate.parse("2023-05-12"), LocalDate.parse("2023-05-05", formatter), 18,6,1,0,0.0,personnel1,uniteProd);
        pointageRepository.save(pointage);
        RegistrePaie registrePaie = new RegistrePaie(pointage);
        registrePaieRepository.save(registrePaie);
    }
}
