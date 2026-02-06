import { Component, OnInit, input } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { SquareSlideInfo } from '../../interfaces/interfaces';
import { IonicModule } from '@ionic/angular';
register();
@Component({
    selector: 'round-slide',
    templateUrl: './round-slide.component.html',
    styleUrls: ['./round-slide.component.scss'],
    imports: [IonicModule]
})
export class RoundSlideComponent implements OnInit {

  public readonly roundSlideInfo = input<SquareSlideInfo[]>([]);

  constructor() { }

  ngOnInit() { }


}
