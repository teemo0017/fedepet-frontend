import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// 🔹 Si usarás peticiones HTTP (recomendado)
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideLottieOptions } from 'ngx-lottie';


@NgModule({
  declarations: [AppComponent],

  imports: [
    BrowserModule,             // Requerido para Angular
    IonicModule.forRoot(),     // Inicializa Ionic
    AppRoutingModule,          // Tus rutas
    HttpClientModule           // Habilita HttpClient en toda la app
  ],

  providers: [
    provideLottieOptions({
      // carga dinámica de lottie-web
      player: () => import('lottie-web'),
    }),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],

  bootstrap: [AppComponent],
})
export class AppModule { }
