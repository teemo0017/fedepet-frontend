import { Component } from '@angular/core';
import { Doctor, petsResponseByUser, requestId, saveDateRequest } from '../../services/models/users';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../../core/auth.service';
import { DecodedUser } from 'src/app/core/models/auth';
import { NavController, IonicModule } from '@ionic/angular';
import { ToastService } from '../../services/toast.service';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { SkeletonComponent } from '../../../shared/components/skeleton/skeleton.component';

@Component({
    selector: 'app-appointment',
    templateUrl: './appointment.page.html',
    styleUrls: ['./appointment.page.scss'],
    imports: [IonicModule, FormsModule, SkeletonComponent]
})
export class AppointmentPage {
  public fistCall = true;
  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();
    return utcDay !== 0;
  };
  appointmentTypes: string[] = [
    'Consulta General',
    'Vacunación',
    'Desparasitación',
    'Control de Crecimiento',
    'Consulta de Urgencia',
    'Chequeo Preventivo',
    'Cirugía Programada',
    'Control Post-Operatorio',
    'Corte de Uñas',
    'Limpieza Dental',
    'Baño Médico',
    'Revisión de Piel',
    'Consulta de Enfermedades Crónicas',
    'Problemas Gastrointestinales',
    'Problemas Respiratorios',
    'Problemas Oculares',
    'Problemas Dermatológicos',
    'Consulta de Reproducción',
    'Control de Embarazo',
    'Ecografía',
    'Rayos X',
    'Vacunación Antirrábica',
    'Consulta de Comportamiento',
    'Nutrición y Dietética',
    'Certificado de Salud',
    'Control Geriátrico',
    'Esterilización / Castración',
    'Consulta de Animales Exóticos',
    'Aplicación de Tratamientos',
    'Revisión por Heridas o Traumas'
  ];
  public infoUser: DecodedUser = {} as DecodedUser
  public doctorList: Doctor[] = [];
  public petList: petsResponseByUser[] = []
  reason: string = '';
  selectedPet: number = 0;
  selectAppointmentType = '';
  selectedDoctor: number = 0;
  maxDate = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString();
  minDate = new Date().toISOString();
  selectedTime: string = new Date(new Date().setDate(new Date().getDay() + 1)).toISOString();;
  initDate = this.selectedTime;
  saveDateLoading = false;
  initLoading = false;
  constructor(private toastService: ToastService, private userService: UserService, private authService: AuthService, private navCtrl: NavController) { }
  async ngOnInit() {
    this.infoUser = await this.authService.getUserInfo();
  }
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async ionViewDidEnter() {
    this.resetValues();
    this.initLoading = true;
    await this.delay(2000);
    if (this.fistCall) {
      this.callServiceDocts();
      this.fistCall = false;
    }
    this.callServicePet();
  }

  public async callServicePet(): Promise<void> {
    try {
      const request: requestId = {
        id: this.infoUser.id
      };

      this.petList = await firstValueFrom(
        this.userService.getPets(request)
      );
    } catch (err) {
      console.error('Error al obtener las mascotas:', err);
      this.petList = [];
    } finally {
      this.initLoading = false;
    }
  }

  public async callServiceDocts(): Promise<void> {
    this.initLoading = true;
    
    try {
      this.doctorList = await firstValueFrom(
        this.userService.getDocts()
      );
    } catch (err) {
      console.error('Error al obtener los doctores:', err);
      this.doctorList = [];
    } finally {
      this.initLoading = false;
    }
  }

  async submit(): Promise<void> {
    this.saveDateLoading = true;
    
    try {
      const request: saveDateRequest = {
        motive: this.reason,
        type: this.selectAppointmentType,
        pet: this.selectedPet,
        client: this.infoUser.id,
        doctor: this.selectedDoctor,
        dateTime: new Date(this.selectedTime).toISOString()
      };

      await firstValueFrom(
        this.userService.saveDate(request)
      );

      await this.createToastSuccess();
      this.navCtrl.navigateForward('/user/dashboard');
    } catch (err) {
      console.error('Error al guardar la cita:', err);
    } finally {
      this.saveDateLoading = false;
    }
  }
  resetValues() {
    this.selectedTime = this.initDate;
    this.selectedDoctor = 0;
    this.selectedPet = 0;
    this.reason = ''
  }
  async createToastSuccess() {
    await this.toastService.success('¡Cita Agendada con exito!');
  }
}


