import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";


import { ApplyLeaveComponent } from "./apply-leave/apply-leave.component";
import { PaySlipComponent } from "./pay-slip/pay-slip.component";
import { TaskDetailsComponent } from "./task-details/task-details.component";
import { UserRoutingModule } from "./user-routing.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HRApprovalComponent } from './hr-approval/hr-approval.component';
import { AddTaskComponent } from "./modals/add-task/add-task.component";
import { AddProjectComponent } from './modals/add-project/add-project.component';

@NgModule({
    declarations: [
        PaySlipComponent,
        TaskDetailsComponent,
        ApplyLeaveComponent,
        AddTaskComponent,
        HRApprovalComponent,
        AddProjectComponent,
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        PdfViewerModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ],
    entryComponents: [
        AddTaskComponent,
        AddProjectComponent
    ],
    providers: []
})
export class UserModule {}
