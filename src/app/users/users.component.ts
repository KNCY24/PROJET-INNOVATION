import { Component, OnInit } from '@angular/core';
import { User, Users } from '../classfile';
import { RestserviceService } from '../restservice.service';
import { NgForm } from '@angular/forms';

import { DatePipe } from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users:Users=new Users();
  popupD:boolean=false;
  popupU:boolean=false;
  popupI:boolean=false;
  popupA:boolean=false
  iduser:number=0;
  user:User=new User();
  newuser:User=new User();
  mailinit:string="";

  submit:boolean=false
  alert:boolean=false
  msgAlert='Tous les champs doivent être complétés.'
  sessionmail:any=""
  
  grade=""
  name=""
  fname=""
  mail=""
  statut="1"
  born=""

  constructor(private service : RestserviceService,private snackbar:MatSnackBar,private datepipe:DatePipe) { 
    service.getUsers().subscribe(
      data => {
        this.users=data;
      }
    )
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('username')){
      this.sessionmail=sessionStorage.getItem('username')
    }
  }
  
  getDate(d:Date){
    var date = new Date(d)
    var jour = ""
    var mois = ""
    if(date.getDate()<10){
      jour="0"+date.getDate()
    }else{
      jour=""+date.getDate()
    }
    if(date.getMonth()+1<10){
      mois="0"+(date.getMonth()+1)
    }else{
      mois=""+(date.getMonth()+1)
    }
    return jour+"/"+mois+"/"+date.getFullYear()
  }

  closePopup(){
    this.grade=""
    this.name=""
    this.fname=""
    this.mail=""
    this.statut="1"
    this.born=""
    this.popupD=false; 
    this.popupU=false;
    this.popupI=false;
    this.popupA=false;
    this.submit=false
    this.alert=false
  }

  
  delete(id:number){
    this.popupD=true;
    this.iduser=id;
  }
  
  getDDN(){
    for(let user of this.users.users){
      if(user.iduser==this.iduser){
        return user.born
      }
    }
    return "Error"
  }
  
  getName(){
    for(let user of this.users.users){
      if(user.iduser==this.iduser){
        return user.name+ " "+ user.firstname
      }
    }
    return "Error"
  }

  confirmationDelete(){
    (<HTMLDivElement>document.getElementById("loadWait")).style.display="block";
      this.service.deleteUser(this.iduser).subscribe(
      data => {
        (<HTMLDivElement>document.getElementById("loadWait")).style.display="none";
        this.users = data;
        this.closePopup();
        this.snackbar.open("Utilisateur supprimé.","",{
          duration:3000,
          panelClass:["snackbar"]
        })
      },
      error =>{
        alert('Erreur, réactualisez la page!')
      }
    )
  }

  update(user:User){
    this.popupU=true
    this.user=user
    this.name=user.name
    this.grade=user.grade
    this.fname=user.firstname
    this.mailinit=user.mail
    this.mail=user.mail
    this.statut=user.statut
    var date=new Date(user.born)
    this.born=String(this.datepipe.transform(date,'yyyy-MM-dd'))
  }

  verifMail(){
    if(!this.mail.includes('@') || this.mail.length < 4 ){
      return false
    }
    var nb=0
    for(let letter of this.mail){
      if(letter=='@') nb=nb+1
    }
    if(nb>1){
      return false
    }
    if(!this.mail[this.mail.indexOf('@')-1].match('[a-z0-9]') ){
      return false
    }
    var mailformat= '[a-z][-._a-z0-9]+@[a-z0-9][-._a-z0-9]+\.[a-z]{2}'
    if(!this.mail.match(mailformat)){
      return false
    }
    var point= 0
    for(let i = this.mail.indexOf('@') ; i<this.mail.length+1 ; i++){
      if(this.mail[i] ==".") point=point+1
    }
    if(point<1){
      return false
    }
    if(!this.mail[this.mail.lastIndexOf('.')-1].match('[a-z0-9]')){
      return false
    }

    return true
  }

  verifForm(){
    if(this.fname.length<1 || this.name.length<1 ){
      this.msgAlert='Tous les champs doivent être complétés.'
      return false;
    }
    if(new Date((<HTMLInputElement>document.getElementsByName('born')[0]).value)>new Date() || new Date((<HTMLInputElement>document.getElementsByName('born')[0]).value)<new Date('01-01-1930')){
      this.msgAlert= "Veuillez entrer une date valide."
      return false;
    }
    if(this.verifMail()==false){
      this.msgAlert= "Veuillez entrer une adresse mail valide."
      return false;
    }
    for(let u of this.users.users){
      if(u.mail==this.mail && this.mail!=this.mailinit){
        this.msgAlert="Cette adresse mail est déjà utilisée."
        return false
      }
    }
    return true;    
  }

  onUpdate(form:NgForm){
    if(this.verifForm()==true && this.submit==true){
      (<HTMLElement>document.getElementById("updatePopup")).classList.remove("alertActive");
      (<HTMLDivElement>document.getElementById("loadWait")).style.display="block";
      this.alert=false
      this.user.name=this.name
      this.user.firstname=this.fname
      this.user.statut=this.statut
      this.user.grade=this.grade
      this.user.born=new Date(this.born)
      this.user.mail=this.mail
      this.service.updateUser(this.user).subscribe(
        data => {
          this.users = data;
          this.popupU=false;
          this.submit=false;
          (<HTMLDivElement>document.getElementById("loadWait")).style.display="none";
          this.snackbar.open("Utilisateur mis à jour.","",{
            duration:3000,
            panelClass:["snackbar"]
          })
        },
        error =>{
          alert('Erreur, réactualisez la page!')
        }
      )
          
    }else{
      this.alert=true;
      this.submit=false;
      (<HTMLElement>document.getElementById("updatePopup")).classList.add("alertActive");
    }
  }

  onSubmit(form:NgForm){
    if(this.verifForm()==true && this.submit==true){
      (<HTMLDivElement>document.getElementById("loadWait")).style.display="block";
      (<HTMLElement>document.getElementById("addPopup")).classList.remove("alertActive");
      this.alert=false
      this.newuser.name=this.name
      this.newuser.firstname=this.fname
      this.newuser.statut=this.statut
      this.newuser.grade=this.grade
      this.newuser.born=new Date(this.born)
      this.newuser.mail=this.mail
      this.newuser.nouveau=true
      const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?#';
      var newpassword=''
      for ( let i = 0; i < 9; i++ ) {
        newpassword += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      var CryptoTS = require("crypto-ts");
      var pwcrypt = CryptoTS.AES.encrypt(newpassword, 'SDISBYKENCYM');
      this.newuser.password=newpassword+","+String(pwcrypt)
      this.service.addUser(this.newuser).subscribe(
        data => {
          (<HTMLDivElement>document.getElementById("loadWait")).style.display="none";
          this.snackbar.open("Utilisateur ajouté.","",{
            duration:3000,
            panelClass:["snackbar"]
          })
          this.users = data;
          this.popupA=false;
          this.submit=false;
          this.grade=""
          this.name=""
          this.fname=""
          this.mail=""
          this.statut="1"
          this.born=""
        },
        error =>{
          alert('Erreur, réactualisez la page!')
        }
      )
          
    }else{
      this.alert=true;
      this.submit=false;
      (<HTMLElement>document.getElementById("addPopup")).classList.add("alertActive");
    }
  }
}

