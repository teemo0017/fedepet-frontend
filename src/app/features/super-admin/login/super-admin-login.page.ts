import { Component } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavController, IonicModule } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { Login } from 'src/app/core/models/auth';
import { ToastService } from 'src/app/features/services/toast.service';

@Component({
  selector: 'app-super-admin-login',
  templateUrl: './super-admin-login.page.html',
  styleUrls: ['./super-admin-login.page.scss'],
  imports: [IonicModule, FormsModule, ReactiveFormsModule]
})
export class SuperAdminLoginPage {
  hide = true;
  loadingService = false;

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private toastService: ToastService,
    private fb: FormBuilder
  ) { }

  get f() {
    return this.form.controls;
  }

  togglePassword() {
    this.hide = !this.hide;
  }

  async submit(): Promise<void> {
    if (this.loadingService) return;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loadingService = true;

    try {
      const data: Login = {
        username: this.f.username.value ?? '',
        password: this.f.password.value ?? ''
      };

      await firstValueFrom(this.authService.loginSuperAdmin(data));
      this.navCtrl.navigateRoot('/super-admin/clinics');
    } catch (err: any) {
      console.error('Error al iniciar sesión:', err);
      this.form.markAllAsTouched();
      this.form.setErrors({ invalidRequest: true });
      await this.toastService.error(err?.error?.body ?? 'No se pudo iniciar sesión');
    } finally {
      this.loadingService = false;
    }
  }
}
