import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { DashboardRoutingModule } from "./dashboard-routing.module";

import { EmployeeDetailsComponent } from "./employee-contents/employee-details/employee-details.component";
import { EmployeeListComponent } from "./employee-contents/employee-list/employee-list.component";
import { EmployeeMainComponent } from "./employee-contents/employee-main/employee-main.component";
import { EmployeeManageComponent } from "./employee-contents/employee-manage/employee-manage.component";
import { MainLayoutComponent } from "./main-layout/main-layout.component";
import { DashHomeComponent } from './dash-home/dash-home.component';

@NgModule({
    declarations: [
        EmployeeDetailsComponent,
        EmployeeListComponent,
        EmployeeMainComponent,
        EmployeeManageComponent,
        MainLayoutComponent,
        DashHomeComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        DashboardRoutingModule
    ]
})

export class DashboardModule {}