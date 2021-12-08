import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { readFile } from 'fs';
import { RestserviceService } from '../restservice.service';
import { CSV, CSVRecord, Values } from '../CSVModel';
import { Papa } from 'ngx-papaparse';
import { NgForm } from '@angular/forms';
import { Intervention, Porteur } from '../classfile';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public records: any[] = [];

  csvfile:CSV=new CSV()
  values:Values=new Values()

  intervention:Intervention=new Intervention()
  porteur:Porteur=new Porteur()

  username:any=""
  grade:any=""
  statut:any="" 
  fileInput:any=""

  popup:boolean=false
  submit:boolean=false
  alert:boolean=false
  msgAlert='Tous les champs doivent être complétés.'

  date=""
  localisation=""
  nbmasque="2"
  classefeu="A"

  constructor(private papa:Papa,private service:RestserviceService,private router:Router,private snackbar:MatSnackBar) {
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('name')){
      this.username=String(sessionStorage.getItem('name'))
      this.grade=String(sessionStorage.getItem('grade'))
    }else{
      this.router.navigate([''])
    }
    if(sessionStorage.getItem('statut')){
      this.statut=sessionStorage.getItem('statut')
    }
  }

  home() {
    this.router.navigate(['/home'])
  }

  logout(){
    sessionStorage.clear()
    this.router.navigate([''])
  }

  closePopup(){
    (<HTMLElement>document.getElementById("addPopup")).classList.remove("alertActive");
    this.alert=false
    this.submit=false;
    this.popup=false;
    this.date=""
    this.localisation=""
    this.nbmasque="2"
    this.classefeu="A"
  }

  changenbmasque(){
    if(parseInt(this.nbmasque)<2){
      this.nbmasque="2"
    }
    if(parseInt(this.nbmasque)<this.csvfile.records.length){
      this.csvfile.records.splice(-1,1)
    }
  }

  changebarbe(i:number){
    if(this.csvfile.records.length>=i && this.csvfile.records.length!=0){
      var b=false
      var select =(<HTMLSelectElement>document.getElementsByName("barbe")[i])
      var choice = select.selectedIndex
      if(select.options[choice].value=="true"){
        b=true
      }
      this.csvfile.records[i].barbe=b
    }
  }

  nbmasquelist(){
    var list=[]
    for(let i=0;i<parseInt(this.nbmasque);i++){
      list.push(i)
    }
    return list
  }

  verifForm(){
    if(this.localisation.length<1|| this.nbmasque==null || this.date=="" ){
      this.msgAlert='Tous les champs doivent être complétés.'
      return false;
    }
    if(new Date((<HTMLInputElement>document.getElementsByName('date')[0]).value)>new Date() || new Date((<HTMLInputElement>document.getElementsByName('date')[0]).value)<new Date('01-01-2021')){
      this.msgAlert= "Veuillez entrer une date valide."
      return false;
    }
    if(this.csvfile.records.length!=parseInt(this.nbmasque)){
      this.msgAlert="Veuillez sélectionner un fichier de données pour chaque masque."
      return false;
    }
    var avecbarbe=0
    var sansbarbe=0
    for(let record of this.csvfile.records){
      if(record.barbe==true){
        avecbarbe=avecbarbe+1
      }
      if(record.barbe==false){
        sansbarbe=sansbarbe+1
      }
    }
    if(avecbarbe==0 || sansbarbe==0){
      this.msgAlert="Il doit y avoir au moins un porteur avec barbe et un porteur sans barbe."
      return false
    }
    console.log(this.csvfile)
    return true;  
  }

  onSubmit(form:NgForm){
    if(this.verifForm()){
      (<HTMLElement>document.getElementById("addPopup")).classList.remove("alertActive");
      (<HTMLDivElement>document.getElementById("loadWait")).style.display="block";
      this.intervention.date=new Date(this.date)
      this.intervention.localisation=this.localisation
      this.intervention.classefeu=this.classefeu
      this.intervention.responsable = this.grade+" "+this.username
      for(let record of this.csvfile.records){
        this.porteur=new Porteur()
        this.porteur.masque=record.masque
        this.porteur.barbe=record.barbe
        var moy=0
        for(let value of record.values){
          moy= +moy + +value.gaz
        }
        moy=moy/record.values.length
        this.porteur.gaz=Math.round(moy*100)/100
        this.intervention.porteurs.push(this.porteur)
      }
      this.service.addIntervention(this.intervention).subscribe(
        data => {
          (<HTMLDivElement>document.getElementById("loadWait")).style.display="none";
          setTimeout(() => {
            this.router.navigate(['historique'])
            document.location.reload()
          },1000)
        }
      )
      console.log(this.intervention)
      this.alert=false
      this.submit=false;
    }else{
      this.alert=true
      this.submit=false;
      (<HTMLElement>document.getElementById("addPopup")).classList.add("alertActive");
    }
  }

  importData(evt:any,id:number){
    var csvrecord=new CSVRecord()
    //import csv
    var files=evt.target.files
    //zone texte pour nom fichier
    var fileselected = <HTMLLabelElement>document.getElementById("name-file"+id);
    fileselected.textContent=files[0].name 

    //extraire numéro de masque dans nom du fichier
    csvrecord.masque=files[0].name.slice(0,-4)
    //barbe ou pas
    var select =(<HTMLSelectElement>document.getElementsByName("barbe")[id])
    var choice = select.selectedIndex
    if(select.options[choice].value=="true"){
      csvrecord.barbe=true
    }else{
      csvrecord.barbe=false
    }
    //lecture données
    var file=files[0]
    var reader = new FileReader()
    reader.readAsText(file)
    reader.onload = (event:any)=> {
      var csv = event.target.result
      this.papa.parse(csv, {
        skipEmptyLines : true,
        complete:(results)=> {
          for(let i=0;i<results.data.length;i++){
            this.values=new Values()
            this.values.temps=results.data[i][0]
            this.values.gaz=results.data[i][1]
            csvrecord.values.push(this.values)
          }
        }
      })
    }
    //ajouter données masque dans fichier
    this.csvfile.records.push(csvrecord)
    console.log(this.csvfile)
  }

}
