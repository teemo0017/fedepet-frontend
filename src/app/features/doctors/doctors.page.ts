import { Component, OnInit } from '@angular/core';

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
    standalone: false
})
export class DoctorsPage implements OnInit {
  loading = true;
  query = '';
  defaultPhoto = 'assets/img/doctor-placeholder.png';

  doctors: DoctorVM[] = [
    { id: 1, name: 'Dra. Laura Mendoza', specialty: 'Medicina Felina', email: 'laura@vet.com', phone: '678-1234' },
    { id: 2, name: 'Dr. Juan Herrera', specialty: 'Cirugía Canina', email: 'juan@vet.com', phone: '699-8822' },
    { id: 3, name: 'Dra. Sofía Torres', specialty: 'Dermatología Animal', email: 'sofia@vet.com', phone: '601-3344' },
  ];

  doctorsFiltered: DoctorVM[] = [];

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
      this.applyFilters();
    }, 700);
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

  openDoctorRegister() {
    console.log('Abrir formulario de registro de doctor');
  }

  viewDoctor(doctor: DoctorVM) {
    console.log('Ver perfil de', doctor.name);
  }

  deleteDoctor(doctor: DoctorVM) {
    console.log('Eliminar doctor', doctor.name);
  }
}
