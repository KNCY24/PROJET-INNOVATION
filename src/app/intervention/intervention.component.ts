import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Historique, Intervention, Porteur } from '../classfile';
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
        var i=0
        for(let intervention of this.historique.interventions){
          if(intervention.idintervention==this.route.snapshot.params['id']){
            this.intervention=this.historique.interventions[i]
          }
          i=i+1
        }
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
    if(date.getMonth()<9){
      mois="0"+(date.getMonth()+1)
    }else{
      mois=""+(date.getMonth()+1)
    }
    return jour+"/"+mois+"/"+date.getFullYear()
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
