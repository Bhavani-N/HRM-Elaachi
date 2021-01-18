import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ApplyLeaveComponent } from "./apply-leave/apply-leave.component";
import { AttendanceComponent } from "./attendance/attendance.component";
import { PaySlipComponent } from "./pay-slip/pay-slip.component";
import { AddTaskComponent } from "./task-details/add-task/add-task.component";
import { TaskDetailsComponent } from "./task-details/task-details.component";

const routes: Routes = [
 { path: 'paySlip', component: PaySlipComponent },
 { path: 'applyLeave', component: ApplyLeaveComponent },
 { path: 'taskDetails', component: TaskDetailsComponent },
 { path: 'add-task', component: AddTaskComponent },
 { path: 'attendance', component: AttendanceComponent },
 { path: '', loadChildren: () => import('./user-profile/userProfile.module').then(m => m.UserProfileModule) }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserRoutingModule {}
