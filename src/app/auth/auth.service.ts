import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Events } from '../slider/interfaces';
import { getConfig } from '../endpoints';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Returns token as Observable
   */
  getToken() {
    return localStorage.getItem('x-auth-token');
  }

  /**
   * Fetch new token
   */
  fetchToken() {
    return this.http.get(getConfig(), { observe: 'response' }).pipe(
      tap((r) => {
        const tkn = r['headers'].get('x-auth-token');
        localStorage.setItem('x-auth-token', tkn);
      })
    );
  }
}
