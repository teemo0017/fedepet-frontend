import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, IonicModule } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { DecodedUser } from 'src/app/core/models/auth';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';
import { petsResponseByUser, requestId, updatePetRequest } from '../../services/models/users';
import { SkeletonComponent } from '../../../shared/components/skeleton/skeleton.component';

@Component({
    selector: 'app-pet-detail',
    templateUrl: './pet-detail.page.html',
    styleUrls: ['./pet-detail.page.scss'],
    imports: [IonicModule, FormsModule, ReactiveFormsModule, SkeletonComponent]
})
export class PetDetailPage implements OnInit {
  loading = false;
  public pageLoading = signal(true);
  petId!: number;
  private statePet: petsResponseByUser | null = null;

  petForm = this.fb.group({
    name: ['', Validators.required],
    species: ['', Validators.required],
    breed: ['', Validators.required],
    dateBirth: ['', Validators.required],
    weight: ['', [Validators.required, Validators.min(0.1)]],
    photo: ['']
  });

  previewImage: string | null = null;
  public infoUser: DecodedUser = {} as DecodedUser;

  // listas predefinidas (mismas que en add-pet)
  speciesList = ['Perro', 'Gato', 'Ave', 'Conejo', 'Reptil'];
  breedsBySpecies: Record<string, string[]> = {
    Perro: ['Labrador Retriever', 'Bulldog', 'Golden Retriever', 'Beagle', 'Chihuahua', 'Pastor Alemán', 'Poodle'],
    Gato: ['Siames', 'Persa', 'Maine Coon', 'Bengala', 'Esfinge', 'Angora'],
    Ave: ['Canario', 'Perico', 'Cacatúa', 'Loro', 'Agapornis'],
    Conejo: ['Mini Lop', 'Rex', 'Holandés', 'Belier'],
    Reptil: ['Iguana', 'Gecko Leopardo', 'Camaleón', 'Serpiente del maíz']
  };
  filteredBreeds: string[] = [];

  constructor(
    private toastService: ToastService,
    private navCtrl: NavController,
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // La mascota llega por el estado de navegación desde pets.page.ts (evita un fetch extra).
    const nav = this.router.getCurrentNavigation();
    this.statePet = (nav?.extras?.state?.['pet'] as petsResponseByUser) ?? null;
  }

  async ngOnInit(): Promise<void> {
    this.petId = Number(this.route.snapshot.paramMap.get('id'));
    this.infoUser = await this.authService.getUserInfo();

    this.petForm.get('species')?.valueChanges.subscribe(specie => {
      this.filteredBreeds = specie ? this.breedsBySpecies[specie] || [] : [];
    });

    let pet = this.statePet;
    // Fallback: navegación directa por URL sin estado — buscamos la mascota del usuario por id.
    if (!pet) {
      pet = await this.loadPetById(this.petId);
    }

    if (pet) {
      this.patchForm(pet);
    } else {
      await this.toastService.error('No se encontró la mascota');
      this.navCtrl.navigateRoot('/user/pets');
      return;
    }

    this.pageLoading.set(false);
  }

  private async loadPetById(id: number): Promise<petsResponseByUser | null> {
    try {
      const request: requestId = { id: this.infoUser.id };
      const pets = await firstValueFrom(this.userService.getPets(request));
      return pets.find(p => p.id === id) ?? null;
    } catch (err) {
      console.error('Error al obtener la mascota:', err);
      return null;
    }
  }

  private patchForm(pet: petsResponseByUser): void {
    this.filteredBreeds = this.breedsBySpecies[pet.species] || [];
    this.petForm.patchValue({
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      dateBirth: pet.dateBirth,
      weight: pet.weight != null ? String(pet.weight) : '',
      photo: pet.photo ?? ''
    });
    this.previewImage = pet.photo
      ? (pet.photo.startsWith('data:') || pet.photo.startsWith('http') ? pet.photo : `data:image/jpeg;base64,${pet.photo}`)
      : null;
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
      const request: updatePetRequest = {
        name: this.f.name.value ?? '',
        species: this.f.species.value ?? '',
        breed: this.f.breed.value ?? '',
        dateBirth: new Date(this.f.dateBirth.value ?? '').toISOString(),
        weight: Number(this.f.weight.value ?? 0),
        photo: this.f.photo.value ?? ''
      };

      await firstValueFrom(
        this.userService.updatePet(this.petId, request)
      );

      await this.toastService.success('Mascota actualizada');
      this.navCtrl.navigateRoot('/user/pets');
    } catch (err) {
      console.error('Error al actualizar la mascota:', err);
      await this.toastService.error('No se pudo actualizar la mascota');
    } finally {
      this.loading = false;
    }
  }

  public goBack(): void {
    this.navCtrl.back();
  }
}
