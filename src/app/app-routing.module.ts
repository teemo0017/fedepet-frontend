import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabVarComponent } from './shared/components/tab-var/tab-var.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'user',
    component: TabVarComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.module').then((m) => m.DashboardPageModule),
      },
      {
        path: 'dates',
        loadChildren: () => import('./features/dates/dates.module').then((m) => m.DatesPageModule),
      },
      {
        path: 'pets',
        loadChildren: () => import('./features/pets/pets.module').then((m) => m.PetsPageModule),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./features/login/login.module').then(m => m.LoginPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
