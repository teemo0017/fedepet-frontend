import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { DatesResponse, GenericResponseSave, requestId, updateDateState } from '../../services/models/users';
import { firstValueFrom } from 'rxjs';
import { DecodedUser } from 'src/app/core/models/auth';
import { ActionSheetController, NavController, Platform, IonicModule } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { NgClass, DatePipe } from '@angular/common';
import { SkeletonComponent } from '../../../shared/components/skeleton/skeleton.component';

@Component({
    selector: 'app-doctor-dates',
    templateUrl: './doctor-dates.page.html',
    styleUrls: ['./doctor-dates.page.scss'],
    imports: [IonicModule, NgClass, SkeletonComponent, DatePipe]
})
export class DoctorDatesPage implements OnInit {
  public loading = false;
  public infoUser: DecodedUser = {} as DecodedUser
  public dateList: DatesResponse[] = [];

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private platform: Platform,
    private navCtrl: NavController,
    private readonly router: Router,
    private userService: UserService, private authService: AuthService,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
    const state = this.router.currentNavigation()?.extras.state;
    console.log(state);
    this.dateList = state?.['dates'];
    console.log(this.dateList);
  }
  async ionViewWillEnter() {
    this.loading = true;
    this.delay(2000);
    this.loading = false;
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  trackByDate(_index: number, item: DatesResponse) {
    return item.id;
  }

  // ⭐ Retorna clases dinámicas según el estado
  getStatusClass(state: string): string {
    const states: any = {
      pendiente: 'status-pendiente',
      confirmada: 'status-confirmada',
      'en curso': 'status-en-curso',
      cancelada: 'status-cancelada',
      finalizada: 'status-finalizada'
    };
    return states[state.toLowerCase()] || 'status-default';
  }

  // ⭐ Abrir menú para cambiar estado
  async openStatusModal(item: DatesResponse) {
    const buttons: any[] = [];
    switch (item.state) {
      case 'PENDIENTE':
        buttons.push(
          {
            text: 'Confirmada',
            icon: 'checkmark-circle-outline',
            handler: () => this.updateStatus(item, 'CONFIRMADA')
          },
          {
            text: 'Cancelada',
            icon: 'close-circle-outline',
            handler: () => this.updateStatus(item, 'CANCELADA')
          }
        );
        break;

      case 'CONFIRMADA':
        buttons.push(
          {
            text: 'En curso',
            icon: 'play-circle-outline',
            handler: () => this.updateStatus(item, 'EN CURSO')
          },
          {
            text: 'Cancelada',
            icon: 'close-circle-outline',
            handler: () => this.updateStatus(item, 'CANCELADA')
          }
        );
        break;

      case 'EN CURSO':
        buttons.push(
          {
            text: 'Finalizada',
            icon: 'ribbon-outline',
            handler: () => this.updateStatus(item, 'FINALIZADA')
          },
          {
            text: 'Cancelada',
            icon: 'close-circle-outline',
            handler: () => this.updateStatus(item, 'CANCELADA')
          }
        );
        break;
    }
    buttons.push(
      {
        text: 'Cerrar',
        role: 'cancel',
        icon: 'close'
      }
    )

    const actionSheet = await this.actionSheetCtrl.create({
      header: `Cambiar estado de ${item.pet}`,
      buttons: buttons
    });

    await actionSheet.present();
  }

  verifyStatusDate(item: DatesResponse): boolean {
    const status = ['CANCELADA', 'FINALIZADA']
    return status.includes(item.state);
  }

  // 🔹 Aquí luego llamas a tu backend con PUT/PATCH
  updateStatus(item: DatesResponse, newState: string) {
    this.updateDate(item.id, newState);
  }

  async back() {
    await this.navCtrl.navigateRoot('/doctor/dashboard')

  }

  async updateDate(id: number, state: string): Promise<void> {
    this.loading = true;

    try {
      const request: updateDateState = {
        id: id,
        state: state
      };

      await firstValueFrom(
        this.userService.updateDate(request)
      );

      await this.createToastSuccess();
      await this.delay(2000);
      await this.navCtrl.navigateRoot('/doctor/dashboard');
    } catch (err) {
      console.error('Error al actualizar la cita:', err);
    } finally {
      this.loading = false;
    }
  }

  async createToastSuccess() {
    await this.toastService.success('Cita actualizada!');
  }
}
