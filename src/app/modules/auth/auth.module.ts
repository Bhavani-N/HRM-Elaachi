import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { LoginComponent } from "./login/login.component";
import { NewPasswordComponent } from "./new-password/new-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { LoginHomeComponent } from "./login-home/login-home.component";

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: '', component: LoginHomeComponent, children: [
          { path: 'login', component: LoginComponent },
          { path: 'forgotpassword', component: ResetPasswordComponent },
          { path: 'resetpassword', component: NewPasswordComponent }
        ]
    }
];

@NgModule({
    declarations: [
        LoginComponent,
        LoginHomeComponent,
        NewPasswordComponent,
        ResetPasswordComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule
    ],
    exports: [
        RouterModule
    ]
})
export class AuthModule {}