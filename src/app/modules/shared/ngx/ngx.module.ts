import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule, AccordionModule,
  // BsDatepickerModule
} from 'ngx-bootstrap';


const MODULES = [
  BsDropdownModule.forRoot(),
  ModalModule.forRoot(),
  AccordionModule.forRoot(),
  // BsDatepickerModule.forRoot()
];


@NgModule({
  declarations: [],
  imports: [
    ...MODULES
  ],
  exports: [
    BsDropdownModule,
    ModalModule,
    AccordionModule,
    // BsDatepickerModule
  ]
})
export class NgxModule { }
