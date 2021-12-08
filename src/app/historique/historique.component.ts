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
    if(date.getMonth()<9){
      mois="0"+(date.getMonth()+1)
    }else{
      mois=""+(date.getMonth()+1)
    }
    return jour+"/"+mois+"/"+date.getFullYear()
  }

}
