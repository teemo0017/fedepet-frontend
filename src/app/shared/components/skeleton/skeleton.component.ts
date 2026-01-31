import { Component, Input, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
    selector: 'component-skeleton',
    templateUrl: './skeleton.component.html',
    styleUrls: ['./skeleton.component.scss'],
    standalone: false
})
export class SkeletonComponent implements OnInit {

  @Input() count = 3;
  @Input() showFooter = false;
  @Input() type: 'grid' | 'list' = 'grid';
  constructor() { }

    options: AnimationOptions = {
      path: 'assets/animations/dog_walking.json', // ajusta la ruta
      loop: true,
      autoplay: true,
    };

    onAnimationCreated(anim: any) {
      console.log('Lottie lista', anim);
    }

  ngOnInit() { }

}
