import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorDatesPageRoutingModule } from './doctor-dates-routing.module';

import { DoctorDatesPage } from './doctor-dates.page';
import { SharedModule } from 'src/app/shared/shared-module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DoctorDatesPageRoutingModule,
        SharedModule,
        DoctorDatesPage
    ]
})
export class DoctorDatesPageModule { }
