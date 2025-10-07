import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { SquareSlideInfo } from '../../shared/interfaces/interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit {

  public infoDoctors: SquareSlideInfo[] = [
    {
      url: "3",
      title: "Oscar Vaso",
      description: "Doctor especializado en Perico con alta responsabilidad"
    },
    {
      url: "2",
      title: "Ameth Duarte",
      description: "Doctor especializado en Perros con mas de 10 años"
    },
    {
      url: "1",
      title: "Ricardo Vargas",
      description: "Doctor especializado en Perras con una gran reputación"
    }
  ];

    public infoPets: SquareSlideInfo[] = [
    {
      url: "pet1",
      title: "Chichemito",
      description: "Doctor especializado en Perico con alta responsabilidad"
    },
    {
      url: "pet3",
      title: "Saul",
      description: "Doctor especializado en Perros con mas de 10 años"
    },
    {
      url: "pet2",
      title: "Varela",
      description: "Doctor especializado en Perras con una gran reputación"
    }
  ];

  options: AnimationOptions = {
    path: '/assets/animations/lovely_cats.json',
  };

  styles: Partial<CSSStyleDeclaration> = {
    maxWidth: '500px',
    margin: '0 auto',
  };
  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
  constructor() { }

  ngOnInit() {
  }

}
