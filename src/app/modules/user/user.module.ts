import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

import { ApplyLeaveComponent } from "./apply-leave/apply-leave.component";
import { AttendanceComponent } from "./attendance/attendance.component";
import { PaySlipComponent } from "./pay-slip/pay-slip.component";
import { TaskDetailsComponent } from "./task-details/task-details.component";
import { UserRoutingModule } from "./user-routing.module";
import { AddTaskComponent } from './task-details/add-task/add-task.component';

import { jqxSchedulerModule } from 'jqwidgets-ng/jqxscheduler';
import { CalendarUtilsModule } from "./calendar-utils/module";

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  listPlugin
]);

@NgModule({
    declarations: [
        AttendanceComponent,
        PaySlipComponent,
        TaskDetailsComponent,
        ApplyLeaveComponent,
        AddTaskComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        FullCalendarModule,
        jqxSchedulerModule, 
        SharedModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        CalendarUtilsModule
    ],
    providers: []
})
export class UserModule {}
