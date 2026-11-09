import { Routes } from "@angular/router";
import { TabVarComponent } from "./shared/components/tab-var/tab-var.component";

export const MAIN_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/authentication/clinic-gate/clinic-gate.page').then((m) => m.ClinicGatePage)
    },
    {
        path: 'super-admin/login',
        loadComponent: () => import('./features/super-admin/login/super-admin-login.page').then((m) => m.SuperAdminLoginPage)
    },
    {
        path: 'super-admin/clinics',
        loadComponent: () => import('./features/super-admin/clinics/clinics.page').then((m) => m.ClinicsPage)
    },
    {
        path: 'super-admin/clinics/create',
        loadComponent: () => import('./features/super-admin/create-clinic/create-clinic.page').then((m) => m.CreateClinicPage)
    },
    {
        path: ':slug/login',
        loadComponent: () => import('./features/authentication/login/login.page').then((m) => m.LoginPage)
    },
    {
        path: ':slug/register',
        loadComponent: () => import('./features/authentication/register/register.page').then((m) => m.RegisterPage)
    },
    {
        path: 'user',
        component: TabVarComponent,
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./features/user/dashboard/dashboard.page').then((m) => m.DashboardPage),
            },
            {
                path: 'doctors',
                loadComponent: () => import('./features/user/doctors/doctors.page').then((m) => m.DoctorsPage),
            },
            {
                path: 'pets',
                loadComponent: () => import('./features/user/pets/pets.page').then((m) => m.PetsPage),
            },
            {
                path: 'shop',
                loadComponent: () => import('./features/shop/shop.page').then(m => m.ShopPage)
            },
            {
                path: 'appointment',
                loadComponent: () => import('./features/user/appointment/appointment.page').then(m => m.AppointmentPage)
            },
            {
                path: 'add-pet',
                loadComponent: () => import('./features/user/add-pet/add-pet.page').then(m => m.AddPetPage)
            },
            {
                path: 'dates',
                loadComponent: () => import('./features/user/dates/dates.page').then(m => m.DatesPage)
            },
        ]
    },
    {
        path: 'doctor',
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./features/doctor/doctor-dashboard/doctor-dashboard.page').then(m => m.DoctorDashboardPage)
            },
            {
                path: 'dates',
                loadComponent: () => import('./features/doctor/doctor-dates/doctor-dates.page').then(m => m.DoctorDatesPage)
            },
        ]
    },
    {
        path: 'admin',
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./features/admin-dashboard/admin-dashboard.page').then(m => m.AdminDashboardPage)
            },
            {
                path: 'add-doctor',
                loadComponent: () => import('./features/admin/add-doctor/add-doctor.page').then(m => m.AddDoctorPage)
            },
            {
                path: 'add-product',
                loadComponent: () => import('./features/admin/add-product/add-product.page').then(m => m.AddProductPage)
            },
        ]
    }

]
