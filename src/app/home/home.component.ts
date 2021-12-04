import { Component, OnInit } from '@angular/core';
import { Historique } from '../classfile';
import { RestserviceService } from '../restservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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

}
