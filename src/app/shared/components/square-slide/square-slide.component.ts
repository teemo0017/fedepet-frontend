import { Component, OnInit, input } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { SquareSlideInfo } from '../../interfaces/interfaces';
import { NgClass } from '@angular/common';
import { IonicModule } from '@ionic/angular';
register();
@Component({
    selector: 'square-slide',
    templateUrl: './square-slide.component.html',
    styleUrls: ['./square-slide.component.scss'],
    imports: [NgClass, IonicModule]
})
export class SquareSlideComponent implements OnInit {

  public readonly squareSlideInfo = input<SquareSlideInfo[]>([]);
  constructor() { }

  ngOnInit() { }


}
