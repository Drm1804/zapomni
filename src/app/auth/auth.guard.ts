import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Form } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}
  canActivate() {
    return of(this.auth.getToken()).pipe(
      take(1),
      mergeMap((f: any) => {
        return Boolean(f) ? of(true) : this.router.navigate(['/auth']);
      })
    );
  }
}
