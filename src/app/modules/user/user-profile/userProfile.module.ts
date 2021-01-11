import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { AboutUserComponent } from "./about-user/about-user.component";
import { UserContactComponent } from "./user-contact/user-contact.component";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { UserProfileComponent } from "./user-profile.component";
import { UserProfileRoutingModule } from "./userProfile-routing.component";

@NgModule({
    declarations: [
        UserProfileComponent,
        AboutUserComponent,
        UserEditComponent,
        UserContactComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UserProfileRoutingModule
    ]
})

export class UserProfileModule {}