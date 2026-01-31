import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.page.html',
    styleUrls: ['./add-product.page.scss'],
    standalone: false
})
export class AddProductPage {
  productForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', [Validators.required, Validators.min(0.1)]],
    stock: ['', [Validators.required, Validators.min(1)]],
    photo: ['']
  });

  previewImage: string | null = null;

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
    this.productForm.patchValue({ photo: this.previewImage });
  }

  onSubmit() {
    if (this.productForm.valid) {
      console.log('🛒 Producto:', this.productForm.value);
      // TODO: enviar al backend
    }
  }
}
