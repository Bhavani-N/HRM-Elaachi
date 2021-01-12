import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";

import { ApplyLeaveComponent } from "./apply-leave/apply-leave.component";
import { AttendanceComponent } from "./attendance/attendance.component";
import { PaySlipComponent } from "./pay-slip/pay-slip.component";
import { TaskDetailsComponent } from "./task-details/task-details.component";
import { UserRoutingModule } from "./user-routing.module";
import { AddUserComponent } from './user-profile/add-user/add-user.component';

@NgModule({
    declarations: [
        AttendanceComponent,
        PaySlipComponent,
        TaskDetailsComponent,
        ApplyLeaveComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        SharedModule
    ]
})
export class UserModule {}