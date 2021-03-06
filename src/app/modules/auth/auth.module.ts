import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";

import { LoginComponent } from "./login/login.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { LoginHomeComponent } from "./login-home/login-home.component";
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: '', component: LoginHomeComponent, children: [
          { path: 'login', component: LoginComponent  },
          { path: 'resetpassword', component: ResetPasswordComponent },
          { path: 'forgotpassword', component: ForgotPasswordComponent }
        ]
    },
    { path: 'register', component: RegisterComponent }
];

@NgModule({
    declarations: [
        LoginComponent,
        LoginHomeComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    exports: [
        RouterModule
    ]
})
export class AuthModule {}
