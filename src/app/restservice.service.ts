import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Historique, Intervention, User, Users } from './classfile';
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

  getUsers():Observable<Users>{
    return this.http.get<Users>(this.server+"generic/users");
  }
  deleteUser(id:number):Observable<Users>{
    return this.http.put<Users>(this.server+"generic/deleteUser",id);
  }
  updateUser(user:User):Observable<Users>{
    return this.http.put<Users>(this.server+"generic/updateUser",user);
  }

  addUser(user:User):Observable<Users>{
    return this.http.put<Users>(this.server+"generic/addUser",user);
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

}
