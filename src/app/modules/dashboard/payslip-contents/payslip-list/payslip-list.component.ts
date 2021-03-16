import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadFileService } from '../../../../services/upload-file.service';
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

  showFile = false;
  fileUploads: Observable<string[]>;

  constructor( private payslipService: PaySlipService, private uploadService: UploadFileService) { }

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

  showFiles(enable: boolean) {
    this.showFile = enable;

    if (enable) {
      this.fileUploads = this.uploadService.getFiles();
    }
  }

  getAllEmployees() {
    this.payslipService.getAllPayslips(this.currentPage).subscribe(
      data => {
        this.payList = data;
        this.payList = data.result;
        console.log(this.payList)
        this.payList.map(staffData => {
          console.log(staffData)
          console.log(staffData.staffId.firstName)
        })
        this.totalElements = data.result;
        this.loading = false;
      },
      error => this.errorMsg = error
    );
  }

  delete(id: string) {
    const payslips = this.payList.find(x => x._id === id);
    if (!payslips) return;
    this.payslipService.deletePayslip(id)
      .subscribe(() => this.payList = this.payList.filter(x => x._id !== id));
  }
}
