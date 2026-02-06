import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatesPageRoutingModule } from './dates-routing.module';

import { DatesPage } from './dates.page';
import { SharedModule } from 'src/app/shared/shared-module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DatesPageRoutingModule,
        SharedModule,
        DatesPage
    ]
})
export class DatesPageModule {}
