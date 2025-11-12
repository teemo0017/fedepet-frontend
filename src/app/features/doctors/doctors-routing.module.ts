import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorsPage } from './doctors.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorsPageRoutingModule {}
