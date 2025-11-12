import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { from, Observable, switchMap, tap } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { Doctor, GenericResponseSave, petsResponseByUser, requestId, saveDateRequest, savePetRequest } from './models/users';
import { AuthService } from 'src/app/core/auth.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = environment.apiBaseUrl;  //LOCALHOST

  constructor(private http: HttpClient, private authService: AuthService) { }

  getPets(data: requestId): Observable<petsResponseByUser[]> {
    return from(this.authService.getToken()).pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}` // 👈 lo envías así
        });
        return this.http.post<petsResponseByUser[]>(
          `${this.apiUrl}/api/pets/findbyuser`,
          data,
          { headers }
        );
      })
    );
  }


  getDocts(): Observable<Doctor[]> {
    return from(this.authService.getToken()).pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}` // 👈 lo envías así
        });
        return this.http.post<Doctor[]>(
          `${this.apiUrl}/api/doctors/findall`, null,
          { headers }
        );
      })
    );
  }

  savePet(request: savePetRequest): Observable<void> {
    return from(this.authService.getToken()).pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}` // 👈 lo envías así
        });
        return this.http.post<void>(
          `${this.apiUrl}/api/pets/create`, request,
          { headers }
        );
      })
    );
  }

  saveDate(request: saveDateRequest): Observable<GenericResponseSave> {
    return from(this.authService.getToken()).pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}` // 👈 lo envías así
        });
        return this.http.post<GenericResponseSave>(
          `${this.apiUrl}/api/dates/create`, request,
          { headers }
        );
      })
    );
  }
  /*
    getDoctors(data: Login): Observable<ResponseAuth> {
      return this.http.post<ResponseAuth>(`${this.apiUrl}/login`, data).pipe(
        tap(
          async (resp) => {
            await Preferences.set({
              key: 'token',
              value: resp.token
            });
          }
        )
      );

    }

    async getToken(): Promise<string> {
      const { value } = await Preferences.get({ key: 'token' });
      return value ?? '';
    } */
}
