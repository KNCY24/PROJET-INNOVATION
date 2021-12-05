import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { readFile } from 'fs';
import { RestserviceService } from '../restservice.service';
import { CSVRecord } from '../CSVModel';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public records: any[] = [];

  isPopup=false;
  username:any=""
  statut:any="" 
  fileInput:any=""

  constructor(private service:RestserviceService,private router:Router) {
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('name')){
      this.username=String(sessionStorage.getItem('name'))
    }else{
      this.router.navigate([''])
    }
    if(sessionStorage.getItem('statut')){
      this.statut=sessionStorage.getItem('statut')
    }
  }

  readFile(){
    /*this.fileInput = document.getElementById("csv")
    this.fileInput?.addEventListener('change',this.readFile)*/
    var reader = new FileReader()
    const div=(<HTMLDivElement>document.getElementById('out'))
    reader.onload=function(){
      div.innerHTML=""+reader.result
    }
    reader.readAsBinaryString(this.fileInput.files[0])
  }

  home() {
    this.router.navigate(['/home'])
  }

  logout(){
    sessionStorage.clear()
    this.router.navigate([''])
  }

  showPopup(){
    this.isPopup=true;
  }

  closePopup(){
    this.isPopup=false;
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any){
    let csvArr = [];
    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        let csvRecord: CSVRecord = new CSVRecord();
        csvRecord.id = curruntRecord[0].trim();
        csvRecord.firstName = curruntRecord[1].trim();
        csvRecord.lastName = curruntRecord[2].trim();
        csvRecord.age = curruntRecord[3].trim();
        csvRecord.position = curruntRecord[4].trim();
        csvRecord.mobile = curruntRecord[5].trim();
        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }
  
  importData(){
    var reader = new FileReader()
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = _ => {
      //let files =   Array.from(input.files);
      let fichier :any= input.files
      console.log(fichier[0]);
      reader.readAsText(fichier[0])
      reader.onload=()=>{
        let csvData = reader.result
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
        let headersRow = this.getHeaderArray(csvRecordsArray)

        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray,headersRow.length)
      }
    };
    input.click();
  }

}
