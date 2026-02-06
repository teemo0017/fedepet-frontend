import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'user',
    loadComponent: () => import('./shared/components/tab-var/tab-var.component').then(m => m.TabVarComponent),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.page').then((m) => m.DashboardPage),
      },
      {
        path: 'doctors',
        loadComponent: () => import('./features/doctors/doctors.page').then((m) => m.DoctorsPage),
      },
      {
        path: 'pets',
        loadComponent: () => import('./features/pets/pets.page').then((m) => m.PetsPage),
      },
      {
        path: 'shop',
        loadComponent: () => import('./features/shop/shop.page').then(m => m.ShopPage)
      },
      {
        path: 'appointment',
        loadComponent: () => import('./features/appointment/appointment.page').then(m => m.AppointmentPage)
      },
      {
        path: 'add-pet',
        loadComponent: () => import('./features/add-pet/add-pet.page').then(m => m.AddPetPage)
      },
      {
        path: 'dates',
        loadComponent: () => import('./features/dates/dates.page').then(m => m.DatesPage)
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
    loadComponent: () => import('./features/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'doctor-dashboard',
    loadComponent: () => import('./features/doctor-dashboard/doctor-dashboard.page').then(m => m.DoctorDashboardPage)
  },
  {
    path: 'add-doctor',
    loadComponent: () => import('./features/add-doctor/add-doctor.page').then(m => m.AddDoctorPage)
  },
  {
    path: 'add-product',
    loadComponent: () => import('./features/add-product/add-product.page').then(m => m.AddProductPage)
  },
  {
    path: 'admin-dashboard',
    loadComponent: () => import('./features/admin-dashboard/admin-dashboard.page').then(m => m.AdminDashboardPage)
  },
  {
    path: 'doctor-dates',
    loadComponent: () => import('./features/doctor-dates/doctor-dates.page').then( m => m.DoctorDatesPage)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
