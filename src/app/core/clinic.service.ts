import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from './models/api-response';
import { Clinic, CreateClinicRequest } from './models/clinic';

/** Gestión de clínicas — uso exclusivo de SUPER_ADMIN. */
@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  private apiUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  createClinic(request: CreateClinicRequest): Observable<Clinic> {
    return this.http.post<ApiResponse<Clinic>>(`${this.apiUrl}/api/clinic/create`, request).pipe(
      map(resp => resp.body)
    );
  }

  getAllClinics(): Observable<Clinic[]> {
    return this.http.get<ApiResponse<Clinic[]>>(`${this.apiUrl}/api/clinic/all`).pipe(
      map(resp => resp.body)
    );
  }
}
