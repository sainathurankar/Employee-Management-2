import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Employee } from '../employee-details/employee';
import { ApiService } from '../Shared/api.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})


export class AddEmployeeComponent implements OnInit {
  employee: Employee = new Employee();
  constructor(private formBuilder: FormBuilder, private api: ApiService) {}
  modal_title: string = 'Add Employee';
  formValue!: FormGroup;

  ngOnInit(): void {
    console.log('on init-add');
    this.formValue = this.formBuilder.group({
      name: [''],
      salary: [''],
      age: [''],
      profilePic: [''],
    });
  }

  postEmployee() {
    this.employee.employee_name = this.formValue.value.name;
    this.employee.employee_age = this.formValue.value.age;
    this.employee.employee_salary = this.formValue.value.salary;
    this.employee.profile_image =
      '/assets/' +
      (this.formValue.value.profilePic
        ? this.formValue.value.profilePic.split('\\')[2]
        : 'profile.png');
    console.log(this.formValue.controls.salary.value);

    this.api.postEmployee(this.employee).subscribe(
      (res) => {
        console.log(res);
        alert('Added Successfully');
        this.formValue.reset();
        document.getElementById('back')!.click();
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }
}
