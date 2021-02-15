import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home/home.component";
import { ApplyLeaveComponent } from './modals/apply-leave/apply-leave.component';
import { AttendanceComponent } from "./modals/attendance/attendance.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        HomeComponent,
        ApplyLeaveComponent,
        AttendanceComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        HomeRoutingModule,
        ReactiveFormsModule
    ],
    entryComponents: [
        ApplyLeaveComponent,
        AttendanceComponent
    ]
})

export class HomeModule {}