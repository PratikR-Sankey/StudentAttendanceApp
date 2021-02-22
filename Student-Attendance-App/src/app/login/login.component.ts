import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Observable, throwError } from 'rxjs';
import { Users } from '../users';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  angForm: FormGroup;
  constructor(private fb: FormBuilder,private dataService: ApiService,private router:Router) {
  this.angForm = this.fb.group({
  email: ['', [Validators.required,Validators.minLength(1), Validators.email]],
  password: ['', Validators.required]
  });
  }
  ngOnInit() {
  }
  postdata(angForm1:any)
  {
    //console.log(this.angForm.value);
  this.dataService.userlogin(angForm1.email,angForm1.password)
  .pipe(first())
  .subscribe(
  data => {
    console.log(data);
    alert(angForm1.value.email+"Is Successfully Logged In ")
  this.router.navigate(['/dashboard']);
  },
  error => {
  alert("User name or password is incorrect")
  }); 
  }
  get email() { return this.angForm.get('email'); }
  get password() { return this.angForm.get('password'); }
  }

