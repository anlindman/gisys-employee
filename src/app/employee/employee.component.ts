import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

export class Employee {
  constructor(
    public id: number,
    public employee_name: string,
    public employee_salary: string,
    public employee_age: string,
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
  closeResult: string;
  id: number;
  employees: any = [];
  employeeDetails: any = [];
  model: Employee;
  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal
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

  getEmployeeDetails(id: any) {
    this.httpClient.get<Employee>('http://dummy.restapiexample.com/api/v1/employee/' + id).subscribe(
      employeeDetails => {
        console.log("Selected id: " + id);
        console.log(employeeDetails);
        this.id = id;
        this.employeeDetails = employeeDetails;
      }
    );
  }

  // NgbModal functions
  open(content:any, id: any) {
    console.log("Popup loaded");
    this.httpClient.get<any>('http://dummy.restapiexample.com/api/v1/employee/' + id).subscribe(
      response => {
        console.log("Selected id: " + id);
        this.id = id;
        this.employeeDetails = response.data;
        console.log(this.employeeDetails);
        this.model = new Employee(
          this.employeeDetails.id,
          this.employeeDetails.employee_name,
          this.employeeDetails.employee_salary,
          this.employeeDetails.employee_age,
          this.employeeDetails.profile_image
        );
        console.log(this.model);
      }
    )
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
