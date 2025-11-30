import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorDatesPage } from './doctor-dates.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorDatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorDatesPageRoutingModule {}
