import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorDashboardPageRoutingModule } from './doctor-dashboard-routing.module';

import { DoctorDashboardPage } from './doctor-dashboard.page';
import { SharedModule } from 'src/app/shared/shared-module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DoctorDashboardPageRoutingModule,
        SharedModule,
        DoctorDashboardPage
    ]
})
export class DoctorDashboardPageModule { }
