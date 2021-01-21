import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";


import { ApplyLeaveComponent } from "./apply-leave/apply-leave.component";
import { AttendanceComponent } from "./attendance/attendance.component";
import { PaySlipComponent } from "./pay-slip/pay-slip.component";
import { TaskDetailsComponent } from "./task-details/task-details.component";
import { UserRoutingModule } from "./user-routing.module";
import { AddTaskComponent } from './add-task/add-task.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
    declarations: [
        AttendanceComponent,
        PaySlipComponent,
        TaskDetailsComponent,
        ApplyLeaveComponent,
        AddTaskComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        PdfViewerModule,
        SharedModule,
    ],
    providers: []
})
export class UserModule {}
