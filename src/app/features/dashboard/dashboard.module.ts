import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { SharedModule } from 'src/app/shared/shared-module';
import { LottieComponent } from 'ngx-lottie';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    SharedModule,
    LottieComponent
  ],
  declarations: [DashboardPage], exports: [DashboardPage]
})
export class DashboardPageModule { }
