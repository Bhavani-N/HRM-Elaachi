import { Routes, RouterModule, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { EmployeeMainComponent } from './employee-contents/employee-main/employee-main.component';
import { EmployeeListComponent } from './employee-contents/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employee-contents/employee-details/employee-details.component';
import { EmployeeManageComponent } from './employee-contents/employee-manage/employee-manage.component';
import { DashHomeComponent } from './dash-home/dash-home.component';

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