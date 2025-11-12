import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPetPageRoutingModule } from './add-pet-routing.module';

import { AddPetPage } from './add-pet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPetPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddPetPage]
})
export class AddPetPageModule {}
