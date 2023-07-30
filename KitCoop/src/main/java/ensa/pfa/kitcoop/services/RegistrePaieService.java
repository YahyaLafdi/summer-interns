package ensa.pfa.kitcoop.services;

import ensa.pfa.kitcoop.models.RegistrePaie;
import ensa.pfa.kitcoop.payload.responses.APIResponse;
import ensa.pfa.kitcoop.repositories.RegistrePaieRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class RegistrePaieService {
    private final RegistrePaieRepository registrePaieRepository;

    public APIResponse getAllRegistres(){
        try{
            List<RegistrePaie> registrePaieList =  registrePaieRepository.findAll();
            return new APIResponse(HttpStatus.OK.value(), registrePaieList, "OK!");
        }catch (Exception e){
            return new APIResponse(HttpStatus.BAD_REQUEST.value(), null, "Erreur!");
        }
    }
}
