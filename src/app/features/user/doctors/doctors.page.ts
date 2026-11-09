import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../../services/user.service';

type DoctorVM = {
  id: number;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  photoUrl?: string;
};

@Component({
    selector: 'app-doctors',
    templateUrl: './doctors.page.html',
    styleUrls: ['./doctors.page.scss'],
    imports: [IonicModule]
})
export class DoctorsPage implements OnInit {
  loading = true;
  query = '';

  doctors: DoctorVM[] = [];
  doctorsFiltered: DoctorVM[] = [];

  constructor(private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    this.loading = true;
    try {
      const resp = await firstValueFrom(this.userService.getDocts());
      this.doctors = resp.map(d => ({
        id: d.id,
        name: d.name,
        specialty: d.specialty,
        email: d.email,
        phone: d.phone,
        photoUrl: d.photo
      }));
    } catch (err) {
      console.error('Error al obtener los doctores:', err);
      this.doctors = [];
    } finally {
      this.applyFilters();
      this.loading = false;
    }
  }

  onSearch(ev: CustomEvent) {
    const value = (ev.detail as any).value || '';
    this.query = value.toLowerCase();
    this.applyFilters();
  }

  applyFilters() {
    if (!this.query) {
      this.doctorsFiltered = [...this.doctors];
    } else {
      this.doctorsFiltered = this.doctors.filter(d =>
        d.name.toLowerCase().includes(this.query) ||
        d.specialty.toLowerCase().includes(this.query)
      );
    }
  }

  /** Iniciales para el avatar cuando no hay foto (solo presentación). */
  initials(name: string): string {
    const clean = (name || '').replace(/^(dra?\.?)\s+/i, '').trim();
    const parts = clean.split(/\s+/).filter(Boolean);
    const first = parts[0]?.charAt(0) ?? '';
    const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : '';
    return (first + last).toUpperCase() || '·';
  }
}
