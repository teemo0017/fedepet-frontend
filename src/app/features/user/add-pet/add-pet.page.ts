import { Component } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AuthService } from 'src/app/core/auth.service';
import { UserService } from '../../services/user.service';
import { NavController, IonicModule } from '@ionic/angular';
import { savePetRequest } from '../../services/models/users';
import { DecodedUser } from 'src/app/core/models/auth';
import { firstValueFrom } from 'rxjs';
import { ToastService } from '../../services/toast.service';

@Component({
    selector: 'app-add-pet',
    templateUrl: './add-pet.page.html',
    styleUrls: ['./add-pet.page.scss'],
    imports: [IonicModule, FormsModule, ReactiveFormsModule]
})
export class AddPetPage {
  loading = false;
  petForm = this.fb.group({
    name: ['', Validators.required],
    species: ['', Validators.required],
    breed: ['', Validators.required],
    dateBirth: ['', Validators.required],
    weight: ['', [Validators.required, Validators.min(0.1)]],
    photo: ['']
  });

  previewImage: string | null = null;
  public infoUser: DecodedUser = {} as DecodedUser
  // listas predefinidas
  speciesList = ['Perro', 'Gato', 'Ave', 'Conejo', 'Reptil'];
  breedsBySpecies: Record<string, string[]> = {
    Perro: ['Labrador Retriever', 'Bulldog', 'Golden Retriever', 'Beagle', 'Chihuahua', 'Pastor Alemán', 'Poodle'],
    Gato: ['Siames', 'Persa', 'Maine Coon', 'Bengala', 'Esfinge', 'Angora'],
    Ave: ['Canario', 'Perico', 'Cacatúa', 'Loro', 'Agapornis'],
    Conejo: ['Mini Lop', 'Rex', 'Holandés', 'Belier'],
    Reptil: ['Iguana', 'Gecko Leopardo', 'Camaleón', 'Serpiente del maíz']
  };
  filteredBreeds: string[] = [];

  constructor(private toastService: ToastService, private navCtrl: NavController, private fb: FormBuilder, private userService: UserService, private authService: AuthService) { }

  async ngOnInit(): Promise<void> {
    this.infoUser = await this.authService.getUserInfo();
    this.petForm.get('species')?.valueChanges.subscribe(specie => {
      this.filteredBreeds = specie ? this.breedsBySpecies[specie] || [] : [];
      this.petForm.get('breed')?.reset();
    });
  }

  async selectImage(): Promise<void> {
    const image = await Camera.getPhoto({
      quality: 80,
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt,
      width: 500,
      height: 500,
    });
    this.previewImage = `data:image/jpeg;base64,${image.base64String}`;
    this.petForm.patchValue({ photo: image.base64String });
  }

  public get f() {
    return this.petForm.controls;
  }

  public async onSubmit(): Promise<void> {
    if (this.loading) return;
    
    if (!this.petForm.valid) return;

    this.loading = true;

    try {
      const request: savePetRequest = {
        name: this.f.name.value ?? '',
        species: this.f.species.value ?? '',
        breed: this.f.breed.value ?? '',
        dateBirth: new Date(this.f.dateBirth.value ?? '').toISOString(),
        weight: Number(this.f.weight.value ?? 0),
        owner: this.infoUser.id,
        photo: this.f.photo.value ?? ''
      };

      await firstValueFrom(
        this.userService.savePet(request)
      );

      await this.createToastSuccess();
      this.navCtrl.navigateRoot('/user/dashboard');
    } catch (err) {
      console.error('Error al guardar la mascota:', err);
    } finally {
      this.loading = false;
    }
  }

  public ionViewWillEnter(): void {
    this.previewImage = null;
    this.petForm.reset();
  }
  public goBack(): void {
    this.navCtrl.back();
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async createToastSuccess() {
    await this.toastService.success('Mascota agregada con exito! , Refresca el dashboard para poder verlo ! ');
  }
}
