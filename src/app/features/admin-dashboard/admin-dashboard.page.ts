import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss']
})
export class AdminDashboardPage {
  userName = 'Arodi'; // puedes traerlo del AuthService
  totalDoctors = 12;
  totalProducts = 8;

  constructor(private router: Router) {}

  goTo(route: string) {
    this.router.navigateByUrl(`/${route}`);
  }
}
