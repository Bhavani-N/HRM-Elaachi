import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ApplyLeaveComponent } from "./apply-leave/apply-leave.component";
import { AttendanceComponent } from "./attendance/attendance.component";
import { PaySlipComponent } from "./pay-slip/pay-slip.component";
import { TaskDetailsComponent } from "./task-details/task-details.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";

const routes: Routes = [
 { path: 'paySlip', component: PaySlipComponent },
 { path: 'applyLeave', component: ApplyLeaveComponent },
 { path: 'taskDetails', component: TaskDetailsComponent },
 { path: 'attendance', component: AttendanceComponent },
 { path: 'userProfile', component: UserProfileComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserRoutingModule {}