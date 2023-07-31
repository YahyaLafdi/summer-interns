package ensa.pfa.kitcoop.services;

import ensa.pfa.kitcoop.exception.InternalErrorException;
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
            throw new InternalErrorException("Quelque chose s'est mal passé. Réessayer  plus tard...");
        }
    }
    public  APIResponse deleteRegistreById(Long id){
        try{
            registrePaieRepository.deleteById(id);
            return new APIResponse(HttpStatus.NO_CONTENT.value(), null, "Suppression réussie");
        }catch (Exception e){
            throw new InternalErrorException("Quelque chose s'est mal passé. Réessayer  plus tard...");
        }
    }
    public APIResponse getRegistreById(Long id){
        try{
            RegistrePaie registrePaie = registrePaieRepository.findById(id).get();
            return new APIResponse(HttpStatus.OK.value(), registrePaie, "OK!");
        }catch (Exception e){
            throw new InternalErrorException("Erreur !");
        }
    }
}
