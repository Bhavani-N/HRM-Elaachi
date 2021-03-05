import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../../services/employee.service';
import { PaySlipService } from '../../../../services/payslip.service';

@Component({
  selector: 'app-payslip-list',
  templateUrl: './payslip-list.component.html',
  styleUrls: ['./payslip-list.component.css']
})
export class PayslipListComponent implements OnInit {
  currentPage = 1;
  payList: any;
  loading = true;
  errorMsg;
  size = 10;
  sortKey = 'fromDate';
  reverse = false;
  totalElements;

  constructor( private payslipService: PaySlipService) { }

  ngOnInit() {
    this.getAllEmployees();
  }

  getPage(page: number) {
    this.loading = true;
    this.currentPage = page; 
    this.getAllEmployees();
  }

  sort(key: string) {
    this.loading = true;
    this.sortKey = key + ','.concat(this.reverse ? 'DESC' : 'ASC');
    this.reverse = !this.reverse;
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.payslipService.getAllPayslips(this.currentPage).subscribe(
      data => {
        this.payList = data;
        this.payList = data.result;
        console.log(this.payList)
        this.payList.map(staffData => {
          console.log(staffData)
          staffData.staffId.map(res => {
            console.log(res);
          })
        })
        this.totalElements = data.result;
        this.loading = false;
      },
      error => this.errorMsg = error
    );
  }


}
