import { MaterialModule } from './../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageNotfoundComponent } from './page-notfound/page-notfound.component';
import { NavnsideWrapperComponent } from './navigation-contents/navnside-wrapper/navnside-wrapper.component';
import { TopNavigationComponent } from './navigation-contents/top-navigation/top-navigation.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MaterialModule
  ],
  declarations: [
    PageNotfoundComponent,
    NavnsideWrapperComponent,
    TopNavigationComponent
  ],
  exports: [
    NavnsideWrapperComponent
  ]
})
export class CoreModule { }
