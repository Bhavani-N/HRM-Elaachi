import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { PaySlipService } from '../../../services/payslip.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pay-slip',
  templateUrl: './pay-slip.component.html',
  styleUrls: ['./pay-slip.component.css']
})
export class PaySlipComponent implements OnInit {
  data: [][];
  source = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  selectedPay: any;
  selectedStaff: any;
  private id: any;
  errorMsg;
  isPayslipSelected= false;
  private sub: any;
  startYear: any;
  src;
  years = [];
  selectedMonth: string;
  selectedYear;
  selectMonth;
  selectYear;
  monthNames = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,
    private payslipService: PaySlipService, private auth: AuthService) { }

  ngOnInit() {
    this.getYears();
    this.routeId();
  }

  routeId() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      this.getPayslipByStaffId(this.id);
    });
  }

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);

    if(target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb:XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      const wsname: string = wb.SheetNames[0];

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      console.log(ws);
      this.data = (XLSX.utils.sheet_to_json(ws, {header: 1}));
      console.log(this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  getYears() {
    const currentYear = new Date().getFullYear();
    this.startYear = this.startYear || 2000;
    while (this.startYear <= currentYear ) {
        this.years.push(this.startYear++);
    }
    console.log(this.years);
    return this.years;
  }

  getData(data) {
    console.log(data);
  }

  getYearData(data) {
    this.selectMonth = data;
    alert(this.selectMonth);
  }

  getMonthData(data) {
    this.selectYear = data;
    alert(this.selectYear);
  }

  getPayslipByStaffId(id) {
    if(id) {
      console.log('working', id)
      this.payslipService.getPayslipByStaffId(id)
        .subscribe(
          data => {
            console.log(data)
            this.selectedPay = data;
            this.selectedPay=this.selectedPay.result;
            console.log(this.selectedPay)
          },
          error => this.errorMsg = error);
    } else {
      this.isPayslipSelected = false;
    }
  }


}
