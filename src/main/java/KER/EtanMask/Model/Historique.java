package KER.EtanMask.Model;

import javax.persistence.CascadeType;
import javax.persistence.OneToMany;
import java.util.Collection;

public class Historique {
    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)
    private Collection<Intervention> interventions;

    public Historique(){}

    public Collection<Intervention> getInterventions() {
        return interventions;
    }

    public void setInterventions(Collection<Intervention> interventions) {
        this.interventions = interventions;
    }
}
