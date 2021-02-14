import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthguardGuard } from "src/app/authguard.guard";
import { CompanyInfoComponent } from "./company-info/company-info.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
    { path: '', component: HomeComponent , canActivate: [AuthguardGuard] },
    { path: 'companyInfo', component: CompanyInfoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HomeRoutingModule {}
