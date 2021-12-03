import { Component, OnInit } from '@angular/core';
import {ChartType} from 'angular-google-charts';
import { Historique, Porteur } from '../historique';
import { RestserviceService } from '../restservice.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-interpretation',
  templateUrl: './interpretation.component.html',
  styleUrls: ['./interpretation.component.scss']
})
export class InterpretationComponent implements OnInit {

  historique:Historique=new Historique()
  data= [
    [1,45,25],[2,10,5],[3,15,1],[4,1,1],[5,15,2]
  ]
  options:any;
  
  constructor(private service : RestserviceService) { 
    service.getHistorique().subscribe(
      data => {
        this.historique=data;
        this.options = {
          chart:{
            type:'spline'
          },
          title:{
            text:''
          },
          colors:['#ebb83d','#e2230d'],
          credits:{
            enabled:false
          },
          xAxis: {
            categories:this.nbIntervention(),
            tickmarkPlacement:'on',
            title:{
              text:"Intervention"
            },
            format:'0',
          },
          yAxis:{
            title:{
              text:"Exposition (%)"
            }
          },
          series:[{
            name:'Avec barbe',
            data:this.listdata(true)
          },{
            name:'Sans barbe',
            data:this.listdata(false)
          }]
        }
        Highcharts.chart("graph",this.options)
      })
  }

  ngOnInit(): void {
  }

  exposition(barbe:Boolean){
    var list=[]
    for(let i of this.historique.interventions){
      for(let p of i.porteurs){
        if(p.barbe==barbe){
          list.push(p.gaz)
        }
      }
    }
    return list
  }

  observations(){
    var listS=this.exposition(false)
    var listA=this.exposition(true)
    var moyS=0
    var moyA=0
    for(let m of listS){
      moyS=moyS+m
    }
    for(let m of listA){
      moyA=moyA+m
    }
    moyS=moyS/this.historique.interventions.length
    moyA=moyA/this.historique.interventions.length
    if(moyA>moyS && moyA-moyS>5){
      return "En moyenne, le port de la barbe réduit l'étanchéité du masque de "+(moyA-moyS)+" %."
    }else if(moyA<moyS && moyS-moyA>5){
      return "Le port de la barbe n'a pas d'impact sur l'étanchéité du masque. En revanche, on observe une meilleure étanchéité chez les individus portant la barbe, soit "+(moyS-moyA)+" % plus élevée en moyenne."
    }else{
      return "En moyenne, l'étanchéité du masque n'est pas impactée par le port ou non de la barbe."
    }
    return moyA+" "+moyS
  }

  nbIntervention(){
    var list=[]
    var nb=0
    for(let i of this.historique.interventions){
      nb=nb+1
      list.push(nb)
    }
    console.log(list)
    return list
  }

  listdata(barbe:Boolean){
    var data=[]
    for(let i of this.historique.interventions){
      for(let p of i.porteurs){
        if(p.barbe==barbe){
          data.push(p.gaz)
        }
      }
    }
    console.log(data)
    return data
  }

}
