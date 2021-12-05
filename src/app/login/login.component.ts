import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../classfile';
import { RestserviceService } from '../restservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  users:Users=new Users();
  alert:string=""; 
  identifiers:string[]=[];

  constructor(private service: RestserviceService,private router:Router) {
    service.getUsers().subscribe(
      data => {
        this.users = data
      }
    )
    if(sessionStorage.getItem("username")){
      this.router.navigate(['home'])
    }
   }

  ngOnInit(): void {
  }
  
  getIdentifiers(event:any,id:number){
    this.identifiers[id]=event.target.value;
    
  }

  verifSignIn(){
    var userExist=false;
    var pwGood=false;
    var userPassword="";
    for(let user of this.users.users){
      if(user.mail==this.identifiers[0]){
        userExist=true;
        userPassword = user.password;
        var CryptoTS = require("crypto-ts");
        var bytes  = CryptoTS.AES.decrypt(userPassword.toString(), 'SDISBYKENCYM');
        var plaintex = bytes.toString(CryptoTS.enc.Utf8);
        if(this.identifiers[1] == plaintex){
          pwGood=true;
          sessionStorage.setItem("username",user.mail)
          sessionStorage.setItem("name",user.firstname+" "+user.name)
          sessionStorage.setItem("grade",user.grade)
          sessionStorage.setItem("statut",user.statut)
        }else{
          //mauvais mdp
          this.alert="Vos identifiants sont erronés."
        }
      }else{
        //mauvais username
        this.alert="Vos identifiants sont erronés."
      }
    }
    if(pwGood && userExist){
      this.router.navigate(['home']);
    }
    if(this.users.users.length==0){
      this.alert="Erreur ! \n Rééssayez."
    }
  }

}
