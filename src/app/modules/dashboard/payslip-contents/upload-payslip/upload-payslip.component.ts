import { HttpClient } from '@angular/common/http';
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
  fileInfo;
  payslipForm: FormGroup;
  images: any;

  constructor(private pdfService: PdfService, private empService: EmployeeService,
     private formBuilder: FormBuilder, private payslipService: PaySlipService, private http: HttpClient) { }

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
      file: ['', [Validators.required]],
      fileSource: ['', [Validators.required]],
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

  async saveFile(files) {
    if(files != undefined && files.length > 0 && !!files[0].name != undefined) {
      // let result: any = await this.roomServ.uploadMenuImage("profileImage", files[0])
      //   this.fileInfo = result.DATA.data.Location;
      //   this.formUser['logo'] = this.fileInfo
      //   console.log(this.imageInfo)
    }
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // this.payslipForm.patchValue({
      //   fileSource: file
      // });
      this.images = file;
    }
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // this.images = file;
      this.payslipForm.patchValue({
        fileSource: file
      });
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.payslipForm.invalid) {
      console.log('invalid')
      return;
    }
    const formData = new FormData();
    formData.append('file', this.payslipForm.get('fileSource').value);
    // formData.append('file', this.images); 
    this.http.post<any>('http://localhost:3000/file', formData).subscribe(
         (res) => console.log(res),
         (err) => console.log(err)
    );
    // this.payslipService.uploadFile(formData).subscribe(
    //    (res) => console.log(res),
    //    (err) => console.log(err)
    // );
    // this.payslipService.createPayslip(this.payslipForm.value).subscribe(res => {
    //   this.has_error = false;
    //   console.log(res);
    //   this.create_payslip_req_msg = 'Payslip successfully submitted';
    //   this.payslipForm.reset();
    //   this.submitted = false;
    // }, error => {
    //   this.has_error = true;
    //   this.create_payslip_req_msg = error.error.message;
    // });
  }


}
