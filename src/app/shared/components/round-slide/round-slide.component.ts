import { Component, Input, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { SquareSlideInfo } from '../../interfaces/interfaces';
register();
@Component({
  selector: 'round-slide',
  templateUrl: './round-slide.component.html',
  styleUrls: ['./round-slide.component.scss'],
  standalone: false
})
export class RoundSlideComponent implements OnInit {

  @Input()
  public roundSlideInfo: SquareSlideInfo[] = []

  constructor() { }

  ngOnInit() { }


}
