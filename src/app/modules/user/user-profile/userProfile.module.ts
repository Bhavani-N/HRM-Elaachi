import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NumberDirective } from "src/app/directives/numbers.directive";

import { AboutUserComponent } from "./about-user/about-user.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { UserContactComponent } from "./user-contact/user-contact.component";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { UserProfileComponent } from "./user-profile.component";
import { UserProfileRoutingModule } from "./userProfile-routing.component";

@NgModule({
    declarations: [
        UserProfileComponent,
        AboutUserComponent,
        UserEditComponent,
        UserContactComponent,
        AddUserComponent,
        NumberDirective 
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UserProfileRoutingModule
    ]
})

export class UserProfileModule {}