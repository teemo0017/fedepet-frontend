import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// 🔹 Si usarás peticiones HTTP (recomendado)
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideLottieOptions } from 'ngx-lottie';


@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [BrowserModule, // Requerido para Angular
        IonicModule.forRoot(), // Inicializa Ionic
        AppRoutingModule], providers: [
        provideLottieOptions({
            // carga dinámica de lottie-web
            player: () => import('lottie-web'),
        }),
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule { }
