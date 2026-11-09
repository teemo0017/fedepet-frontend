import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, IonicModule } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { ToastService } from 'src/app/features/services/toast.service';
import { Register } from 'src/app/core/models/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [IonicModule, FormsModule, ReactiveFormsModule]
})

export class RegisterPage implements OnInit {
  userForm!: FormGroup;
  private slug = '';
  constructor(
    private fb: NonNullableFormBuilder,
    private navCtrl: NavController,
    private authService: AuthService,
    private toastService: ToastService,
    private route: ActivatedRoute
  ) { }
  loadingService = false;
  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('slug') ?? '';

    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: [false, [Validators.required]],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.loadingService) return;

    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.loadingService = true;

    try {
      const user: Register = {
        name: this.f['name'].value,
        email: this.f['email'].value,
        phone: this.f['phone'].value,
        password: this.f['password'].value
      };

      await firstValueFrom(
        this.authService.register(this.slug, user)
      );

      this.navCtrl.navigateRoot('/user/dashboard');
    } catch (err: any) {
      console.error('Error al registrar usuario:', err);
      await this.toastService.error(err?.error?.body ?? 'No se pudo completar el registro');
    } finally {
      this.loadingService = false;
    }
  }


  get f() {
    return this.userForm.controls;
  }
  goToBack() {
    this.navCtrl.navigateRoot(`/${this.slug}/login`)
  }

}
