import { Component } from '@angular/core';

import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleOutline, addOutline, alertCircleOutline, analyticsOutline, arrowBackOutline, arrowForwardOutline, calendarClearOutline, calendarOutline, callOutline, cameraOutline, cardOutline, cartOutline, checkmarkCircleOutline, chevronBackOutline, chevronForwardOutline, close, closeCircleOutline, colorPaletteOutline, copyOutline, createOutline, cubeOutline, documentTextOutline, exitOutline, eyeOffOutline, eyeOutline, heartOutline, homeOutline, informationCircle, linkOutline, locationOutline, lockClosedOutline, logOutOutline, mailOutline, medicalOutline, medkitOutline, pawOutline, peopleOutline, personCircleOutline, personOutline, playCircleOutline, pricetagOutline, pulseOutline, ribbonOutline, shieldCheckmarkOutline, storefrontOutline, timeOutline } from 'ionicons/icons';
import { environment } from 'src/environments/environment';
import { ThemeService } from './core/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonApp, IonRouterOutlet]
})
export class AppComponent {
  constructor(private themeService: ThemeService) {
    addIcons({ homeOutline, calendarOutline, heartOutline, cardOutline, exitOutline, personOutline, lockClosedOutline, eyeOutline, informationCircle, chevronBackOutline, cartOutline, addCircleOutline, pawOutline, eyeOffOutline, alertCircleOutline, arrowForwardOutline, arrowBackOutline, storefrontOutline, shieldCheckmarkOutline, mailOutline, callOutline, logOutOutline, chevronForwardOutline, medkitOutline, addOutline, analyticsOutline, calendarClearOutline, cameraOutline, checkmarkCircleOutline, close, closeCircleOutline, createOutline, cubeOutline, documentTextOutline, medicalOutline, peopleOutline, personCircleOutline, playCircleOutline, pricetagOutline, pulseOutline, ribbonOutline, timeOutline, linkOutline, locationOutline, colorPaletteOutline, copyOutline });

    // Reaplica el color de marca de la última clínica usada (evita flash del color por defecto).
    this.themeService.restoreTheme();

    // Mostrar mensaje si los mocks están activados
    if (environment.useMocks) {
      console.log(
        '%c🎭 MODO MOCK ACTIVADO',
        'background: #ff6b6b; color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 5px;'
      );
      console.log(
        '%cEstás usando datos de prueba. No necesitas el backend.',
        'color: #ff6b6b; font-size: 12px; font-weight: bold;'
      );
      console.log(
        '%cPara desactivar: npm run mocks:off',
        'color: #666; font-size: 11px;'
      );
    }
  }
}
