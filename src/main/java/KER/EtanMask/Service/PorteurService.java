package KER.EtanMask.Service;

import KER.EtanMask.Model.Porteur;
import KER.EtanMask.Repository.PorteurRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.transaction.Transactional;
import java.util.List;

@org.springframework.stereotype.Service
@Transactional
public class PorteurService {
    @Autowired
    private PorteurRepository porteurRepository;
    public List<Porteur> listAllPorteur() {
        return porteurRepository.findAll();
    }
    public void savePorteur(Porteur porteur) {
        porteurRepository.save(porteur);
    }
    public Porteur getPorteur(Integer id) {
        return porteurRepository.findById(id).get();
    }
    public void deletePorteur(Integer id) {
        porteurRepository.deleteById(id);
    }

}
