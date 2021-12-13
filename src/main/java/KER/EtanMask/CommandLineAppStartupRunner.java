package KER.EtanMask;

import KER.EtanMask.Model.*;
import KER.EtanMask.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.*;

@Component
public class CommandLineAppStartupRunner implements CommandLineRunner {
    @Autowired
    InterventionRepository interventionRepository;
    @Autowired
    PorteurRepository porteurRepository;
    @Autowired
    UserRepository userRepository;

    @Override
    public void run(String...args) throws Exception{
        Date ddn= new SimpleDateFormat("dd/MM/yyyy").parse("01/10/2021");
        Date date = new Date();
        User admin = new User(1,"",1,"Admin","ISIS",ddn,"kency.mariema@hotmail.com","U2FsdGVkX19GsJ1LkBaM3FCaXMsxMaGYekdtBAFVg44=");
        userRepository.save(admin);
    }

}
