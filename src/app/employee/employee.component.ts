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
  // employees: Employee[];
  closeResult: string;
  id: number;
  employees: any = [];
  employeeDetails: any = [];
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
    this.httpClient.get<any>('http://dummy.restapiexample.com/api/v1/employee/' + id).subscribe(
      response => {
        console.log(id);
        console.log(response);
        this.id = id;
        this.employeeDetails = response;
      }
    )
  }

  // NgbModal form functions
  open(content:any) {
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

//   openDetails(targetModal: any, employee: Employee) {
//     this.modalService.open(targetModal, {
//      centered: true,
//      backdrop: 'static',
//      size: 'lg'
//    });
//     document.getElementById('name').setAttribute('value', employee.employee_name);
//     document.getElementById('salary').setAttribute('value', employee.employee_salary);
//     document.getElementById('age').setAttribute('value', employee.employee_age);
//     document.getElementById('image').setAttribute('value', employee.profile_image);
    
//  }

}
