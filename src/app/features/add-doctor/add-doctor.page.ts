import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.page.html',
  styleUrls: ['./add-doctor.page.scss'],
})
export class AddDoctorPage {
  doctorForm = this.fb.group({
    name: ['', Validators.required],
    specialty: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    photo: ['']
  });

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

  constructor(private fb: FormBuilder) {}

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

  onSubmit() {
    if (this.doctorForm.valid) {
      console.log('👨‍⚕️ Doctor registrado:', this.doctorForm.value);
      // TODO: enviar al backend
    }
  }
}
