import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ApplyLeaveComponent } from '../modals/apply-leave/apply-leave.component';
import { AttendanceComponent } from '../modals/attendance/attendance.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  modalRef: BsModalRef | null;
  modalRef2: BsModalRef;
  public userDetails: any;
  staffId;

  constructor(
    private modalService: BsModalService,
    private authServ: AuthService
  ) {
  }

  ngOnInit() {
    this.userDetails = JSON.parse(this.authServ.getUserDetails);
    this.staffId=this.userDetails.staffId;
    console.log(this.staffId);
  }

  getUrl() {
    return "url('../../../../assets/icons/images/bg-1.jpg')";
  }

  openModal() {
    console.log('jhhhh')
    this.modalRef = this.modalService.show(ApplyLeaveComponent, { class: 'modal-lg' });
  }
  openAttendance() {
    this.modalRef = this.modalService.show(AttendanceComponent, { class: 'modal-lg' });
  }


}
