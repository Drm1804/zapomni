import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  constructor(private auth: AuthService, private router: Router) {}
  login() {
    this.auth.fetchToken().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
