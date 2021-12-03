import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Historique, Intervention, Porteur } from '../historique';
import { RestserviceService } from '../restservice.service';

@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.component.html',
  styleUrls: ['./intervention.component.scss']
})
export class InterventionComponent implements OnInit {

  historique:Historique=new Historique();
  intervention:Intervention=new Intervention();

  constructor(private service : RestserviceService,private route:ActivatedRoute) { 
    service.getHistorique().subscribe(
      data => {
        this.historique=data;
        this.intervention=this.historique.interventions[this.route.snapshot.params['id']]
      }
    )
  }

  ngOnInit(): void {
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
    if(date.getMonth()<10){
      mois="0"+date.getMonth()
    }else{
      mois=""+date.getMonth()
    }
    return jour+"/"+mois+"/"+date.getFullYear()
  }

  getHour(d:Date){
    var date = new Date(d)
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

  countPorteur(i :Intervention){
    var count=0
    for(let p of i.porteurs){
      count=count+1
    }
    return count
  }

  ifBarbe(b:Boolean){
    if(b==true){
      return "oui"
    }
    return "non"
  }

}
