import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter, withComponentInputBinding, RouteReuseStrategy } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from "@angular/common/http";

// Ionic Standalone Providers
import { provideIonicAngular, IonicRouteStrategy } from "@ionic/angular/standalone";
import { provideLottieOptions } from "ngx-lottie";
import { register } from 'swiper/element/bundle';

import { AppComponent } from "./app/app.component";
import { MAIN_ROUTES } from './app/app.routes';
import { AppInterceptor } from './app/core/app.interceptor';
import { mockInterceptor } from './app/core/mocks/mock.interceptor';

register();

bootstrapApplication(AppComponent, {
    providers: [
        // 1. You DON'T need BrowserModule here. bootstrapApplication handles it.
        // 2. Use provideIonicAngular() instead of IonicModule.forRoot()
        provideIonicAngular({ mode: 'ios' }),

        provideRouter(MAIN_ROUTES, withComponentInputBinding()),

        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

        // Nuevo sistema de interceptores funcionales + sistema antiguo
        provideHttpClient(
            withInterceptors([mockInterceptor]), // Mock interceptor (nuevo sistema)
            withInterceptorsFromDi() // Para mantener compatibilidad con AppInterceptor
        ),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AppInterceptor,
            multi: true
        },

        provideLottieOptions({
            player: () => import('lottie-web'),
        }),
    ]
})
    .catch(err => console.error(err));