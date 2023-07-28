package ensa.pfa.kitcoop;

import ensa.pfa.kitcoop.models.*;
import ensa.pfa.kitcoop.repositories.EnfantRepository;
import ensa.pfa.kitcoop.repositories.PersonnelRepository;
import ensa.pfa.kitcoop.repositories.PointageRepository;
import ensa.pfa.kitcoop.repositories.RegistrePaieRepository;
import ensa.pfa.kitcoop.services.PersonnelService;
import ensa.pfa.kitcoop.services.UniteProdService;
import ensa.pfa.kitcoop.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.cglib.core.Local;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Component
@AllArgsConstructor
@Order(1)
public class DatabaseInitializer implements ApplicationRunner {
    private final UserService userService;
    private final PersonnelRepository personnelRepository;
    private final UniteProdService uniteProdService;
    private final PointageRepository pointageRepository;
    private final RegistrePaieRepository registrePaieRepository;
    private final EnfantRepository enfantRepository;
    @Override
    public void run(ApplicationArguments args) throws Exception {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        User user1 = new User(1, "nirina", "151000", "ADMIN", true, "nirinamercia@gmail.com", null);
        userService.createUser(user1);
        Personnel personnel1 = personnelRepository.save(new Personnel(1l, "2023001", false, "Lahmidi","Amina", "Supérieur","Masculin", "https://res.cloudinary.com/deqm1j9ey/image/upload/v1680881071/Kitcoop/default_pic_bdegda.png", LocalDate.parse("2002-05-05", formatter), LocalDate.parse("2023-05-12", formatter), "", 0, "dev front", "JK00650A", "178", "Tilila", "Agadir",LocalDate.parse("2002-07-18", formatter), "mensuelle", 70.0, true, "0631821328", "Célibataire", 0, LocalDate.parse("2022-04-15", formatter), "très actif et performant", new ArrayList<Enfant>()));
        Personnel personnel =personnelRepository.save(new Personnel(2l, "2023002",false, "Benali","Ahmed","Lycée", "Masculin","https://res.cloudinary.com/deqm1j9ey/image/upload/v1680881071/Kitcoop/default_pic_bdegda.png", LocalDate.parse("2003-01-12", formatter), LocalDate.parse("2023-01-20", formatter), "Démission", 3, "Secrétaire", "AHD4571A403", "176", "Hay Salam", "Agadir", LocalDate.parse("2019-02-15", formatter), "mensuelle", 50.0, true, "0684242312", "Célibataire",0, LocalDate.parse("2021-04-19", formatter), "", new ArrayList<Enfant>() ));
        List<Enfant> enfants = new ArrayList<>();
        Personnel personnel2 = personnelRepository.save(new Personnel(3l, "2023003", false, "Belkacem", "Youssef", "Supérieur", "Masculin", "https://res.cloudinary.com/deqm1j9ey/image/upload/v1680881071/Kitcoop/default_pic_bdegda.png", LocalDate.parse("2000-11-16",formatter), LocalDate.parse("2019-04-17", formatter), "",0,"gérant", "ADE078942K", "234", "El Houda","Agadir", LocalDate.parse("2017-03-20",formatter), "mensuelle", 60.0, true, "0775323219", "Marié(e)", 2, null,"sociable",enfants));
        Enfant e1 = enfantRepository.save(new Enfant(1l ,"Benjelloun Samira", true, LocalDate.parse("2015-05-16", formatter), personnel2));
        Enfant e2 = enfantRepository.save(new Enfant(2l, "El Kharoubi Laila", true, LocalDate.parse("2017-07-03",formatter), personnel2));
        UniteProd uniteProd = new UniteProd(1l, "unite_prod_1","El Houda", "Agadir");
        uniteProdService.createUniteProd(uniteProd);
        UniteProd uniteProd1 = new UniteProd(2l, "unite_prod_2", "Sidi Youssef", "Agadir");
        uniteProdService.createUniteProd(uniteProd1);
        UniteProd uniteProd2 = new UniteProd(3l, "unite_prod_3", "Dakhla", "Agadir");
        Pointage pointage = new Pointage(1l, "001", LocalDate.parse("2023-05-12"), LocalDate.parse("2023-05-05", formatter), 18,6,1,0,0.0,personnel1,uniteProd);
        pointageRepository.save(pointage);
        RegistrePaie registrePaie = new RegistrePaie(pointage);
        registrePaieRepository.save(registrePaie);
    }
}
