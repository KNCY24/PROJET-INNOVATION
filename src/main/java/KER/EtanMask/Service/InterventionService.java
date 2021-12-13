package KER.EtanMask.Service;

import KER.EtanMask.Model.Intervention;
import KER.EtanMask.Repository.InterventionRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.transaction.Transactional;
import java.util.List;

@org.springframework.stereotype.Service
@Transactional
public class InterventionService {
    @Autowired
    private InterventionRepository interventionRepository;
    public List<Intervention> listALlIntervention() {
        return interventionRepository.findAll();
    }
    public void saveIntervention(Intervention intervention) {
        interventionRepository.save(intervention);
    }
    public Intervention getIntervention(Integer id) {
        return interventionRepository.findById(id).get();
    }
    public void deleteIntervention(Integer id) {
        interventionRepository.deleteById(id);
    }

}
