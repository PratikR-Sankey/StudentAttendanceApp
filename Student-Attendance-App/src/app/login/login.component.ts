import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Observable, pipe, throwError } from 'rxjs';
import { Users } from '../users';
import { ForgotpasswordComponent } from '../forgotpassword/forgotpassword.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  angForm: FormGroup;
  get primEmail(){
    return this.angForm.get('email')
    }
    get pass(){
      return this.angForm.get('password')
      }
  constructor(private fb: FormBuilder,private dataService: ApiService,private router:Router) {
  this.angForm = this.fb.group({
  email: ['', [Validators.required,Validators.minLength(1), Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
  password: ['', Validators.required]
  });
  }
  ngOnInit() {
  }
  postdata(angForm1:any)
  {
    console.log(this.angForm.value);
  this.dataService.userlogin(angForm1.email,angForm1.password)
  .pipe(first())
  .subscribe(
  data => {
    console.log(data);
    if(data.Status == 200)
    {
      alert(angForm1.email+"Is Successfully Logged In ")
  this.router.navigate(['/dashboard']);
    }
    
  },
  error => {
    console.log(error)
  alert("User name or password is incorrect")
  }); 
  }
  get email() { return this.angForm.get('email'); }
  get password() { return this.angForm.get('password'); }
  clickme(){
    this.router.navigate(['/forgotpass']);
  }
  }

