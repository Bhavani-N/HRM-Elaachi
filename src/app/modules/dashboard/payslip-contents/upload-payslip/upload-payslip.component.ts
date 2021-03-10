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
  fileObj: File;
  fileUrl: string;
  errorMsg: boolean;

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };

  constructor(private pdfService: PdfService, private empService: EmployeeService, private uploadService: UploadFileService,
    private formBuilder: FormBuilder, private payslipService: PaySlipService, private http: HttpClient) { 
      this.errorMsg = false;
  }

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
      // file: ['', [Validators.required]],
      // fileSource: ['', [Validators.required]],
      file: new FormArray([])
    })
  } 

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });

    this.selectedFiles = undefined;
  }

  get f() {
    return this.payslipForm.controls;
  }

  getData(data) {
    console.log(data);
  }

  onFilePicked(event: Event): void {
    this.errorMsg = false
    console.log(event);
    const FILE = (event.target as HTMLInputElement).files[0];
    this.fileObj = FILE;
    console.log(this.fileObj);
  }

  onFileUpload() {
    if (!this.fileObj) {
      this.errorMsg = true
      return
    }
    const fileForm = new FormData();
    fileForm.append('file', this.fileObj);
    this.payslipService.fileUpload(fileForm).subscribe(res => {
      this.fileUrl = res['image'];
    });
  }

  async savePDF(files: any) {
    if (
      files != undefined &&
      files.length > 0 &&
      !!files[0].name != undefined
    ) {
      for (let index = 0; index < files.length; index++) {
        let result: any = await this.payslipService.uploadPdf("PDF", files[index])
        const customizationArray = <FormArray>this.payslipForm.controls['file'];
        console.log(customizationArray)
        console.log(result.DATA.data.Location);
        customizationArray.push(this.formBuilder.group({
          file: result.DATA.data.Location,
        }));
      }
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
