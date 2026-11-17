import { Component, OnInit } from '@angular/core';
import { NavController, Platform, IonicModule } from '@ionic/angular';
import { NgClass } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../services/user.service';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../../core/auth.service';
import { Doctor } from '../services/models/users';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.page.html',
    styleUrls: ['./admin-dashboard.page.scss'],
    imports: [IonicModule, NgClass, SkeletonComponent]
})
export class AdminDashboardPage implements OnInit {
  doctors: Doctor[] = [];
  loading = false;

  constructor(
    private navCtrl: NavController,
    private userService: UserService,
    private toastService: ToastService,
    private authService: AuthService,
    private platform: Platform
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

  async toggleAvailability(doctor: Doctor, event: Event) {
    // El backend todavía no expone un endpoint para actualizar disponibilidad.
    // Revertimos el cambio visual del toggle y avisamos al usuario en vez de
    // mutar el modelo (que se revertiría igual al refrescar).
    const toggle = event.target as HTMLIonToggleElement;
    if (!toggle || toggle.checked === doctor.available) {
      return; // reseteo propio: nada que revertir, evita bucle/doble toast
    }
    toggle.checked = doctor.available;
    await this.toastService.info('Disponibilidad: próximamente');
  }

  goToCreateDoctor() {
    this.navCtrl.navigateForward('/admin/add-doctor');
  }

  async goToEditDoctor(doctor: Doctor) {
    await this.toastService.info('La edición de doctores estará disponible pronto');
  }

  async logout() {
    const slug = await this.authService.getSlug();
    await this.authService.logout();
    await this.platform.ready();
    await this.navCtrl.navigateRoot(`/${slug}/login`);
  }
}
