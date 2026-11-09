import { Component, OnInit, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../../services/user.service';
import { NavController, IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/core/auth.service';
import { DecodedUser } from 'src/app/core/models/auth';
import { DatesResponse, requestId } from '../../services/models/users';
import { NgClass, TitleCasePipe, DatePipe } from '@angular/common';
import { SkeletonComponent } from '../../../shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.page.html',
  styleUrls: ['./dates.page.scss'],
  imports: [IonicModule, NgClass, SkeletonComponent, TitleCasePipe, DatePipe]
})
export class DatesPage implements OnInit {
  public isFirst = true;
  public infoUser: DecodedUser = {} as DecodedUser
  public loading = signal(false);
  public dateList: DatesResponse[] = [];
  constructor(private navCtrl: NavController, private userService: UserService, private authService: AuthService) {

  }
  async ngOnInit(): Promise<void> {

    this.infoUser = await this.authService.getUserInfo();
    this.callService();
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public async callService(): Promise<void> {
    this.loading.set(true);
    
    try {
      const request: requestId = {
        id: this.infoUser.id
      };

      this.dateList = await firstValueFrom(
        this.userService.getDatesByUser(request)
      );
    } catch (err) {
      console.error('Error al obtener las citas:', err);
      this.dateList = [];
    } finally {
      this.loading.set(false);
    }
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
    this.loading.set(true);
    await this.delay(1000);
    this.callService();
    event.target.complete(); // cierra el loader del refresher
  }
}
