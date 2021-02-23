
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
  baseUrl:string = "http://localhost/StudentAttendanceApp/Student-Attendance-App/Backend/";
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  constructor(private httpClient : HttpClient) { }
  public userlogin(mail, pwd) {
  return this.httpClient.post<any>(this.baseUrl + '/login.php',{"email":mail,"password":pwd})
  .pipe(map(Users => {
   this.setToken(Users.username);
   this.getLoggedInName.emit(true);
   console.log(Users);
   return Users;
   }));
}
public userregistration(username,password,email,mobile,type,division) {
  return this.httpClient.post<any>(this.baseUrl + '/register.php', { "username":username,"password":password,"email":email,"mobile":mobile,"type":type,"division":division })
  .pipe(map(Users => {
  return Users;
  }));
  }
  public selstudent(division) {
    return this.httpClient.post<any>(this.baseUrl + '/1.php',{"division":division})
    .pipe(map(Users => {
     return Users;
     }));
  }
  public createbatch(s_name,s_division,s_student_list,s_date,s_time,s_type)
  {
    return this.httpClient.post<any>(this.baseUrl + '/createsession.php', { "s_name":s_name,"s_division":s_division,"s_student_list":'pratik',"s_date":s_date,"s_time":s_time,"s_type":s_type})
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
