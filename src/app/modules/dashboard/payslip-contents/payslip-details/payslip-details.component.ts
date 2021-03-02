import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaySlipService } from 'src/app/services/payslip.service';

@Component({
  selector: 'app-payslip-details',
  templateUrl: './payslip-details.component.html',
  styleUrls: ['./payslip-details.component.css']
})
export class PayslipDetailsComponent implements OnInit {
  private id: number;
  private sub: any;
  selectedPay: any;
  isPayslipSelected= false;

  minDate;
  isEdit = false;
  errorMsg;
  pay_update_msg;
  has_error = false;
  submitted = false;
  payUpdateForm: FormGroup;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, 
    private payslipService: PaySlipService) { }

  ngOnInit() {
    this.routeId();
  }

  routeId() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      this.getPayslipById(this.id);
    });
  }

  initPayUpdateForm() {
    this.minDate = new Date();
    this.payUpdateForm = this.formBuilder.group({
      projectCode: [this.selectedPay.projectCode],      
      projectName: [this.selectedPay.projectName, [Validators.required, Validators.minLength(3)]],
      startDate: [this.selectedPay.startDate],
      endDate: [this.selectedPay.endDate]
    });
  }

  toggleEdit() {
    this.isEdit = !this.isEdit;
    if (this.isEdit) {
      this.initPayUpdateForm();
    }
  }

  getPayslipById(id) {
    if (id ) {
      this.payslipService.getPayslipById(id)
        .subscribe(
          data => {
            console.log(data)
            this.selectedPay = data;
            this.selectedPay=this.selectedPay.result
            this.isPayslipSelected = true;
            // console.log("Selected Leave Type data: ", data);
          },
          error => this.errorMsg = error);
    } else {
      this.isPayslipSelected = false;
    }
  }

  get f() { return this.payUpdateForm.controls; }

}
