package KER.EtanMask.Model;

import javax.persistence.CascadeType;
import javax.persistence.OneToMany;
import java.util.Collection;

public class Users {
    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)
    private Collection<User> users;

    public Users(){}

    public Collection<User> getUsers() {
        return users;
    }

    public void setUsers(Collection<User> users) {
        this.users = users;
    }
}
