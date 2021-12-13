package KER.EtanMask.Model;

import javax.persistence.*;
import java.util.Collection;

@Entity(name = "Porteur")
public class Porteur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idporteur;
    private boolean barbe;
    private double gaz;
    private String masque;

    public Porteur(){}

    public Porteur(int idporteur, boolean barbe, String masque, Double gaz) {
        this.idporteur = idporteur;
        this.barbe = barbe;
        this.masque = masque;
        this.gaz = gaz;
    }

    public int getIdporteur() {
        return idporteur;
    }

    public void setIdporteur(int idporteur) {
        this.idporteur = idporteur;
    }

    public boolean isBarbe() {
        return barbe;
    }

    public void setBarbe(boolean barbe) {
        this.barbe = barbe;
    }

    public String getMasque() {
        return masque;
    }

    public void setMasque(String masque) {
        this.masque = masque;
    }

    public double getGaz() {
        return gaz;
    }

    public void setGaz(double gaz) {
        this.gaz = gaz;
    }
}
