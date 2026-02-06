import { Component, OnInit, input } from '@angular/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'component-skeleton',
    templateUrl: './skeleton.component.html',
    styleUrls: ['./skeleton.component.scss'],
    imports: [IonicModule, LottieComponent]
})
export class SkeletonComponent implements OnInit {

  readonly count = input(3);
  readonly showFooter = input(false);
  readonly type = input<'grid' | 'list'>('grid');
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
