import { Component, OnInit, signal } from '@angular/core';
import { NavController, IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/core/auth.service';
import { DecodedUser } from 'src/app/core/models/auth';
import { DatePipe } from '@angular/common';
import { petsResponseByUser, requestId } from '../../services/models/users';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';
import { firstValueFrom } from 'rxjs';
import { SkeletonComponent } from '../../../shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.page.html',
  styleUrls: ['./pets.page.scss'],
  imports: [IonicModule, DatePipe, SkeletonComponent]
})
export class PetsPage implements OnInit {
  public loading = signal(true);
  activeFilter: 'todas' | 'perro' | 'gato' | 'otros' = 'todas';
  query = '';
  defaultPhoto = 'assets/img/pet-placeholder.png';

  pets: petsResponseByUser[] = [

  ];

  petsFiltered: petsResponseByUser[] = [];
  public infoUser: DecodedUser = {} as DecodedUser

  async ngOnInit() {
    this.infoUser = await this.authService.getUserInfo();
  }
  constructor(
    private navCtrl: NavController,
    private userService: UserService,
    private authService: AuthService,
    private toastService: ToastService
  ) { }
  onSearch(ev: CustomEvent) {
    const value = (ev.detail as any).value || '';
    this.query = value.toLowerCase();
    this.applyFilters();
  }

  setFilter(f: 'todas' | 'perro' | 'gato' | 'otros') {
    this.activeFilter = f;
    this.applyFilters();
  }

  applyFilters() {
    let list = [...this.pets];
    // filtro por especie
    if (this.activeFilter !== 'todas') {
      list = list.filter(p =>
        (this.activeFilter === 'perro' && p.species === 'Perro') ||
        (this.activeFilter === 'gato' && p.species === 'Gato') ||
        (this.activeFilter === 'otros' && p.species === 'Otro')
      );
    }

    // búsqueda
    if (this.query) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(this.query) ||
        (p.breed || '').toLowerCase().includes(this.query)
      );
    }

    this.petsFiltered = list;
  }

  openCreate() {
    this.navCtrl.navigateForward('/user/add-pet');
  }

  async openDetails(pet: petsResponseByUser) {
    await this.toastService.info('El detalle de mascota estará disponible pronto');
  }

  async ionViewWillEnter() {
    this.loading.set(true);
    await this.callServicePet();
    this.applyFilters();
    this.loading.set(false);
  }

  public async callServicePet(): Promise<void> {
    try {
      const request: requestId = {
        id: this.infoUser.id
      };

      this.pets = await firstValueFrom(
        this.userService.getPets(request)
      );
    } catch (err) {
      console.error('Error al obtener las mascotas:', err);
      this.pets = [];
    }
  }
}
