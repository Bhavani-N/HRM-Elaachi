import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AboutUserComponent } from "./about-user/about-user.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { UserProfileComponent } from "./user-profile.component";

const routes: Routes = [
    { path: '', component: UserProfileComponent,
        children: [
            { path: 'about', component: AboutUserComponent },
            { path: 'edit/:id', component: UserEditComponent },
            { path: 'add-user', component: AddUserComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserProfileRoutingModule {}