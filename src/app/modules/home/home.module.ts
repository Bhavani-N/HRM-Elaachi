import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home/home.component";
import { ApplyLeaveComponent } from './modals/apply-leave/apply-leave.component';
import { AttendanceComponent } from "./modals/attendance/attendance.component";
import { CompanyInfoComponent } from './company-info/company-info.component';

@NgModule({
    declarations: [
        HomeComponent,
        ApplyLeaveComponent,
        AttendanceComponent,
        CompanyInfoComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        HomeRoutingModule
    ],
    entryComponents: [
        ApplyLeaveComponent,
        AttendanceComponent
    ]
})

export class HomeModule {}