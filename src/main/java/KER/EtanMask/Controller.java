package KER.EtanMask;

import KER.EtanMask.Model.Historique;
import KER.EtanMask.Model.Intervention;
import KER.EtanMask.Model.User;
import KER.EtanMask.Model.Users;
import KER.EtanMask.Service.InterventionService;
import KER.EtanMask.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("generic")
public class Controller {
    @Autowired
    InterventionService interventionService;
    @Autowired
    UserService userService;
    @Autowired
    JavaMailSender javaMailSender;

    @GetMapping("/users")
    public Users getUsers(){
        Users users = new Users();
        users.setUsers(userService.listAllUser());
        return users;
    }

    @GetMapping("/interventions")
    public Historique getHistorique(){
        Historique historique = new Historique();
        historique.setInterventions(interventionService.listALlIntervention());
        return historique;
    }

    @PutMapping("/addIntervention")
    public Historique addIntervention(@RequestBody Intervention intervention){
        interventionService.saveIntervention(intervention);
        return getHistorique();
    }

    @PutMapping("/intervention")
    public Intervention getIntervention(@RequestBody Integer id){
        Intervention existIntervention = interventionService.getIntervention(id);
        return existIntervention;
    }

    @PutMapping("/addUser")
    public Users addUser(@RequestBody User user){
        userService.saveUser(user);
        String password[]=user.getPassword().split(",");
        user.setPassword(password[1]);
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(user.getMail());
        msg.setSubject("Confirmation de la création de votre compte EtanMask ");
        msg.setText("Bonjour " + user.getName()+" "+user.getFirstname()+",\n \n"+
                "Votre compte EtanMask vient d'être créé.\n" +
                "Vous pouvez vous y connecter avec vos identifiants. \n" +
                "           Nom d'utilisateur : " + user.getMail()+"\n"+
                "           Mot de passe : " + password[0]+
                "\n \n SDIS81");
        javaMailSender.send(msg);
        return getUsers();
    }

    @PutMapping("/deleteUser")
    public Users deleteUser(@RequestBody Integer id){
        userService.deletUser(id);
        return getUsers();
    }

    @PutMapping("/updateUser")
    public Users updateUser(@RequestBody User user){
        User existUser = userService.getUser(user.getIduser());
        existUser.setName(user.getName());
        existUser.setFirstname(user.getFirstname());
        existUser.setBorn(user.getBorn());
        existUser.setGrade(user.getGrade());
        existUser.setMail(user.getMail());
        existUser.setStatut(user.getStatut());
        return getUsers();
    }

}
