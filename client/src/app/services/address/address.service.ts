import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../../models/address/address';

const ADDRESS_API = 'http://localhost:3000/api/address/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};


@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) {}

  getAddress(): Observable<any>{
    return this.http.get(ADDRESS_API, httpOptions)
  }

  getAddressId(Code: string): Observable<any>{
    return this.http.get(ADDRESS_API + Code, httpOptions)
  }

  saveAddress(address: Address): Observable<any>{
    return this.http.post(ADDRESS_API, address, httpOptions)
  }

  updateAddress(Code:string, address: Address): Observable<any>{
    return this.http.put(ADDRESS_API + Code, address, httpOptions)
  }

  deleteAddress(Code: number): Observable<any>{
    return this.http.delete(ADDRESS_API + Code, httpOptions)
  }
}
