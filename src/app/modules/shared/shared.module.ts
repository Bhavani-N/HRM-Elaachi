import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { AlertComponent } from './alert/alert.component';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        AlertComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        CommonModule
    ]
})

export class SharedModule {}