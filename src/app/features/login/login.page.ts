
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

declare const google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  isMobile: boolean = false;
  constructor(private platform: Platform) { }

  ngOnInit() {
    this.isMobile = this.platform.is('hybrid');
    if (!this.isMobile) {
    }
  }
  handleCredentialResponse(response: any) {
    console.log('ID Token de Google:', response.credential);
    alert('Login exitoso con Google!\nID Token: ' + response.credential);
  }
  goToLogin() {
    google.accounts.id.initialize({
      client_id: '853612658006-5peaibimi2seaelrjfph80m0cqj0ai72.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response),
    });
    google.accounts.id.prompt();
  }
}
