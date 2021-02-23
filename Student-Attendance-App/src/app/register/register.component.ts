import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Users } from '../users';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  angForm: FormGroup;
  get email() { return this.angForm.get('email'); }
  get password() { return this.angForm.get('password'); }
  get username() { return this.angForm.get('username'); }
  get mobile() { return this.angForm.get('mobile'); }
  get type() { return this.angForm.get('type'); }
  get division() { return this.angForm.get('division'); }
  constructor(private fb: FormBuilder,private dataService: ApiService,private router:Router) {
  this.angForm = this.fb.group({
  username: ['', [Validators.required]],
  password: ['', [Validators.required]],
  email: ['', [Validators.required,Validators.minLength(1), Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
  mobile: ['',[ Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
  type: ['', [Validators.required]],
  division: [['', Validators.required]],
  });
  }
  
  ngOnInit() {
  }
  postdata(angForm1:any)
  {
    
  this.dataService.userregistration(angForm1.username,angForm1.password,angForm1.email,angForm1.mobile,angForm1.type,angForm1.division)
  .pipe(first())
  .subscribe(
  data => {
    alert(angForm1.email+"Is Successfully Registered ")
    //const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/login';
    this.router.navigate(['/login']);
  },
  error => {
    alert("Something Went Wrong")
  });
  }
  
  
  }