import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../../models/client/client';

const CLIENT_API = 'http://localhost:3000/api/client/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) {}

  getClients(): Observable<any>{
    return this.http.get(CLIENT_API, httpOptions)
  }

  getClientId(Code: string): Observable<any>{
    return this.http.get(CLIENT_API + Code, httpOptions)
  }

  saveClient(client: Client): Observable<any>{
    return this.http.post(CLIENT_API, client, httpOptions)
  }

  updateClient(Code:string, client: Client): Observable<any>{
    return this.http.put(CLIENT_API + Code, client, httpOptions)
  }

  deleteClient(Code: number): Observable<any>{
    return this.http.delete(CLIENT_API + Code, httpOptions)
  }

}
