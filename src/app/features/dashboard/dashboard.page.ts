import { Component, OnInit } from '@angular/core';
import { SquareSlideInfo } from '../../shared/interfaces/interfaces';
import { Preferences } from '@capacitor/preferences';
import { NavController, Platform } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { Doctor, petsResponseByUser, requestId } from '../services/models/users';
import { AuthService } from '../../core/auth.service';
import { DecodedUser } from '../../core/models/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit {
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

  async goToCreate() {
    this.navCtrl.navigateForward('/user/add-pet',)
  }
  constructor(private router: Router, private navCtrl: NavController, private userService: UserService, private authService: AuthService, private platform: Platform) { }

  async ngOnInit() {
    this.loading = true;
    this.infoUser = await this.authService.getUserInfo();
    this.callServiceDocts();
  }

  public async callServicePet() {

    const request: requestId = {
      id: this.infoUser.id
    };

    this.userService.getPets(request).subscribe({
      next: async (resp: petsResponseByUser[]) => {
        this.infoPets = resp.map(pet => {
          return {
            url: pet.photo,
            title: pet.name,
          }
        })

      },
      error: (err) => {
        console.log("Error al llamar el servicio");
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
  async ionViewDidEnter() {
      await this.callServicePet();
  }
  public callServiceDocts() {
    this.userService.getDocts().subscribe({
      next: async (resp: Doctor[]) => {
        this.infoDoctors = resp.map(doc => {
          return {
            url: doc.photo,
            title: doc.name,
            description: doc.specialty
          }
        })
      },
      error: (err) => {
        console.log("Error al llamar el servicio");
      },
      complete: () => {
      }
    });
  }


}
