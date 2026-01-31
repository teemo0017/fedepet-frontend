import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { DatesResponse, GenericResponseSave, requestId, updateDateState } from '../services/models/users';
import { finalize } from 'rxjs';
import { DecodedUser } from 'src/app/core/models/auth';
import { ActionSheetController, NavController, Platform } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
    selector: 'app-doctor-dates',
    templateUrl: './doctor-dates.page.html',
    styleUrls: ['./doctor-dates.page.scss'],
    standalone: false
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
    const state = this.router.getCurrentNavigation()?.extras.state;
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
    await this.navCtrl.navigateRoot('/doctor-dashboard')

  }

  updateDate(id: number, state: string) {
    this.loading = true;
    this.delay(2000);
    const request: updateDateState = {
      id: id,
      state: state
    };
    this.userService.updateDate(request)
      .subscribe({
        next: async (resp: GenericResponseSave) => {
          await this.createToastSuccess();
          this.delay(2000)
          await this.navCtrl.navigateRoot('/doctor-dashboard')
        },
        error: (err) => {
          console.log("Error al llamar el servicio");
        }
      });
  }

  async createToastSuccess() {
    await this.toastService.success('Cita actualizada!');
  }
}
