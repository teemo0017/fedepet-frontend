import { Component, Input, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { SquareSlideInfo } from '../../interfaces/interfaces';
register();
@Component({
  selector: 'square-slide',
  templateUrl: './square-slide.component.html',
  styleUrls: ['./square-slide.component.scss'],
  standalone: false
})
export class SquareSlideComponent implements OnInit {

  @Input()
  public squareSlideInfo: SquareSlideInfo[] = []
  constructor() { }

  ngOnInit() { }


}
