import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { UserService } from '../services/user.service';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/auth.service';
import { DecodedUser } from 'src/app/core/models/auth';
import { DatesResponse, requestId } from '../services/models/users';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.page.html',
  styleUrls: ['./dates.page.scss'],
})
export class DatesPage implements OnInit {
  public isFirst = true;
  public infoUser: DecodedUser = {} as DecodedUser
  public loading = false;
  public dateList: DatesResponse[] = [];
  constructor(private navCtrl: NavController, private userService: UserService, private authService: AuthService) {

  }
  async ngOnInit(): Promise<void> {

    this.infoUser = await this.authService.getUserInfo();
    this.callService();
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public callService() {
    this.loading = true;
    this.delay(2000);
    const request: requestId = {
      id: this.infoUser.id
    };

    this.userService.getDatesByUser(request)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (resp: DatesResponse[]) => {
          this.dateList = resp;
          console.log(this.dateList);

        },
        error: (err) => {
          console.log("Error al llamar el servicio");
        }
      });
  }

  public goBack(): void {
    this.navCtrl.back();
  }

  public getStatusClass(state: string): string {
    const states: any = {
      pendiente: 'status-pendiente',
      confirmada: 'status-confirmada',
      'en curso': 'status-en-curso',
      cancelada: 'status-cancelada',
      finalizada: 'status-finalizada'
    };
    return states[state.toLowerCase()] || 'status-default';
  }

  async goToCreate() {
    this.navCtrl.navigateForward('/user/appointment',)
  }

  async doRefresh(event: any) {
    this.loading = true;
    await this.delay(1000);
    this.callService();
    event.target.complete(); // cierra el loader del refresher
  }
}
