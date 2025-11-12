import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.page.html',
  styleUrls: ['./doctor-dashboard.page.scss'],
  standalone: false
})
export class DoctorDashboardPage implements OnInit {
  doctorName = 'Martínez';

  upcomingAppointments = [
    { mascota: 'Luna', cliente: 'Carlos Gómez', fecha: '2025-10-14T09:00', motivo: 'Vacunación', estado: 'Confirmada' },
    { mascota: 'Max', cliente: 'Ana Ruiz', fecha: '2025-10-14T10:30', motivo: 'Consulta general', estado: 'Pendiente' },
  ];

  stats = [
    { label: 'Citas Hoy', value: 5 },
    { label: 'Mascotas Atendidas', value: 3 },
    { label: 'Canceladas', value: 1 },
  ];

  notifications = [
    { text: 'Nueva cita con “Luna” para mañana a las 9:00 a.m.' },
    { text: 'Cliente “Ana Ruiz” reprogramó su cita.' },
  ];

  ngOnInit() {}

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'confirmada': return 'success';
      case 'pendiente': return 'warning';
      case 'cancelada': return 'danger';
      default: return 'medium';
    }
  }
}
