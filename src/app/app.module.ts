import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import player from 'lottie-web';
import { AppComponent } from './app.component';
import {provideLottieOptions } from 'ngx-lottie';
import { AppRoutingModule } from './app-routing.module';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(),AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideLottieOptions({
    player: () => import('lottie-web'),
  }),],
  bootstrap: [AppComponent],
})
export class AppModule { }
