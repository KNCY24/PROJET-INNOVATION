package KER.EtanMask.Model;

import javax.persistence.*;
import java.sql.Time;
import java.util.Collection;
import java.util.Date;

@Entity(name="Intervention")
public class Intervention {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idintervention;
    private Date date;
    private String localisation;
    private String classefeu;
    private String responsable;

    @ManyToMany(cascade = CascadeType.ALL)
    private Collection<Porteur> porteurs;

    public Intervention(){}

    public Intervention(int idintervention, Date date, String localisation, String classefeu,String responsable, Collection<Porteur> porteurs) {
        this.idintervention = idintervention;
        this.date = date;
        this.localisation = localisation;
        this.classefeu = classefeu;
        this.responsable = responsable;
        this.porteurs = porteurs;

    }

    public int getIdintervention() {
        return idintervention;
    }

    public void setIdintervention(int idintervention) {
        this.idintervention = idintervention;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getLocalisation() {
        return localisation;
    }

    public void setLocalisation(String localisation) {
        this.localisation = localisation;
    }

    public String getClassefeu() {
        return classefeu;
    }

    public void setClassefeu(String classefeu) {
        this.classefeu = classefeu;
    }

    public Collection<Porteur> getPorteurs() {
        return porteurs;
    }

    public void setPorteurs(Collection<Porteur> porteurs) {
        this.porteurs = porteurs;
    }

    public String getResponsable() {
        return responsable;
    }

    public void setResponsable(String responsable) {
        this.responsable = responsable;
    }
}
