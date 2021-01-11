import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AboutUserComponent } from "./about-user/about-user.component";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { UserProfileComponent } from "./user-profile.component";

const routes: Routes = [
    { path: '', component: UserProfileComponent,
        children: [
            { path: 'about', component: AboutUserComponent },
            { path: 'edit/:id', component: UserEditComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserProfileRoutingModule {}