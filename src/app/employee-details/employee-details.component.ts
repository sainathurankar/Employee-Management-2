import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../Shared/api.service';
import { Employee } from './employee';
import { EmployeeInterface } from './employeeInterface';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  employees: EmployeeInterface[] = [];
  addBtn!: boolean;
  updateBtn!: boolean;
  formValue!: FormGroup;
  clickedId: number = 0;
  modal_title: string = 'Add Employee';
  private _listFilter: string = '';

  filteredEmployees: EmployeeInterface[] = this.employees;

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    console.log('In setter: ', value);
    this.filteredEmployees = this.performFilter(value);
  }
  setListFilter(value: string) {
    this._listFilter = value;
    console.log('Setting: ', value);
    this.filteredEmployees = this.performFilter(value);
  }

  employee: Employee = new Employee();

  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      salary: [''],
      age: [''],
      profilePic: [''],
    });

    this.getAllEmployees();
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
        alert('added');
        this._listFilter = '';
        this.formValue.reset();
        this.getAllEmployees();
        document.getElementById('back')!.click();
      },
      (err) => {
        alert('wrong');
      }
    );
  }

  getAllEmployees() {
    this.api.getEmployee().subscribe((res) => {
      this.employees = res.data;
      this.filteredEmployees = this.employees;
    });
  }

  EditEmployee(Employee: EmployeeInterface) {
    this.modal_title = 'Update Employee';
    this.addBtn = false;
    this.updateBtn = true;
    this.clickedId = Employee.id;
    this.formValue.controls['name'].setValue(Employee.employee_name);
    this.formValue.controls['age'].setValue(Employee.employee_age);
    this.formValue.controls['salary'].setValue(Employee.employee_salary);
    this.employee.profile_image = Employee.profile_image;
  }

  UpdateEmployee() {
    this.employee.employee_name = this.formValue.value.name;
    this.employee.employee_age = this.formValue.value.age;
    this.employee.employee_salary = this.formValue.value.salary;
    this.employee.profile_image = this.formValue.value.profilePic
      ? '/assets/' + this.formValue.value.profilePic.split('\\')[2]
      : this.employee.profile_image;

    this.api.updateEmployee(this.employee, this.clickedId).subscribe(
      (res) => {
        console.log(res);
        alert('Updated');
        this.formValue.reset();
        this.getAllEmployees();
        this.setListFilter(this._listFilter);
        document.getElementById('back')!.click();
      },
      (err) => {
        alert('wrong');
      }
    );
  }
  performFilter(value: string): EmployeeInterface[] {
    value = value.toLowerCase();
    return this.employees.filter((employee: EmployeeInterface) =>
      employee.employee_name.toLowerCase().includes(value)
    );
  }
  addClicked() {
    this.modal_title = 'Add Employee';
    this.addBtn = true;
    this.updateBtn = false;
    this.formValue.reset();
  }

  paginate(event: any) {
    console.log(event);
  }
}
