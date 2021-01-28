import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ApplyLeaveComponent } from '../modals/apply-leave/apply-leave.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  

  modalRef: BsModalRef | null;
  modalRef2: BsModalRef;
  constructor(private modalService: BsModalService) {
  }
  ngOnInit() {
  }

  getUrl() {
    return "url('../../../../assets/icons/images/bg-1.jpg')";
  }

  openModal() {
    console.log('jhhhh')
    this.modalRef = this.modalService.show(ApplyLeaveComponent, { class: 'modal-lg' });
  }
}
