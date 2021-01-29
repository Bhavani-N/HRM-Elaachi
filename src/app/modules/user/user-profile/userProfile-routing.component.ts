import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AboutUserComponent } from "./about-user/about-user.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { UserAssetsComponent } from "./user-assets/user-assets.component";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { UserProfileComponent } from "./user-profile.component";
import { UserSkillsComponent } from "./user-skills/user-skills.component";

const routes: Routes = [
    { path: '', component: UserProfileComponent,
        children: [
            { path: '', redirectTo: 'about', pathMatch: 'full' },
            { path: 'about', component: AboutUserComponent },
            { path: 'edit', component: UserEditComponent },
            { path: 'add-user', component: AddUserComponent },
            { path:'user-assets',component:UserAssetsComponent },
            {path: 'user-skills',component:UserSkillsComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserProfileRoutingModule {}