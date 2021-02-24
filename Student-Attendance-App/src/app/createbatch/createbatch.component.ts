import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormArray, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Observable, pipe, throwError } from 'rxjs';
import { Users } from '../users';



@Component({
  selector: 'app-createbatch',
  templateUrl: './createbatch.component.html',
  styleUrls: ['./createbatch.component.css']
})
export class CreatebatchComponent implements OnInit {
  angForm: FormGroup;
  orders = [];
  message = null;
  public newTime:string='13:30';
  s_time = { hour: 13, minute: 30 };
  //meridian = false;
  constructor(private fb: FormBuilder,private dataService: ApiService,private router:Router) {
    this.angForm = this.fb.group({
      s_name: ['', [Validators.required]],
      s_division: ['', [Validators.required]],
      s_student_list:['',Validators.required],
      s_date: ['', [Validators.required]],
      s_time: ['', [Validators.required]],
      s_type: ['', [Validators.required]],
      }); 
   }

  ngOnInit(): void {
  }

   
  postdata(angForm1:any)
  {
    this.dataService.createbatch(angForm1.s_name,angForm1.s_division,angForm1.s_date,this.newTime,angForm1.s_type)
  .pipe(first())
  .subscribe(
  data => {
    this.message = data.status;
    console.log(this.message);
    //console.log(data);
    if(this.message=="200")
      {
    alert(" Batch "+angForm1.s_name +" is  Created Successfully")
  //this.router.navigate(['/dashboard']);
      }
  },
  error => {
    console.log(error)
  alert("Batch Failed To Create")
  }); 
  }
  changeWebsite(e) {

    console.log(e.target.value);
    this.dataService.selstudent(e.target.value).subscribe(
      data => {
        console.log(data);
        this.orders=data;
        console.log(this.orders);        
      },
      error => {
        console.log(error)
      alert("incorrect")
      });
  }
  onTimeChange(value:{hour:string,minute:string})
  {
     console.log(value)
     this.newTime=`${value.hour}:${value.minute}`;
  }
}
