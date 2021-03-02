import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {NgxPaginationModule} from 'ngx-pagination';

import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { MaterialModule } from '../shared/material/material.module';
import { CoreModule } from "../core/core.module";
import { DashboardRoutingModule } from "./dashboard-routing.module";

import { EmployeeDetailsComponent } from "./employee-contents/employee-details/employee-details.component";
import { EmployeeListComponent } from "./employee-contents/employee-list/employee-list.component";
import { EmployeeMainComponent } from "./employee-contents/employee-main/employee-main.component";
import { EmployeeManageComponent } from "./employee-contents/employee-manage/employee-manage.component";
import { MainLayoutComponent } from "./main-layout/main-layout.component";
import { DashHomeComponent } from './dash-home/dash-home.component';

import { LeaverequestListComponent } from "./leaverequest-contents/leaverequest-list/leaverequest-list.component";
import { LeaverequestMainComponent } from "./leaverequest-contents/leaverequest-main/leaverequest-main.component";
import { LeaverequestManageComponent } from "./leaverequest-contents/leaverequest-manage/leaverequest-manage.component";
import { LeaverequestDetailsComponent } from "./leaverequest-contents/leaverequest-details/leaverequest-details.component";
import { LeavetypeDetailsComponent } from "./leavetype-contents/leavetype-details/leavetype-details.component";
import { LeavetypeListComponent } from "./leavetype-contents/leavetype-list/leavetype-list.component";
import { LeavetypeMainComponent } from "./leavetype-contents/leavetype-main/leavetype-main.component";
import { LeavetypeManageComponent } from "./leavetype-contents/leavetype-manage/leavetype-manage.component";

import { TaskDetailsComponent } from './task-contents/task-details/task-details.component';
import { TaskListComponent } from './task-contents/task-list/task-list.component';
import { TaskMainComponent } from './task-contents/task-main/task-main.component';
import { TaskManageComponent } from './task-contents/task-manage/task-manage.component';

import { ProjectDetailsComponent } from './project-contents/project-details/project-details.component';
import { ProjectListComponent } from './project-contents/project-list/project-list.component';
import { ProjectMainComponent } from './project-contents/project-main/project-main.component';
import { ProjectManageComponent } from './project-contents/project-manage/project-manage.component';
import { MyProfileComponent } from './profile-contents/my-profile/my-profile.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UploadPayslipComponent } from './payslip-contents/upload-payslip/upload-payslip.component';
import { LeaverequestperiodComponent } from './dash-contents/report-contents/leaverequestperiod/leaverequestperiod.component';
import { MainReportComponent } from './dash-contents/report-contents/main-report/main-report.component';
import { CompanyManageComponent } from './company-contents/company-manage/company-manage.component';
import { CompanyDetailsComponent } from './company-contents/company-details/company-details.component';
import { CompanyMainComponent } from './company-contents/company-main/company-main.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PayslipMainComponent } from './payslip-contents/payslip-main/payslip-main.component';
import { PayslipDetailsComponent } from './payslip-contents/payslip-details/payslip-details.component';
import { PayslipListComponent } from './payslip-contents/payslip-list/payslip-list.component';

@NgModule({
    declarations: [
        EmployeeDetailsComponent,
        EmployeeListComponent,
        EmployeeMainComponent,
        EmployeeManageComponent,
        MainLayoutComponent,
        DashHomeComponent,
        LeaverequestDetailsComponent,
        LeaverequestListComponent,
        LeaverequestMainComponent,
        LeaverequestManageComponent,
        LeavetypeDetailsComponent,
        LeavetypeListComponent,
        LeavetypeMainComponent,
        LeavetypeManageComponent,
        TaskDetailsComponent,
        TaskListComponent,
        TaskMainComponent,
        TaskManageComponent,
        ProjectDetailsComponent,
        ProjectListComponent,
        ProjectMainComponent,
        ProjectManageComponent,
        MyProfileComponent,
        UploadPayslipComponent,
        LeaverequestperiodComponent,
        MainReportComponent,
        CompanyManageComponent,
        CompanyDetailsComponent,
        CompanyMainComponent,
        PayslipMainComponent,
        PayslipDetailsComponent,
        PayslipListComponent,
    ],
    imports: [
        CommonModule,
        CoreModule,
        SharedModule,
        DashboardRoutingModule,
        MaterialModule,
        FormsModule,
        PdfViewerModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        BsDatepickerModule.forRoot(),
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
     ],
})

export class DashboardModule {}
