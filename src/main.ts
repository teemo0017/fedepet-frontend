import { provideZoneChangeDetection, importProvidersFrom } from "@angular/core";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { provideLottieOptions } from "ngx-lottie";
import { RouteReuseStrategy } from "@angular/router";
import { IonicRouteStrategy, IonicModule } from "@ionic/angular";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { AppRoutingModule } from "./app/app-routing.module";
import { AppComponent } from "./app/app.component";
import { register } from 'swiper/element/bundle';

register();

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, // Requerido para Angular
        IonicModule.forRoot(), // Inicializa Ionic
        AppRoutingModule),
        provideLottieOptions({
            // carga dinámica de lottie-web
            player: () => import('lottie-web'),
        }),
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.log(err));
