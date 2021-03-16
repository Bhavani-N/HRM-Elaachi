import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadFileService } from '../../../../services/upload-file.service';
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
  fileInfo;
  payslipForm: FormGroup;
  images: any;
  startYear: any;
  fileUrl: string;
  errorMsg: boolean;
  years = [];
  monthNames = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };

  constructor(private pdfService: PdfService, private empService: EmployeeService, private uploadService: UploadFileService,
    private formBuilder: FormBuilder, private payslipService: PaySlipService, private http: HttpClient) {
      this.errorMsg = false;
  }

  ngOnInit() {
    this.getYears();
    this.pdfSrc = this.pdfService.getPDF();
    this.empService.getAllEmployees().subscribe(res => {
      this.staffList = res;
      this.staffList = this.staffList.result;
      console.log(this.staffList)
    });
    this.payslipForm = this.formBuilder.group({
      staffId: [, Validators.required],
      month: ['',  Validators.required],
      year: ['', Validators.required],
      file: new FormArray([])
    })
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    const customizationArray = <FormArray>this.payslipForm.controls['file'];
    customizationArray.push(this.formBuilder.group({
      file: this.currentFileUpload.name
    }));
    console.log(this.payslipForm.value);
    // console.log(this.currentFileUpload.name)
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    })

    this.selectedFiles = undefined;
  }

  get f() {
    return this.payslipForm.controls;
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
    console.log(data);
  }

  getMonthData(data) {
    console.log(data);
  }

  onSubmit() {
    if (this.payslipForm.invalid) {
      console.log('invalid')
      return;
    }
    this.submitted = true;
    console.log(this.payslipForm.value);
    this.upload();
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


}
