import { Component } from '@angular/core';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
  standalone:false
})
export class AppointmentPage {
  doctors = [
    {
      id: 1,
      name: 'Dr. Martínez',
      availableDates: ['2025-10-14', '2025-10-15', '2025-10-18'],
      availableTimes: {
        '2025-10-14': ['09:00', '10:00', '15:00'],
        '2025-10-15': ['11:00', '13:30'],
        '2025-10-18': ['08:00', '09:30'],
      },
    },
    {
      id: 2,
      name: 'Dra. López',
      availableDates: ['2025-10-16', '2025-10-17', '2025-10-19'],
      availableTimes: {
        '2025-10-16': ['08:00', '09:00'],
        '2025-10-17': ['10:00', '11:30'],
        '2025-10-19': ['14:00', '15:30', '16:00'],
      },
    },
  ];

  selectedDoctor: any = null;
  availableDates: string[] = [];
  availableTimes: string[] = [];
  selectedTime: string | null = null;
  minDate = new Date().toISOString();
  maxDate = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString();
  disabledDates: string[] = [];

  updateAvailableDates() {
    if (this.selectedDoctor) {
      this.availableDates = this.selectedDoctor.availableDates;
      // Generar las fechas no disponibles
      const today = new Date();
      const next30 = Array.from({ length: 30 }, (_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        return d.toISOString().split('T')[0];
      });
      this.disabledDates = next30.filter((d) => !this.availableDates.includes(d));
      this.availableTimes = [];
      this.selectedTime = null;
    }
  }

  updateAvailableTimes(event: any) {
    const selectedDate = event.detail.value.split('T')[0];
    if (this.selectedDoctor?.availableTimes[selectedDate]) {
      this.availableTimes = this.selectedDoctor.availableTimes[selectedDate];
    } else {
      this.availableTimes = [];
    }
  }
}
