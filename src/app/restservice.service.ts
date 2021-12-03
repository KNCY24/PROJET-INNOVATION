import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Historique, Intervention } from './historique';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestserviceService {

  server : string ="http://localhost:8080/"
  constructor(private http: HttpClient) { }
    
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getHistorique(): Observable<Historique>{
    return this.http.get<Historique>(this.server+"generic/interventions");
  }

  getIntervention(id:number):Observable<Intervention>{
    return this.http.put<Intervention>(this.server+"generic/intervention",id);
  }

  addIntervention(intervention:Intervention):Observable<Historique> {
    return this.http.put<Historique>(this.server+"generic/addIntervention",intervention);
  }

  updateIntervention(id:number):Observable<Historique> {
    return this.http.put<Historique>(this.server+"generic/updateIntervention",id);
  }

}
