import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaySlipService } from '../../../../services/payslip.service';
import { UploadFileService } from '../../../../services/upload-file.service';

@Component({
  selector: 'app-payslip-details',
  templateUrl: './payslip-details.component.html',
  styleUrls: ['./payslip-details.component.css']
})
export class PayslipDetailsComponent implements OnInit {
  private id: number;
  private sub: any;
  selectedPay: any;
  selectedStaff: any;
  selectedFile: any;
  isPayslipSelected= false;
  monthNames = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];
  @Input() fileUpload: string;

  minDate;
  isEdit = false;
  startYear: any;
  years = [];
  errorMsg;
  pay_update_msg;
  has_error = false;
  submitted = false;
  payUpdateForm: FormGroup;
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,  private uploadService: UploadFileService,
    private payslipService: PaySlipService) { }

  ngOnInit() {
    this.routeId();
    this.getYears();
  }

  routeId() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      this.getPayslipById(this.id);
    });
  }

  getYears() {
    const currentYear = new Date().getFullYear();
    this.startYear = this.startYear || 2000;  
    while (this.startYear <= currentYear ) {
        this.years.push(this.startYear++);
    }
    return this.years;
  }

  initPayUpdateForm() {
    this.minDate = new Date();
    this.payUpdateForm = this.formBuilder.group({
      staffId: [this.selectedStaff._id],      
      month: [this.selectedPay.month],
      year: [this.selectedPay.year],
      file: new FormArray([])
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    const customizationArray = <FormArray>this.payUpdateForm.controls['file'];
    customizationArray.push(this.formBuilder.group({
      file: this.currentFileUpload.name
    }));
    console.log(this.payUpdateForm.value);
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

  toggleEdit() {
    this.isEdit = !this.isEdit;
    if (this.isEdit) {
      this.initPayUpdateForm();
    }
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

  getPayslipById(id) {
    if (id ) {
      this.payslipService.getPayslipById(id)
        .subscribe(
          data => {
            console.log(data)
            this.selectedPay = data;
            this.selectedPay=this.selectedPay.result;
            this.selectedStaff = this.selectedPay.staffId;
            this.selectedStaff.map(res => {
              this.selectedStaff = res
            })
            this.selectedFile = this.selectedPay.file;
            this.selectedFile.map(res => {
              console.log(res)
              this.selectedFile = res
            })
            this.isPayslipSelected = true;
            console.log("Selected Payslip data: ", data);
          },
          error => this.errorMsg = error);
    } else {
      this.isPayslipSelected = false;
    }
  }

  get f() { return this.payUpdateForm.controls; }

  onSubmit() {
    // stop here if form is invalid
    if (this.payUpdateForm.invalid) {
      return;
    }
    this.submitted = true;
    console.log(this.payUpdateForm.value);
    this.upload();
    this.payslipService.updatePayslip(this.payUpdateForm.value, this.id).subscribe(res => {
      console.log(res);
      this.has_error = false;
      this.selectedPay = res;
      this.selectedPay=this.selectedPay.result;
      this.pay_update_msg = 'Update Successful';
      this.payUpdateForm.reset();
      this.submitted = false;
    }, error => {
      this.has_error = true;
      this.pay_update_msg = error.error.message;
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
