package KER.EtanMask.Service;

import KER.EtanMask.Model.User;
import KER.EtanMask.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.transaction.Transactional;
import java.util.List;

@org.springframework.stereotype.Service
@Transactional
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public List<User> listAllUser() {
        return userRepository.findAll();
    }
    public void saveUser(User user) {
        userRepository.save(user);
    }
    public User getUser(Integer id) {
        return userRepository.findById(id).get();
    }
    public void deletUser(Integer id) {
        userRepository.deleteById(id);
    }

}
