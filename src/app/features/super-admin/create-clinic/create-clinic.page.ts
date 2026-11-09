import { Component } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavController, IonicModule } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { ClinicService } from 'src/app/core/clinic.service';
import { CreateClinicRequest } from 'src/app/core/models/clinic';
import { ToastService } from 'src/app/features/services/toast.service';

const DIACRITICS_RANGE = new RegExp('[\\u0300-\\u036f]', 'g');

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .normalize('NFD').replace(DIACRITICS_RANGE, '') // quita acentos
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

@Component({
  selector: 'app-create-clinic',
  templateUrl: './create-clinic.page.html',
  styleUrls: ['./create-clinic.page.scss'],
  imports: [IonicModule, FormsModule, ReactiveFormsModule]
})
export class CreateClinicPage {
  loadingService = false;
  private slugEditedManually = false;

  form = this.fb.group({
    clinicName: ['', Validators.required],
    clinicSlug: ['', Validators.required],
    clinicAddress: ['', Validators.required],
    clinicPhone: ['', Validators.required],
    clinicEmail: ['', [Validators.required, Validators.email]],
    primaryColor: ['#ffa420', Validators.required],
    adminName: ['', Validators.required],
    adminEmail: ['', [Validators.required, Validators.email]],
    adminPassword: ['', [Validators.required, Validators.minLength(6)]],
    adminPhone: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private clinicService: ClinicService,
    private toastService: ToastService
  ) {
    this.form.controls.clinicName.valueChanges.subscribe(name => {
      if (this.slugEditedManually) return;
      this.form.controls.clinicSlug.setValue(slugify(name ?? ''), { emitEvent: false });
    });

    this.form.controls.clinicSlug.valueChanges.subscribe(() => {
      // Cualquier tecleo directo en el slug detiene el auto-completado desde el nombre.
      this.slugEditedManually = true;
    });
  }

  get f() {
    return this.form.controls;
  }

  async onSubmit(): Promise<void> {
    if (this.loadingService) return;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loadingService = true;

    try {
      const request: CreateClinicRequest = {
        clinicSlug: slugify(this.form.value.clinicSlug ?? ''),
        clinicName: this.form.value.clinicName ?? '',
        clinicAddress: this.form.value.clinicAddress ?? '',
        clinicPhone: this.form.value.clinicPhone ?? '',
        clinicEmail: this.form.value.clinicEmail ?? '',
        primaryColor: this.form.value.primaryColor ?? '#ffa420',
        adminName: this.form.value.adminName ?? '',
        adminEmail: this.form.value.adminEmail ?? '',
        adminPassword: this.form.value.adminPassword ?? '',
        adminPhone: this.form.value.adminPhone ?? '',
      };

      await firstValueFrom(this.clinicService.createClinic(request));

      await this.toastService.success('Clínica creada correctamente');
      this.navCtrl.navigateRoot('/super-admin/clinics');
    } catch (err: any) {
      console.error('Error al crear la clínica:', err);
      await this.toastService.error(err?.error?.body ?? 'No se pudo crear la clínica');
    } finally {
      this.loadingService = false;
    }
  }
}
