import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ApplyLeaveComponent } from "./apply-leave/apply-leave.component";

// import { PaySlipComponent } from "./pay-slip/pay-slip.component";

import { TaskDetailsComponent } from "./task-details/task-details.component";
import { HRApprovalComponent } from "./hr-approval/hr-approval.component";
import { PaySlipComponent } from "./pay-slip/pay-slip.component";

const routes: Routes = [
  { path: 'paySlip/:id', component: PaySlipComponent },
  { path: 'applyLeave', component: ApplyLeaveComponent },
  { path: 'taskDetails', component: TaskDetailsComponent },

  { path: 'hr-approve', component: HRApprovalComponent },
  { path: '', loadChildren: () => import('./user-profile/userProfile.module').then(m => m.UserProfileModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule { }
