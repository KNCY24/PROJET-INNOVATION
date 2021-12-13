package KER.EtanMask.Repository;

import KER.EtanMask.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Integer> {
}
