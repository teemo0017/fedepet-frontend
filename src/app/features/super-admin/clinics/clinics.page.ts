import { Component, OnInit } from '@angular/core';
import { NavController, IonicModule } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { ClinicService } from 'src/app/core/clinic.service';
import { AuthService } from 'src/app/core/auth.service';
import { Clinic } from 'src/app/core/models/clinic';
import { ToastService } from 'src/app/features/services/toast.service';
import { SkeletonComponent } from 'src/app/shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-clinics',
  templateUrl: './clinics.page.html',
  styleUrls: ['./clinics.page.scss'],
  imports: [IonicModule, SkeletonComponent]
})
export class ClinicsPage implements OnInit {
  loading = true;
  clinics: Clinic[] = [];

  constructor(
    private navCtrl: NavController,
    private clinicService: ClinicService,
    private authService: AuthService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.loadClinics();
  }

  async ionViewWillEnter() {
    await this.loadClinics();
  }

  async loadClinics(): Promise<void> {
    this.loading = true;
    try {
      this.clinics = await firstValueFrom(this.clinicService.getAllClinics());
    } catch (err) {
      console.error('Error al obtener las clínicas:', err);
      this.clinics = [];
    } finally {
      this.loading = false;
    }
  }

  trackByClinic(_index: number, clinic: Clinic) {
    return clinic.id;
  }

  loginUrl(clinic: Clinic): string {
    return `${window.location.origin}/${clinic.slug}/login`;
  }

  async copyLink(clinic: Clinic): Promise<void> {
    const url = this.loginUrl(clinic);
    try {
      await navigator.clipboard.writeText(url);
      await this.toastService.success('Enlace copiado');
    } catch (err) {
      console.error('Error al copiar el enlace:', err);
      await this.toastService.error('No se pudo copiar el enlace');
    }
  }

  goToCreateClinic() {
    this.navCtrl.navigateForward('/super-admin/clinics/create');
  }

  async logout() {
    await this.authService.logout();
    this.navCtrl.navigateRoot('/super-admin/login');
  }
}
