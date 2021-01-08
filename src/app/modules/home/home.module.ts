import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { FooterComponent } from "./footer/footer.component";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home/home.component";

@NgModule({
    declarations: [
        HomeComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule
    ]
})

export class HomeModule {}