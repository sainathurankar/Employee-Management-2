import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../Shared/api.service';
import { EmployeeInterface } from './employeeInterface';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {

  employees: EmployeeInterface[] = [];

  private _listFilter: string = '';

  filteredEmployees: EmployeeInterface[] = this.employees;

  pageOfItems: EmployeeInterface[] = [];

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    console.log('In setter: ', value);
    this.filteredEmployees = this.performFilter(value);
  }

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    console.log('on init');
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.api.getEmployee().subscribe(
      (res) => {
        this.employees = res.data;
        this.filteredEmployees = this.employees;
      },
      (err) => {
        alert('Unable to fetch data from server');
      }
    );
  }

  performFilter(value: string): EmployeeInterface[] {
    value = value.toLowerCase();
    return this.employees.filter((employee: EmployeeInterface) =>
      employee.employee_name.toLowerCase().includes(value)
    );
  }

  onChangePage(pageOfItems: EmployeeInterface[]) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

}
