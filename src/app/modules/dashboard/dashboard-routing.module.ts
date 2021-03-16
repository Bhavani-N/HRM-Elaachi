import { Routes, RouterModule, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutComponent } from './main-layout/main-layout.component';
import { EmployeeMainComponent } from './employee-contents/employee-main/employee-main.component';
import { EmployeeListComponent } from './employee-contents/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employee-contents/employee-details/employee-details.component';
import { EmployeeManageComponent } from './employee-contents/employee-manage/employee-manage.component';
import { DashHomeComponent } from './dash-home/dash-home.component';
import { LeaverequestMainComponent } from './leaverequest-contents/leaverequest-main/leaverequest-main.component';
import { LeaverequestListComponent } from './leaverequest-contents/leaverequest-list/leaverequest-list.component';
import { LeaverequestDetailsComponent } from './leaverequest-contents/leaverequest-details/leaverequest-details.component';
import { LeaverequestManageComponent } from './leaverequest-contents/leaverequest-manage/leaverequest-manage.component';
import { LeavetypeMainComponent } from './leavetype-contents/leavetype-main/leavetype-main.component';
import { LeavetypeListComponent } from './leavetype-contents/leavetype-list/leavetype-list.component';
import { LeavetypeDetailsComponent } from './leavetype-contents/leavetype-details/leavetype-details.component';
import { LeavetypeManageComponent } from './leavetype-contents/leavetype-manage/leavetype-manage.component';
import { TaskMainComponent } from './task-contents/task-main/task-main.component';
import { TaskListComponent } from './task-contents/task-list/task-list.component';
import { TaskDetailsComponent } from './task-contents/task-details/task-details.component';
import { TaskManageComponent } from './task-contents/task-manage/task-manage.component';
import { ProjectMainComponent } from './project-contents/project-main/project-main.component';
import { ProjectListComponent } from './project-contents/project-list/project-list.component';
import { ProjectDetailsComponent } from './project-contents/project-details/project-details.component';
import { ProjectManageComponent } from './project-contents/project-manage/project-manage.component';
import { MyProfileComponent } from './profile-contents/my-profile/my-profile.component';
import { CompanyMainComponent } from './company-contents/company-main/company-main.component';
import { CompanyDetailsComponent } from './company-contents/company-details/company-details.component';
import { CompanyManageComponent } from './company-contents/company-manage/company-manage.component';
import { CompanyListComponent } from './company-contents/company-list/company-list.component';
import { UploadPayslipComponent } from './payslip-contents/upload-payslip/upload-payslip.component';
import { PayslipMainComponent } from './payslip-contents/payslip-main/payslip-main.component';
import { PayslipDetailsComponent } from './payslip-contents/payslip-details/payslip-details.component';
import { PayslipListComponent } from './payslip-contents/payslip-list/payslip-list.component';

const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', component: DashHomeComponent },
            {
                path: 'employees',
                component: EmployeeMainComponent,
                children: [
                  {path: '', redirectTo: 'details', pathMatch: 'full'},
                  {path: 'details', component: EmployeeListComponent},
                  {path: 'details/:id', component: EmployeeDetailsComponent},
                  {path: 'new', component: EmployeeManageComponent}
                ]
            },
            {
              path: 'company',
              component: CompanyMainComponent,
              children: [
                {path: '', redirectTo: 'details', pathMatch: 'full'},
                {path: 'details', component: CompanyListComponent},
                {path: 'details/:id', component:CompanyDetailsComponent},
                {path: 'new', component: CompanyManageComponent}
              ]
            },
            {
                path: 'leaverequests',
                component: LeaverequestMainComponent,
                children: [
                  {path: '', redirectTo: 'details', pathMatch: 'full'},
                  {path: 'details', component: LeaverequestListComponent},
                  {path: 'details/:id', component: LeaverequestDetailsComponent},
                  {path: 'new', component: LeaverequestManageComponent}
                ]
            },
            {
              path: 'leavetypes',
              component: LeavetypeMainComponent,
              children: [
                {path: '', redirectTo: 'details', pathMatch: 'full'},
                {path: 'details', component: LeavetypeListComponent},
                {path: 'details/:id', component: LeavetypeDetailsComponent},
                {path: 'new', component: LeavetypeManageComponent}
              ]
            },
            {
              path: 'tasks',
              component: TaskMainComponent,
              children: [
                {path: '', redirectTo: 'details', pathMatch: 'full'},
                {path: 'details', component: TaskListComponent},
                {path: 'details/:id', component: TaskDetailsComponent},
                {path: 'new', component: TaskManageComponent}
              ]
            },
            {
              path: 'projects',
              component: ProjectMainComponent,
              children: [
                {path: '', redirectTo: 'details', pathMatch: 'full'},
                {path: 'details', component: ProjectListComponent},
                {path: 'details/:id', component: ProjectDetailsComponent},
                {path: 'new', component: ProjectManageComponent}
              ]
            },
            { path: 'profile/:id', component: MyProfileComponent },
            {
              path: 'payslips',
              component: PayslipMainComponent,
              children: [
                {path: '', redirectTo: 'details', pathMatch: 'full'},
                {path: 'details', component: PayslipListComponent},
                {path: 'details/:id', component: PayslipDetailsComponent},
                {path: 'new', component: UploadPayslipComponent}
              ]
            },
        ]
    }
];


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
      ],
      declarations: [],
      exports: [RouterModule]
})
export class DashboardRoutingModule { }
