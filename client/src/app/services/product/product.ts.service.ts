import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
const PRODUCT_API = 'http://localhost:3000/api/product/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ProductTsService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(PRODUCT_API, httpOptions);
  }

  getProductId(Code: string): Observable<any> {
    return this.http.get(PRODUCT_API + Code, httpOptions);
  }

  saveProduct(
   product: Product
  ): Observable<any> {
    return this.http.post(
      PRODUCT_API,
      product
    );
  }

  updateProduct(Code: string, product: Product): Observable<any> {
    return this.http.put(PRODUCT_API + Code,  product );
  }

  deleteProduct(Code: number): Observable<any> {
    return this.http.delete(PRODUCT_API + Code);
  }
}
