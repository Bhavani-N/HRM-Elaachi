import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxModule } from './ngx/ngx.module';

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
        CommonModule,
        NgxModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        CommonModule,
        NgxModule
    ]
})

export class SharedModule {}
