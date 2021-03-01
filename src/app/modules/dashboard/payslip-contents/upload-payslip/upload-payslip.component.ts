import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../../../services/employee.service';
import { PaySlipService } from '../../../../services/payslip.service';
import { PdfService } from '../../../../services/pdf.service';
declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-upload-payslip',
  templateUrl: './upload-payslip.component.html',
  styleUrls: ['./upload-payslip.component.css']
})
export class UploadPayslipComponent implements OnInit {
  page: number = 1;
  pdfSrc: string = '';
  create_payslip_req_msg: string;
  public has_error = false;
  uploadSuccess: boolean;
  fileToUpload: File = null;
  staffList:any;
  submitted = false;
  payslipForm: FormGroup;

  constructor(private pdfService: PdfService, private empService: EmployeeService,
     private formBuilder: FormBuilder, private payslipService: PaySlipService) { }

  ngOnInit() {
    this.pdfSrc = this.pdfService.getPDF();

    this.empService.getAllEmployees().subscribe(res => {
      this.staffList = res;
      this.staffList = this.staffList.result;
      console.log(this.staffList)
    });
    this.payslipForm = this.formBuilder.group({
      staffId: [, Validators.required],
      dateIssued: ['',  Validators.required],
      fileChosen: ['']
    })

  } 

  get f() {
    return this.payslipForm.controls;
  }

  getData(data) {
    console.log(data);
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  upload(files: File[]) {
    this.uploadAndProgress(files);
  }

  uploadAndProgress(files: File[]){
    console.log(files);
    let formData = new FormData();
    Array.from(files).forEach(f => formData.append('file', f))
    console.log(formData)
  }

  onSubmit() {
    this.submitted = true;
    if (this.payslipForm.invalid) {
      console.log('invalid')
      return;
    }
    this.payslipService.createPayslip(this.payslipForm.value).subscribe(res => {
      this.has_error = false;
      console.log(res);
      this.create_payslip_req_msg = 'Payslip successfully submitted';
      this.payslipForm.reset();
      this.submitted = false;
    }, error => {
      this.has_error = true;
      this.create_payslip_req_msg = error.error.message;
    });
  }

  onFileSelected() {
    let img: any = document.querySelector("#file");

    if(typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      }
      reader.readAsArrayBuffer(img.files[0]);
    }
  }

}
