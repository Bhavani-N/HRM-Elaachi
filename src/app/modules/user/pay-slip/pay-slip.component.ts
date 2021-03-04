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
  errorMsg;
  isPayslipSelected= false;
  sId: any;
  staffName: any;
  userDetails: any;
  src;
  // source = "JAN_Geethika_Payslip.pdf"

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, 
    private payslipService: PaySlipService, private auth: AuthService) { }

  ngOnInit() {
    this.userDetails = JSON.parse(this.auth.getUserDetails);
    this.sId=this.userDetails.staffId;
    console.log(this.sId, this.staffName)
    this.staffName = this.userDetails.firstName;
    this.getPayslipById(this.sId)
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

  saveAFile(): void {
    const dlink: HTMLAnchorElement = document.createElement('a');
    dlink.download = this.source; // the file name
    const myFileContent: string = 'I am a text file!';
    dlink.href = 'data:text/plain;charset=utf-16,' + myFileContent;
    dlink.click(); // this will trigger the dialog window
    dlink.remove();
  }

  getPayslipById(id) {
    if(id) {
      this.payslipService.getPayslipByStaff(id)
        .subscribe(
          data => {
            console.log(data)
            this.selectedPay = data;
            this.selectedPay=this.selectedPay.data;
            console.log(this.selectedPay)
            this.src = this.selectedPay.fileChosen;
            console.log(this.src)
            this.selectedStaff = this.selectedPay.staffId;
            this.selectedStaff.map(res => {
              console.log(res)
              this.selectedStaff = res
            })
            console.log(this.selectedStaff);
            // console.log("Selected Leave Type data: ", data);
          },
          error => this.errorMsg = error);
    } else {
      this.isPayslipSelected = false;
    }
  }


}
