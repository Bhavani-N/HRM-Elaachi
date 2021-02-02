import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthguardGuard } from "src/app/authguard.guard";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
    { path: '', component: HomeComponent , canActivate: [AuthguardGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HomeRoutingModule {}