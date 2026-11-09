import { Component, OnInit } from '@angular/core';
import { NavController, IonicModule } from '@ionic/angular';
import { NgClass } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../services/user.service';
import { ToastService } from '../services/toast.service';
import { Doctor } from '../services/models/users';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.page.html',
    styleUrls: ['./admin-dashboard.page.scss'],
    imports: [IonicModule, NgClass]
})
export class AdminDashboardPage implements OnInit {
  doctors: Doctor[] = [];
  loading = false;

  constructor(
    private navCtrl: NavController,
    private userService: UserService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.loadDoctors();
  }

  async loadDoctors() {
    this.loading = true;
    try {
      this.doctors = await firstValueFrom(this.userService.getDocts());
    } catch (err) {
      console.error('Error al obtener los doctores:', err);
      this.doctors = [];
    } finally {
      this.loading = false;
    }
  }

  trackByDoctor(_index: number, doctor: Doctor) {
    return doctor.id;
  }

  toggleAvailability(doctor: Doctor) {
    doctor.available = !doctor.available;
    // El backend todavía no expone un endpoint para actualizar disponibilidad.
  }

  goToCreateDoctor() {
    this.navCtrl.navigateForward('/admin/add-doctor');
  }

  async goToEditDoctor(doctor: Doctor) {
    await this.toastService.info('La edición de doctores estará disponible pronto');
  }
}
