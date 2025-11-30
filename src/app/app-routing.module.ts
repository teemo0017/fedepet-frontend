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
        path: 'doctors',
        loadChildren: () => import('./features/doctors/doctors.module').then((m) => m.DoctorsPageModule),
      },
      {
        path: 'pets',
        loadChildren: () => import('./features/pets/pets.module').then((m) => m.PetsPageModule),
      },
      {
        path: 'shop',
        loadChildren: () => import('./features/shop/shop.module').then(m => m.ShopPageModule)
      },
      {
        path: 'appointment',
        loadChildren: () => import('./features/appointment/appointment.module').then(m => m.AppointmentPageModule)
      },
      {
        path: 'add-pet',
        loadChildren: () => import('./features/add-pet/add-pet.module').then(m => m.AddPetPageModule)
      },
      {
        path: 'dates',
        loadChildren: () => import('./features/dates/dates.module').then(m => m.DatesPageModule)
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
  },
  {
    path: 'register',
    loadChildren: () => import('./features/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'doctor-dashboard',
    loadChildren: () => import('./features/doctor-dashboard/doctor-dashboard.module').then(m => m.DoctorDashboardPageModule)
  },
  {
    path: 'add-doctor',
    loadChildren: () => import('./features/add-doctor/add-doctor.module').then(m => m.AddDoctorPageModule)
  },
  {
    path: 'add-product',
    loadChildren: () => import('./features/add-product/add-product.module').then(m => m.AddProductPageModule)
  },
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./features/admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardPageModule)
  },  {
    path: 'doctor-dates',
    loadChildren: () => import('./features/doctor-dates/doctor-dates.module').then( m => m.DoctorDatesPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
