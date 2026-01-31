import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AnimationOptions } from 'ngx-lottie';

interface AdminDoctor {
  id: number;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  available: boolean;
  photo: string;
}


@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.page.html',
    styleUrls: ['./admin-dashboard.page.scss'],
    standalone: false
})
export class AdminDashboardPage {
  doctors: AdminDoctor[] = [];

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    this.loadMockDoctors();
  }

  loadMockDoctors() {
    this.doctors = [
      {
        id: 1,
        name: 'Dr. Juan Martínez',
        specialty: 'Medicina General',
        email: 'juan.martinez@vetclinic.com',
        phone: '+507 6000-0001',
        available: true,
        photo: 'https://i.pravatar.cc/150?img=12'
      },
      {
        id: 2,
        name: 'Dra. Ana Gómez',
        specialty: 'Dermatología Veterinaria',
        email: 'ana.gomez@vetclinic.com',
        phone: '+507 6000-0002',
        available: false,
        photo: 'https://i.pravatar.cc/150?img=32'
      },
      {
        id: 3,
        name: 'Dr. Carlos Pérez',
        specialty: 'Cirugía',
        email: 'carlos.perez@vetclinic.com',
        phone: '+507 6000-0003',
        available: true,
        photo: 'https://i.pravatar.cc/150?img=45'
      }
    ];
  }

  toggleAvailability(doctor: AdminDoctor) {
    doctor.available = !doctor.available;
    // Aquí luego llamas a tu backend para actualizar:
    // this.adminService.updateDoctorAvailability(doctor.id, doctor.available).subscribe(...)
  }

  goToCreateDoctor() {
    this.navCtrl.navigateForward('/admin/doctors/create');
  }

  goToEditDoctor(doctor: AdminDoctor) {
    this.navCtrl.navigateForward(`/admin/doctors/edit/${doctor.id}`, {
      state: { doctor }
    });
  }
}
