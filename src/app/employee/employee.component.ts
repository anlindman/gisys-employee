import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export class Employee {
  constructor(
    public id: number,
    public employee_name: string,
    public employee_salary: number,
    public employee_age: number,
    public profile_image: string
  ) {
  }
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[];
  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.getEmployees();
  }
  
  getEmployees() {
    this.httpClient.get<any>('http://dummy.restapiexample.com/api/v1/employees').subscribe(
      response => {
        console.log(response);
        this.employees = response;
      }
    );
  }

}
