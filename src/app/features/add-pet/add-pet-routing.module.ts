import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPetPage } from './add-pet.page';

const routes: Routes = [
  {
    path: '',
    component: AddPetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPetPageRoutingModule {}
