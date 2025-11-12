import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorDashboardPageRoutingModule } from './doctor-dashboard-routing.module';

import { DoctorDashboardPage } from './doctor-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorDashboardPageRoutingModule
  ],
  declarations: [DoctorDashboardPage]
})
export class DoctorDashboardPageModule {}
