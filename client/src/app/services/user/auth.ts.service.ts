import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3000/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthTsService {
  constructor(private http: HttpClient) {}

  login(UserName: string, Password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'login',
      {
        UserName,
        Password,
      },
      httpOptions
    );
  }

  register(UserName: string, Password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'register',
      {
        UserName,
        Password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'logout', {}, httpOptions);
  }
}
