import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController, Platform, IonicModule } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { AuthService } from 'src/app/core/auth.service';
import { DateResponseDoctor, DatesResponse, GenericResponseSave, requestId, updateDateState } from '../../services/models/users';
import { DecodedUser } from 'src/app/core/models/auth';
import { firstValueFrom } from 'rxjs';
import { NgClass, SlicePipe, DatePipe } from '@angular/common';
import { SkeletonComponent } from '../../../shared/components/skeleton/skeleton.component';



@Component({
    selector: 'app-doctor-dashboard',
    templateUrl: './doctor-dashboard.page.html',
    styleUrls: ['./doctor-dashboard.page.scss'],
    imports: [IonicModule, NgClass, SkeletonComponent, SlicePipe, DatePipe]
})
export class DoctorDashboardPage implements OnInit {
  doctorName = "Dr. Juan Martínez";
  doctorPhoto = "https://i.pravatar.cc/150?img=12";
  public infoUser: DecodedUser = {} as DecodedUser
  datesIncoming: DatesResponse[] = [];
  datesDone: DatesResponse[] = [];
  loading = false;
  constructor(private navCtrl: NavController, private userService: UserService, private authService: AuthService, private platform: Platform) { }

  async ngOnInit() {
    this.loading = true;
    this.infoUser = await this.authService.getUserInfo();
    await this.delay(1000);
    this.callService();
  }
  async callService(): Promise<void> {
    this.loading = true;

    try {
      const request: requestId = {
        id: this.infoUser.id
      };

      const resp = await firstValueFrom(
        this.userService.getDatesByDoctor(request)
      );

      this.datesIncoming = resp.datesIncoming;
      this.datesDone = resp.datesDone;
    } catch (err) {
      console.error('Error al obtener las citas del doctor:', err);
      this.datesIncoming = [];
      this.datesDone = [];
    } finally {
      this.loading = false;
    }
  }

  /** Clase de estilo para el chip de estado (solo presentación). */
  statusClass(state: string): string {
    const map: Record<string, string> = {
      pendiente: 'is-pendiente',
      confirmada: 'is-confirmada',
      'en curso': 'is-en-curso',
      cancelada: 'is-cancelada',
      finalizada: 'is-finalizada'
    };
    return map[(state ?? '').toLowerCase()] || 'is-default';
  }

  /** Iniciales del doctor para el avatar de reserva (solo presentación). */
  get doctorInitials(): string {
    const name = (this.infoUser?.name ?? '').trim();
    if (!name) return 'DR';
    return name
      .split(/\s+/)
      .slice(0, 2)
      .map(p => p.charAt(0))
      .join('')
      .toUpperCase();
  }

  trackByDate(_index: number, cita: DatesResponse) {
    return cita.id;
  }

  viewAll() {
    this.navCtrl.navigateForward('/doctor/dates', {
      state: {
        dates: this.datesIncoming
      }
    });
  }

  viewHistory() {
    this.navCtrl.navigateForward('/doctor/dates', {
      state: {
        dates: this.datesDone
      }
    });
  }
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async logout() {
    const slug = await this.authService.getSlug();
    await this.authService.logout();
    await this.platform.ready();
    await this.navCtrl.navigateRoot(`/${slug}/login`)
  }

  async doRefresh(event: any) {
    this.loading = true;
    await this.delay(1000);
    this.callService();
    event.target.complete(); // cierra el loader del refresher
  }
}
