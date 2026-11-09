import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { from, Observable, map, switchMap, tap } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { DateResponseDoctor, DatesResponse, Doctor, GenericResponseSave, petsResponseByUser, requestId, saveDateRequest, saveDoctorRequest, savePetRequest, updateDateState } from './models/users';
import { ApiResponse } from 'src/app/core/models/api-response';
import { AuthService } from 'src/app/core/auth.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = environment.apiBaseUrl;  //LOCALHOST

  constructor(private http: HttpClient, private authService: AuthService) { }

  getPets(data: requestId): Observable<petsResponseByUser[]> {
    return this.http.post<ApiResponse<petsResponseByUser[]>>(
      `${this.apiUrl}/api/pets/findbyuser`,
      data
    ).pipe(map(resp => resp.body));
  }


  getDocts(): Observable<Doctor[]> {
    return this.http.post<ApiResponse<Doctor[]>>(
      `${this.apiUrl}/api/doctors/findall`, null
    ).pipe(map(resp => resp.body));
  }

  createDoctor(request: saveDoctorRequest): Observable<void> {
    return this.http.post<ApiResponse<void>>(
      `${this.apiUrl}/api/doctors/create`, request
    ).pipe(map(resp => resp.body));
  }

  savePet(request: savePetRequest): Observable<void> {
    return this.http.post<ApiResponse<void>>(
      `${this.apiUrl}/api/pets/create`, request
    ).pipe(map(resp => resp.body));
  }

  saveDate(request: saveDateRequest): Observable<GenericResponseSave> {
    return this.http.post<ApiResponse<GenericResponseSave>>(
      `${this.apiUrl}/api/dates/create`, request,
    ).pipe(map(resp => resp.body));
  }

  getDatesByUser(request: requestId): Observable<DatesResponse[]> {
    return this.http.post<ApiResponse<DatesResponse[]>>(
      `${this.apiUrl}/api/dates/findbyclient`, request
    ).pipe(map(resp => resp.body));
  }

  getDatesByDoctor(request: requestId): Observable<DateResponseDoctor> {
    return this.http.post<ApiResponse<DateResponseDoctor>>(
      `${this.apiUrl}/api/dates/findbydoctor`, request
    ).pipe(map(resp => resp.body));
  }

  updateDate(request: updateDateState): Observable<GenericResponseSave> {
    return this.http.post<ApiResponse<GenericResponseSave>>(
      `${this.apiUrl}/api/dates/update`, request
    ).pipe(map(resp => resp.body));
  }
}
