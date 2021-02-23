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
  ordersData = [];
  //meridian = false;
  constructor(private fb: FormBuilder,private dataService: ApiService,private router:Router) {
    this.angForm = this.fb.group({
      s_name: ['', [Validators.required]],
      s_division: ['', [Validators.required]],
      studentlist:new FormArray([]),
      s_date: ['', [Validators.required]],
      s_time: ['', [Validators.required]],
      s_type: ['', [Validators.required]],
      }); 
     // this.addcheckboxes();
     
   }

  ngOnInit(): void {
  }

   
  postdata(angForm1:any)
  {
    this.dataService.createbatch(angForm1.s_name,angForm1.s_division,angForm1.s_student_list,angForm1.s_date,angForm1.s_time,angForm1.s_type)
  .pipe(first())
  .subscribe(
  data => {
    console.log(data);
    alert(" Session "+angForm1.s_name +" is  Created Successfully")
  //this.router.navigate(['/dashboard']);
  },
  error => {
    console.log(error)
  alert("Batch Failed To Create")
  }); 
  }
  selectChangeHandler (event: any) {
   this.dataService.selstudent(event.target.value).subscribe(
  data => {
    console.log(data);
  },
  error => {
    console.log(error)
  alert("incorrect")
  });
  }

   private addcheckboxes()
     {
    this.ordersData.forEach((o, i) => 
    {
        const control = new FormControl(i === 0); 
      (this.angForm.controls.orders as FormArray).push(control);
    });
  }

}
