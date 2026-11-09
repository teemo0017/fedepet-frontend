
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, IonicModule } from '@ionic/angular';

import { DecodedUser, Login } from 'src/app/core/models/auth';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { ThemeService } from 'src/app/core/theme.service';
import { ToastService } from 'src/app/features/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    imports: [IonicModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit, AfterViewInit {
  hide = true;
  loadingService = false;
  loadingGoogle = false;
  clinicName = '';
  clinicLogo = '';
  loadingClinic = true;
  private slug = '';

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private themeService: ThemeService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('slug') ?? '';

    this.authService.getPublicInfo(this.slug).subscribe({
      next: (info) => {
        this.clinicName = info.name;
        this.clinicLogo = info.logo;
        this.loadingClinic = false;
        this.themeService.applyClinicTheme(info);
      },
      error: () => {
        this.clinicName = '';
        this.loadingClinic = false;
      }
    });
  }

  ngAfterViewInit() {
    const gsi = (window as any).google;
    if (!gsi) return;

    gsi.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (response: any) => this.handleGoogleCredential(response),
    });
    gsi.accounts.id.renderButton(
      document.getElementById('google-btn'),
      { theme: 'outline', size: 'large', width: 280, locale: 'es' }
    );
  }

  private async handleGoogleCredential(response: any): Promise<void> {
    this.loadingGoogle = true;
    try {
      await this.authService.loginWithGoogle(this.slug, response.credential);
      const userInfo = await this.authService.getUserInfo();
      this.navigateByRole(userInfo.role);
    } catch (err) {
      console.error('Error al iniciar sesión con Google:', err);
      await this.toastService.error('No se pudo iniciar sesión con Google');
    } finally {
      this.loadingGoogle = false;
    }
  }

  private navigateByRole(role: string): void {
    if (role === 'DOCTOR') {
      this.navCtrl.navigateRoot('/doctor/dashboard');
    } else if (role === 'ADMIN') {
      this.navCtrl.navigateRoot('/admin/dashboard');
    } else {
      this.navCtrl.navigateRoot('/user/dashboard');
    }
  }

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
      const user: Login = {
        username: this.f.username.value ?? '',
        password: this.f.password.value ?? ''
      };

      await firstValueFrom(
        this.authService.login(this.slug, user)
      );

      const userInfo: DecodedUser = await this.authService.getUserInfo();
      this.navigateByRole(userInfo.role);
    } catch (err: any) {
      console.error('Error al iniciar sesión:', err);
      this.form.markAllAsTouched();
      this.form.setErrors({ invalidRequest: true });
      await this.toastService.error(err?.error?.body ?? 'No se pudo iniciar sesión');
    } finally {
      this.loadingService = false;
    }
  }

  redirectToRegister() {
    this.navCtrl.navigateRoot(`/${this.slug}/register`)
  }

}
