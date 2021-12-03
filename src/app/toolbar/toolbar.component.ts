import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestserviceService } from '../restservice.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  isPopup=false;

  constructor(private service:RestserviceService,private router:Router) { }

  ngOnInit(): void {
  }

  home() {
    this.router.navigate(['/home'])
  }

  showPopup(){
    this.isPopup=true;
  }

  closePopup(){
    this.isPopup=false;
  }
  
  importData(){
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = _ => {
      //let files =   Array.from(input.files);
      //console.log(files);
    };
    input.click();
  }

}
