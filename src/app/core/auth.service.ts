import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClinicPublicInfo, DecodedUser, Login, Register, ResponseAuth } from './models/auth';
import { ApiResponse } from './models/api-response';
import { Observable, firstValueFrom, map, switchMap } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { jwtDecode } from "jwt-decode";
import { environment } from 'src/environments/environment';

const SLUG_KEY = 'clinicSlug';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  register(slug: string, data: Register): Observable<void> {
    return this.http.post<ApiResponse<ResponseAuth>>(`${this.apiUrl}/${slug}/auth/register`, data).pipe(
      switchMap(
        async (resp) => {
          await this.setSlug(slug);
          await Preferences.set({
            key: 'token',
            value: resp.body.token
          });
          await this.setInfoUser(resp.body.token);
        }
      )
    );
  }

  login(slug: string, data: Login): Observable<void> {
    return this.http.post<ApiResponse<ResponseAuth>>(`${this.apiUrl}/${slug}/auth/login`, data).pipe(
      switchMap(
        async (resp) => {
          await this.setSlug(slug);
          await Preferences.set({
            key: 'token',
            value: resp.body.token
          });
          await this.setInfoUser(resp.body.token);
        }
      )
    );
  }

  loginSuperAdmin(data: Login): Observable<void> {
    return this.http.post<ApiResponse<ResponseAuth>>(`${this.apiUrl}/super-admin/auth/login`, data).pipe(
      switchMap(
        async (resp) => {
          await Preferences.set({
            key: 'token',
            value: resp.body.token
          });
          await this.setInfoUser(resp.body.token);
        }
      )
    );
  }

  getPublicInfo(slug: string): Observable<ClinicPublicInfo> {
    return this.http.get<ApiResponse<ClinicPublicInfo>>(`${this.apiUrl}/${slug}/public/info`).pipe(
      map(resp => resp.body)
    );
  }

  async getSlug(): Promise<string> {
    const { value } = await Preferences.get({ key: SLUG_KEY });
    return value ?? '';
  }

  async setSlug(slug: string): Promise<void> {
    await Preferences.set({ key: SLUG_KEY, value: slug });
  }

  async getToken(): Promise<string> {
    const { value } = await Preferences.get({ key: 'token' });
    return value ?? '';
  }

  async getUserInfo(): Promise<DecodedUser> {
    const { value } = await Preferences.get({ key: 'user' });
    if (!value) {
      return {} as DecodedUser;
    }
    try {
      const user: DecodedUser = await JSON.parse(value);
      return user;
    } catch (e) {
      console.log("Error al obtener informacion del usuario");
      return {} as DecodedUser;
    }

  }

  async loginWithGoogle(slug: string, idToken: string): Promise<void> {
    const resp = await firstValueFrom(
      this.http.post<ApiResponse<ResponseAuth>>(`${this.apiUrl}/${slug}/auth/google`, { idToken })
    );
    await this.setSlug(slug);
    await Preferences.set({ key: 'token', value: resp.body.token });
    await this.setInfoUser(resp.body.token);
  }

  async logout(): Promise<void> {
    await Preferences.remove({ key: 'token' });
    await Preferences.remove({ key: 'user' });
  }

  async setInfoUser(token: string): Promise<void> {
    const decoded = jwtDecode<DecodedUser>(token);
    await Preferences.set({
      key: 'user',
      value: JSON.stringify(decoded)
    });
  }
}
