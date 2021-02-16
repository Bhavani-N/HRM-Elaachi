import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { CoreModule } from "../core/core.module";
import { ReactiveFormsModule } from "@angular/forms";
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
import { MaterialModule } from "../shared/material/materail.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {NgxPaginationModule} from 'ngx-pagination';

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

    ],
    imports: [
        CommonModule,
        CoreModule,
        SharedModule,
        DashboardRoutingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule 
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
     ]
})

export class DashboardModule {}