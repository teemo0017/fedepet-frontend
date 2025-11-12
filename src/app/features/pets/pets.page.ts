import { Component, OnInit } from '@angular/core';
import { petsResponseByUser, requestId } from '../services/models/users';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/auth.service';
import { UserService } from '../services/user.service';
import { DecodedUser } from 'src/app/core/models/auth';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.page.html',
  styleUrls: ['./pets.page.scss']
})
export class PetsPage implements OnInit {

  loading = true;
  activeFilter: 'todas' | 'perro' | 'gato' | 'otros' = 'todas';
  query = '';
  defaultPhoto = 'assets/img/pet-placeholder.png';

  pets: petsResponseByUser[] = [

  ];

  petsFiltered: petsResponseByUser[] = [];
  public infoUser: DecodedUser = {} as DecodedUser

  async ngOnInit() {
    this.infoUser = await this.authService.getUserInfo();
    // Simula carga

  }
  constructor(private navCtrl: NavController, private userService: UserService, private authService: AuthService) { }
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
    console.log(list);
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

  openDetails(pet: petsResponseByUser) {
    // TODO: navega a detalle
    console.log('Detalle de mascota', pet);
  }

  editPet(pet: petsResponseByUser) {
    console.log('Editar', pet);
  }

  deletePet(pet: petsResponseByUser) {
    // TODO: confirm + service delete
    console.log('Eliminar', pet);
  }

  ionViewWillEnter() {
    this.callServicePet();
    setTimeout(() => {
      this.loading = false;
      this.applyFilters();
    }, 700);
  }

  public async callServicePet() {

    const request: requestId = {
      id: this.infoUser.id
    };

    this.userService.getPets(request).subscribe({
      next: async (resp: petsResponseByUser[]) => {
        this.pets = resp;

      },
      error: (err) => {
        console.log("Error al llamar el servicio");
      }
    });
  }
}
