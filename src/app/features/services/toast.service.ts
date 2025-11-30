import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

export type ToastPosition = 'top' | 'middle' | 'bottom';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) { }

  // Método genérico
  async show(
    message: string,
    options?: {
      color?: string;
      icon?: string;
      duration?: number;
      position?: ToastPosition;
    }
  ) {
    const toast = await this.toastController.create({
      message,
      duration: options?.duration ?? 2500,
      position: options?.position ?? 'top',
      color: options?.color ?? 'dark',
      icon: options?.icon,
      buttons: [
        {
          icon: 'close',
          role: 'cancel',
        },
      ],

    });

    await toast.present();
  }

  // Atajos útiles:
  async success(message: string) {
    return this.show(message, {
      color: 'success',
      icon: 'checkmark-circle-outline',
    });
  }

  async error(message: string) {
    return this.show(message, {
      color: 'danger',
      icon: 'alert-circle-outline',
    });
  }

  async warning(message: string) {
    return this.show(message, {
      color: 'warning',
      icon: 'warning-outline',
    });
  }

  async info(message: string) {
    return this.show(message, {
      color: 'primary',
      icon: 'information-circle-outline',
    });
  }
}
