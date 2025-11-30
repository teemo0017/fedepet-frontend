import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { Register } from 'src/app/core/models/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  userForm!: FormGroup;
  constructor(private fb: NonNullableFormBuilder, private navCtrl: NavController, private authService: AuthService) { }
  loadingService = false;
  ngOnInit() {

    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: [false, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loadingService) {
      return;
    }
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    this.loadingService = true;

    const user: Register = {
      name: this.f['name'].value,
      email: this.f['email'].value,
      phone: this.f['phone'].value,
      password: this.f['password'].value,
      role: 'user'
    }

    this.authService.register(user).pipe(finalize( () => {
      this.loadingService = false;
    }))
      .subscribe({
        next: async (resp) => {
          this.navCtrl.navigateRoot('/user/dashboard')
        },
        error: (err) => {
        },
        complete: () => {

        }
      });
  }


  get f() {
    return this.userForm.controls;
  }
  goToBack() {
    this.navCtrl.navigateRoot('/login')
  }

}
