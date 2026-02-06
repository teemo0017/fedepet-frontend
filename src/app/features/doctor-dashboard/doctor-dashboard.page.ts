import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ActionSheetController, NavController, Platform, IonicModule } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { AuthService } from 'src/app/core/auth.service';
import { DateResponseDoctor, DatesResponse, GenericResponseSave, requestId, updateDateState } from '../services/models/users';
import { DecodedUser } from 'src/app/core/models/auth';
import { finalize } from 'rxjs';
import { NgClass, LowerCasePipe, SlicePipe, DatePipe } from '@angular/common';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';



@Component({
    selector: 'app-doctor-dashboard',
    templateUrl: './doctor-dashboard.page.html',
    styleUrls: ['./doctor-dashboard.page.scss'],
    imports: [IonicModule, NgClass, SkeletonComponent, LowerCasePipe, SlicePipe, DatePipe]
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
  callService() {
    this.loading = true;
    this.delay(2000);
    const request: requestId = {
      id: this.infoUser.id
    };

    this.userService.getDatesByDoctor(request)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (resp: DateResponseDoctor) => {
          this.datesIncoming = resp.datesIncoming;
          this.datesDone = resp.datesDone
        },
        error: (err) => {
          console.log("Error al llamar el servicio");
        }
      });
  }

  viewAll() {
    this.navCtrl.navigateForward('/doctor-dates', {
      state: {
        dates: this.datesIncoming
      }
    });
  }

  viewHistory() {
    this.navCtrl.navigateForward('/doctor-dates', {
      state: {
        dates: this.datesDone
      }
    });
  }
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async logout() {
    await Preferences.clear();
    await this.platform.ready();
    await this.navCtrl.navigateRoot('/login')
  }

  async doRefresh(event: any) {
    this.loading = true;
    await this.delay(1000);
    this.callService();
    event.target.complete(); // cierra el loader del refresher
  }
}
