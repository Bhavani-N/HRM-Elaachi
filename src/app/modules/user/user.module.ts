import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { ApplyLeaveComponent } from "./apply-leave/apply-leave.component";
import { AttendanceComponent } from "./attendance/attendance.component";
import { PaySlipComponent } from "./pay-slip/pay-slip.component";
import { TaskDetailsComponent } from "./task-details/task-details.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { UserRoutingModule } from "./user-routing.module";
import { AboutUserComponent } from './user-profile/about-user/about-user.component';
import { UserEditComponent } from './user-profile/user-edit/user-edit.component';
import { UserContactComponent } from './user-profile/user-contact/user-contact.component';

@NgModule({
    declarations: [
        AttendanceComponent,
        PaySlipComponent,
        TaskDetailsComponent,
        UserProfileComponent,
        ApplyLeaveComponent,
        AboutUserComponent,
        UserEditComponent,
        UserContactComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UserRoutingModule
    ]
})
export class UserModule {}