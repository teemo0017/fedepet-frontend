import { Component } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { NavController, IonicModule } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';
import { saveDoctorRequest } from '../../services/models/users';

@Component({
    selector: 'app-add-doctor',
    templateUrl: './add-doctor.page.html',
    styleUrls: ['./add-doctor.page.scss'],
    imports: [IonicModule, FormsModule, ReactiveFormsModule]
})
export class AddDoctorPage {
  doctorForm = this.fb.group({
    name: ['', Validators.required],
    specialty: ['', Validators.required],
    description: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    photo: ['']
  });

  loadingService = false;
  previewImage: string | null = null;
  specialties = ['Medicina General',
  'Cirugía Veterinaria',
  'Dermatología Veterinaria',
  'Odontología Veterinaria',
  'Oftalmología Veterinaria',
  'Cardiología Veterinaria',
  'Oncología Veterinaria',
  'Neurología Veterinaria',
  'Anestesiología Veterinaria',
  'Ortopedia Veterinaria',
  'Nutrición Animal',
  'Reproducción y Obstetricia Animal',
  'Medicina Interna',
  'Medicina de Animales Exóticos',
  'Patología Veterinaria',
  'Radiología e Imagenología Veterinaria',
  'Emergencias y Cuidados Intensivos',
  'Etología (Comportamiento Animal)',
  'Zootecnia y Producción Animal',
  'Epidemiología y Salud Pública Veterinaria'];

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private userService: UserService,
    private toastService: ToastService
  ) {}

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 80,
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt,
      width: 500,
      height: 500,
    });
    this.previewImage = `data:image/jpeg;base64,${image.base64String}`;
    this.doctorForm.patchValue({ photo: this.previewImage });
  }

  async onSubmit() {
    if (this.loadingService) return;

    if (this.doctorForm.invalid) {
      this.doctorForm.markAllAsTouched();
      return;
    }

    this.loadingService = true;

    try {
      const request: saveDoctorRequest = {
        name: this.doctorForm.value.name ?? '',
        password: this.doctorForm.value.password ?? '',
        specialty: this.doctorForm.value.specialty ?? '',
        description: this.doctorForm.value.description ?? '',
        email: this.doctorForm.value.email ?? '',
        phone: this.doctorForm.value.phone ?? '',
        photo: this.doctorForm.value.photo ?? ''
      };

      await firstValueFrom(
        this.userService.createDoctor(request)
      );

      await this.toastService.success('Doctor registrado correctamente');
      this.navCtrl.navigateRoot('/admin/dashboard');
    } catch (err: any) {
      console.error('Error al registrar doctor:', err);
      await this.toastService.error(err?.error?.body ?? 'No se pudo registrar el doctor');
    } finally {
      this.loadingService = false;
    }
  }
}
