import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PetsPageRoutingModule } from './pets-routing.module';

import { PetsPage } from './pets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PetsPageRoutingModule
  ],
  declarations: [PetsPage]
})
export class PetsPageModule {}
