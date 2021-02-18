import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

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
  this.dataService.userregistration(angForm.value.username,angForm.value.password,angForm.value.email,angForm.value.mobile,angForm.value.type,angForm.value.division)
  .pipe(first())
  .subscribe(
  data => {
  this.router.navigate(['login']);
  },
  
  error => {
  });
  }
  
  get email() { return this.angForm.get('email'); }
  get password() { return this.angForm.get('password'); }
  get name() { return this.angForm.get('username'); }
  get mobile() { return this.angForm.get('mobile'); }
  get type() { return this.angForm.get('type'); }
  get division() { return this.angForm.get('division'); }
  }