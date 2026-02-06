import { DecodedUser } from './../../core/models/auth';

import { Component, OnInit } from '@angular/core';
import { NavController, Platform, IonicModule } from '@ionic/angular';

import { Login } from 'src/app/core/models/auth';
import { AuthService } from '../../core/auth.service';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

declare const google: any;
@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    imports: [IonicModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  hide = true;
  public loadingService = false;
  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor(private navCtrl: NavController, private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
  }

  get f() {
    return this.form.controls;
  }

  togglePassword() {
    this.hide = !this.hide;
  }

  submit() {
    if (this.loadingService) {
      return;
    }
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const user: Login = {
      username: this.f.username.value ?? '',
      password: this.f.password.value ?? ''
    }
    this.loadingService = true;
    this.authService.login(user)
      .pipe(
        finalize(() => {
          this.loadingService = false;
        }
        )
      ).subscribe({
        next: async (resp) => {
          const user: DecodedUser = await this.authService.getUserInfo();
          if (user && user.role === 'USUARIO') {
            this.navCtrl.navigateRoot('/user/dashboard');
          }
          if (user && user.role === 'DOCTOR') {
            this.navCtrl.navigateRoot('doctor-dashboard');
          }
          if (user && user.role === 'CAPTURADOR') {
            this.navCtrl.navigateRoot('doctor-dashboard');
          }
        },
        error: (err) => {
          this.form.markAllAsTouched();
          this.form.setErrors({ invalidRequest: true });
        }
      })
  }

  redirectToRegister() {
    this.navCtrl.navigateRoot('/register')
  }

}
