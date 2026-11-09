import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ClinicPublicInfo } from './models/auth';

const THEME_KEY = 'clinicTheme';

interface StoredTheme {
  primaryColor: string;
  logo: string;
  name: string;
}

/**
 * Aplica la identidad visual de la clínica (color de marca + logo) como
 * variables CSS en runtime, para que cada clínica vea "su" app.
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  async applyClinicTheme(info: ClinicPublicInfo): Promise<void> {
    const primaryColor = info.primaryColor || '#ffa420';

    this.setCssVars(primaryColor);

    await Preferences.set({
      key: THEME_KEY,
      value: JSON.stringify({ primaryColor, logo: info.logo ?? '', name: info.name ?? '' } as StoredTheme)
    });
  }

  /** Reaplica el último tema guardado (útil al arrancar la app sin re-consultar el backend). */
  async restoreTheme(): Promise<StoredTheme | null> {
    const { value } = await Preferences.get({ key: THEME_KEY });
    if (!value) return null;

    try {
      const theme: StoredTheme = JSON.parse(value);
      this.setCssVars(theme.primaryColor);
      return theme;
    } catch {
      return null;
    }
  }

  private setCssVars(primaryColor: string): void {
    const root = document.documentElement.style;
    root.setProperty('--app-color-primary', primaryColor);
    // Alias de compatibilidad: la paleta original usa "orange" como color de marca.
    root.setProperty('--app-color-orange', primaryColor);
  }
}
