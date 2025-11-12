import { Component } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
  standalone: false
})
export class ShopPage {
  products = [
    {
      name: 'Collar Antipulgas',
      price: 9.99,
      image: 'assets/img/products/collar.png',
    },
    {
      name: 'Champú para Perros',
      price: 6.49,
      image: 'assets/img/products/shampoo.png',
    },
    {
      name: 'Juguete de Goma',
      price: 4.25,
      image: 'assets/img/products/toy.png',
    },
    {
      name: 'Comedero Ecológico',
      price: 12.9,
      image: 'assets/img/products/feeder.png',
    },
  ];

  addToCart(product: any) {
    console.log('Agregado al carrito:', product);
    // Aquí podrías abrir un toast o modal de confirmación
  }
}
