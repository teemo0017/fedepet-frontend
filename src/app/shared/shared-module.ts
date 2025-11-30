import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabVarComponent } from './components/tab-var/tab-var.component';
import { IonicModule } from '@ionic/angular';
import { SquareSlideComponent } from './components/square-slide/square-slide.component';
import { RoundSlideComponent } from './components/round-slide/round-slide.component';
import { SkeletonComponent } from './components/skeleton/skeleton.component';
import { LottieComponent } from 'ngx-lottie';

@NgModule({
  declarations: [TabVarComponent, SquareSlideComponent, RoundSlideComponent, SkeletonComponent],
  imports: [
    CommonModule,
    IonicModule,
    LottieComponent

  ], exports: [TabVarComponent, SquareSlideComponent, RoundSlideComponent, SkeletonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
