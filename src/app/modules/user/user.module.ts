import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ApplyLeaveComponent } from "./apply-leave/apply-leave.component";
import { AttendanceComponent } from "./attendance/attendance.component";
import { PaySlipComponent } from "./pay-slip/pay-slip.component";
import { TaskDetailsComponent } from "./task-details/task-details.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { UserRoutingModule } from "./user-routing.module";

@NgModule({
    declarations: [
        AttendanceComponent,
        PaySlipComponent,
        TaskDetailsComponent,
        UserProfileComponent,
        ApplyLeaveComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule
    ]
})
export class UserModule {}