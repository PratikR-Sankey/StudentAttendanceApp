
import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Users } from './users';
import { Observable,throwError } from  'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  redirectUrl: string;
  baseUrl:string = "http://127.0.0.1:8080/login";
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  constructor(private httpClient : HttpClient) { }
  public userlogin(email, password) {
  alert(email)
  return this.httpClient.post<any>(this.baseUrl + '/login.php', { email, password })
  .pipe(map(Users => {
  this.setToken(Users[0].username);
  this.getLoggedInName.emit(true);
  return Users;
  }));
}
public userregistration(username,password,email,mobile,type,division) {
  return this.httpClient.post<any>(this.baseUrl + '/register.php', { username,password,email,mobile,type,division })
  .pipe(map(Users => {
  return Users;
  }));
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
    }
    getToken() {
    return localStorage.getItem('token');
    }
    deleteToken() {
    localStorage.removeItem('token');
    }
    isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
    return true
    }
    return false;
    }
}
