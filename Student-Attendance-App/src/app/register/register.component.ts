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
  constructor(private fb: FormBuilder,private dataService: ApiService,private router:Router) {
  this.angForm = this.fb.group({
  username: ['', Validators.required],
  password: ['', Validators.required],
  email: ['', [Validators.required,Validators.minLength(1), Validators.email]],
  mobile: ['', Validators.required],
  type: ['', Validators.required],
  division: ['', Validators.required]
  });
  }
  
  ngOnInit() {
  }
  postdata(angForm)
  {
    
  this.dataService.userregistration(angForm.value.username,angForm.value.password,angForm.value.email,angForm.value.mobile,angForm.get('type').value,angForm.value.division)
  .pipe(first())
  .subscribe(
  data => {
    alert(angForm.value.email+"Is Successfully Registered ")
    const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/login';
    this.router.navigate([redirect]);
  },
  error => {
  });
  }
  
  get email() { return this.angForm.get('email'); }
  get password() { return this.angForm.get('password'); }
  get username() { return this.angForm.get('username'); }
  get mobile() { return this.angForm.get('mobile'); }
  get type() { return this.angForm.get('type'); }
  get division() { return this.angForm.get('division'); }
  }