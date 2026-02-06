import { Component } from '@angular/core';
import { NavController, IonicModule } from '@ionic/angular';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.page.html',
    styleUrls: ['./shop.page.scss'],
    imports: [IonicModule, DecimalPipe]
})
export class ShopPage {
products: any[] = [];

  ngOnInit() {
    this.loadMockProducts();
  }

  constructor(private navCtrl: NavController){}

  loadMockProducts() {
    this.products = [
      {
        name: 'Croquetas NutriCan Adulto',
        price: 18.99,
        image: 'https://images.pexels.com/photos/5731860/pexels-photo-5731860.jpeg'
      },
      {
        name: 'Shampoo Medicado',
        price: 9.50,
        image: 'https://images.pexels.com/photos/7474510/pexels-photo-7474510.jpeg'
      },
      {
        name: 'Juguete Mordedor Premium',
        price: 7.25,
        image: 'https://images.pexels.com/photos/4588012/pexels-photo-4588012.jpeg'
      },
      {
        name: 'Arena para Gato UltraClean',
        price: 13.99,
        image: 'https://images.pexels.com/photos/4394292/pexels-photo-4394292.jpeg'
      },
      {
        name: 'Galletas Orgánicas PetBite',
        price: 5.40,
        image: 'https://images.pexels.com/photos/3871196/pexels-photo-3871196.jpeg'
      },
      {
        name: 'Cama Suave Antiestrés',
        price: 24.99,
        image: 'https://images.pexels.com/photos/5731794/pexels-photo-5731794.jpeg'
      }
    ];
  }

    goBack() {
    this.navCtrl.back();
  }


}
