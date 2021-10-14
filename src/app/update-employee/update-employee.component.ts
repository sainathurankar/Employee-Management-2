import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../employee-details/employee';
import { ApiService } from '../Shared/api.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {
  employee: Employee = new Employee();
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private api: ApiService
  ) {}

  modal_title: string = 'Update Employee';
  formValue!: FormGroup;

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      salary: [''],
      age: [''],
      profilePic: [''],
    });
    console.log('on init-update');
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getEmployeeById(id).subscribe((res) => {
      this.employee = res.data;
      console.log(this.employee);
      this.form();
    });
    
  }

  form(){
    this.formValue.controls['name'].setValue(this.employee.employee_name);
    this.formValue.controls['age'].setValue(this.employee.employee_age);
    this.formValue.controls['salary'].setValue(this.employee.employee_salary);
    this.employee.profile_image = this.employee.profile_image;
  }

  UpdateEmployee() {
    this.employee.employee_name = this.formValue.value.name;
    this.employee.employee_age = this.formValue.value.age;
    this.employee.employee_salary = this.formValue.value.salary;
    this.employee.profile_image = this.formValue.value.profilePic
      ? '/assets/' + this.formValue.value.profilePic.split('\\')[2]
      : this.employee.profile_image;

    this.api.updateEmployee(this.employee, Number(this.route.snapshot.paramMap.get('id'))).subscribe(
      (res) => {
        console.log(res);
        alert('Updated');
        this.formValue.reset();
        document.getElementById('back')!.click();
        
      },
      (err) => {
        alert('Something went wrong');
      }
    );
}
}
