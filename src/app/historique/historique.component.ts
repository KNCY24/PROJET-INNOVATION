import { Component, OnInit } from '@angular/core';
import { Historique } from '../classfile';
import { RestserviceService } from '../restservice.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {

  historique:Historique=new Historique();

  constructor(private service : RestserviceService) { 
    service.getHistorique().subscribe(
      data => {
        this.historique=data;
      }
    )
  }

  ngOnInit(): void {
  }
  
  getDate(id:number){
    var date = new Date(this.historique.interventions[id-1].date)
    var jour = ""
    var mois = ""
    if(date.getDate()<10){
      jour="0"+date.getDate()
    }else{
      jour=""+date.getDate()
    }
    if(date.getMonth()<10){
      mois="0"+date.getMonth()
    }else{
      mois=""+date.getMonth()
    }
    return jour+"/"+mois+"/"+date.getFullYear()
  }

  getHour(id:number){
    var date = new Date(this.historique.interventions[id-1].date)
    var heure=""
    var minute=""
    if(date.getMinutes()<10){
      minute="0"+date.getMinutes()
    }else{
      minute=""+date.getMinutes()
    }
    if(date.getHours()<10){
      heure="0"+date.getHours()
    }else{
      heure=""+date.getHours()
    }
    return heure+"h"+minute
  }

}
