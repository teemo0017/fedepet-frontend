import { Component, OnInit } from '@angular/core';
import { SquareSlideInfo } from '../../shared/interfaces/interfaces';
import { Preferences } from '@capacitor/preferences';
import { NavController, Platform, IonicModule } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { Doctor, petsResponseByUser, requestId } from '../services/models/users';
import { AuthService } from '../../core/auth.service';
import { DecodedUser } from '../../core/models/auth';
import { finalize } from 'rxjs';
import { RoundSlideComponent } from '../../shared/components/round-slide/round-slide.component';
import { SquareSlideComponent } from '../../shared/components/square-slide/square-slide.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
    imports: [IonicModule, RoundSlideComponent, SquareSlideComponent, SkeletonComponent]
})
export class DashboardPage implements OnInit {
  public firstCall = true;
  public infoUser: DecodedUser = {} as DecodedUser
  public loading = false;
  public infoDoctors: SquareSlideInfo[] = [
  ];

  public infoPets: SquareSlideInfo[] = [];

  styles: Partial<CSSStyleDeclaration> = {
    maxWidth: '500px',
    margin: '0 auto',
  };

  async goExit() {
    await Preferences.clear();
    await this.platform.ready();
    await this.navCtrl.navigateRoot('/login')

  }

  async goManagerPets() {
    this.navCtrl.navigateForward('/user/pets',)

  }
  async goCreateDate() {
    this.navCtrl.navigateForward('/user/appointment',)

  }

  async goDates() {
    this.navCtrl.navigateForward('/user/dates',)

  }
  async goToCreate() {
    this.navCtrl.navigateForward('/user/add-pet',)
  }
  constructor(private navCtrl: NavController, private userService: UserService, private authService: AuthService, private platform: Platform) { }

  async ngOnInit() {
    this.loading = true;
    await this.delay(1000);
    this.infoUser = await this.authService.getUserInfo();
    this.callServicePet();
    this.callServiceDocts();
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  public async callServicePet() {

    const request: requestId = {
      id: this.infoUser.id
    };

    this.userService.getPets(request)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (resp: petsResponseByUser[]) => {
          this.infoPets = resp.map(pet => {
            return {
              url: pet.photo,
              title: pet.name,
            }
          })

        },
        error: (err) => {
          console.log("Error al llamar el servicio");
        }
      });
  }
  async ionViewDidEnter() {
    if (this.firstCall) {
      this.callServiceDocts();
      this.firstCall = false;
    }
  }
  public callServiceDocts() {
    this.userService.getDocts().subscribe({
      next: async (resp: Doctor[]) => {
        this.infoDoctors = resp.map(doc => {
          return {
            url: doc.photo,
            title: doc.name,
            description: doc.description
          }
        })
      },
      error: (err) => {
        console.log("Error al llamar el servicio");
      },
    });
  }

  async doRefresh(event: any) {
    this.loading = true;
    await this.delay(1000);
    this.callServicePet();
    event.target.complete(); // cierra el loader del refresher
  }
}
