import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DecodedUser, Login, Register, ResponseAuth } from './models/auth';
import { Observable, switchMap, tap } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { jwtDecode } from "jwt-decode";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = environment.apiBaseUrl + "/auth"; //LOCALHOST
  //private apiUrl: string = "https://fedepet.cloud/auth";
  constructor(private http: HttpClient) { }

  register(data: Register): Observable<void> {
    return this.http.post<ResponseAuth>(`${this.apiUrl}/register`, data).pipe(
      switchMap(
        async (resp) => {
          await Preferences.set({
            key: 'token',
            value: resp.token
          });
          await this.setInfoUser(resp.token);
        }
      )
    );
  }

  login(data: Login): Observable<void> {
    return this.http.post<ResponseAuth>(`${this.apiUrl}/login`, data).pipe(
      switchMap(
        async (resp: ResponseAuth) => {
          await Preferences.set({
            key: 'token',
            value: resp.token
          });
          await this.setInfoUser(resp.token);
        }
      )
    );

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

  async setInfoUser(token: string): Promise<void> {
    const decoded = jwtDecode<DecodedUser>(token);
    await Preferences.set({
      key: 'user',
      value: JSON.stringify(decoded)
    });
  }
}
