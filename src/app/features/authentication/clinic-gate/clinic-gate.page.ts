import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavController, IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-clinic-gate',
  templateUrl: './clinic-gate.page.html',
  styleUrls: ['./clinic-gate.page.scss'],
  imports: [IonicModule, FormsModule]
})
export class ClinicGatePage implements OnInit {
  checking = true;
  slugInput = '';

  constructor(private navCtrl: NavController, private authService: AuthService) { }

  ngOnInit() {
    // Diferido a un macrotask nuevo: si la promesa de Preferences.get() resuelve
    // demasiado rápido, mutar `checking` dentro del mismo ciclo de detección de
    // cambios del render inicial dispara NG0100 (ExpressionChangedAfterItHasBeenCheckedError)
    // y corta el re-render, dejando la pantalla trabada en el estado de "checking".
    setTimeout(() => this.resolveClinic(), 0);
  }

  private async resolveClinic() {
    try {
      const savedSlug = await this.withTimeout(this.authService.getSlug(), 3000);
      if (savedSlug) {
        await this.navCtrl.navigateRoot(`/${savedSlug}/login`);
        return;
      }
    } catch (err) {
      console.error('Error al leer la clínica guardada:', err);
    }
    this.checking = false;
  }

  private withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    return Promise.race([
      promise,
      new Promise<T>((_, reject) => setTimeout(() => reject(new Error('timeout')), ms))
    ]);
  }

  goToClinic() {
    const slug = this.slugInput.trim();
    if (!slug) return;
    this.navCtrl.navigateRoot(`/${slug}/login`);
  }
}
