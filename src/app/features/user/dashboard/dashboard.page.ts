import { Component, OnInit, signal } from '@angular/core';
import { SquareSlideInfo } from '../../../shared/interfaces/interfaces';
import { NavController, Platform, IonicModule } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { Doctor, petsResponseByUser, requestId } from '../../services/models/users';
import { AuthService } from '../../../core/auth.service';
import { DecodedUser } from '../../../core/models/auth';
import { firstValueFrom } from 'rxjs';
import { RoundSlideComponent } from '../../../shared/components/round-slide/round-slide.component';
import { SquareSlideComponent } from '../../../shared/components/square-slide/square-slide.component';
import { SkeletonComponent } from '../../../shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  imports: [IonicModule, RoundSlideComponent, SquareSlideComponent, SkeletonComponent]
})
export class DashboardPage implements OnInit {
  public firstCall = true;
  public infoUser: DecodedUser = {} as DecodedUser
  public loading = signal(false);
  public infoDoctors: SquareSlideInfo[] = [
  ];

  public infoPets: SquareSlideInfo[] = [];

  styles: Partial<CSSStyleDeclaration> = {
    maxWidth: '500px',
    margin: '0 auto',
  };

  /** Saludo según la hora del día (solo presentación). */
  get greeting(): string {
    const h = new Date().getHours();
    if (h < 12) return 'Buenos días';
    if (h < 19) return 'Buenas tardes';
    return 'Buenas noches';
  }

  /** Iniciales del usuario para el avatar (solo presentación). */
  get initials(): string {
    const name = (this.infoUser?.name ?? '').trim();
    if (!name) return '🐾';
    const parts = name.split(/\s+/);
    const first = parts[0]?.charAt(0) ?? '';
    const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : '';
    return (first + last).toUpperCase();
  }

  async goExit() {
    const slug = await this.authService.getSlug();
    await this.authService.logout();
    await this.platform.ready();
    await this.navCtrl.navigateRoot(`/${slug}/login`)

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
    this.loading.set(true);
    await this.delay(1000);
    this.infoUser = await this.authService.getUserInfo();
    this.callServicePet();
    this.callServiceDocts();
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  public async callServicePet(): Promise<void> {
    try {
      const request: requestId = {
        id: this.infoUser.id
      };

      const resp = await firstValueFrom(
        this.userService.getPets(request)
      );

      this.infoPets = resp.map(pet => ({
        url: pet.photo,
        title: pet.name,
      }));
    } catch (err) {
      console.error('Error al obtener las mascotas:', err);
      this.infoPets = [];
    } finally {
      this.loading.set(false);
    }
  }
  async ionViewDidEnter() {
    if (this.firstCall) {
      this.callServiceDocts();
      this.firstCall = false;
    }
  }
  public async callServiceDocts(): Promise<void> {
    try {
      const resp = await firstValueFrom(
        this.userService.getDocts()
      );

      this.infoDoctors = resp.map(doc => ({
        url: doc.photo,
        title: doc.name,
        description: doc.description
      }));
    } catch (err) {
      console.error('Error al obtener los doctores:', err);
      this.infoDoctors = [];
    }
  }

  async doRefresh(event: any) {
    this.loading.set(true); 
    await this.delay(1000);
    this.callServicePet();
    event.target.complete(); // cierra el loader del refresher
  }
}
