package KER.EtanMask;

import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@EnableEncryptableProperties
@SpringBootApplication
public class EtanMaskApplication {

	public static void main(String[] args) {

		SpringApplication.run(EtanMaskApplication.class, args);
	}

}
