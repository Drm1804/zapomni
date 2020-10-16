import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WindowComponent } from '../window/window.component';
import { Events, ModalData } from './interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { getEvents } from '../endpoints';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SliderService {
  private sliders = new BehaviorSubject<Events[]>([]);

  constructor(public http: HttpClient) {}

  /**
   * Fetches sliders from
   * @param date date
   */
  fetchSliders(date: string) {
    return this.http
      .get<Events[]>(getEvents(date))
      .pipe(tap((d) => this.sliders.next(d)));
  }

  /**
   * Return sliders as observable
   */
  getSliders() {
    return this.sliders.asObservable();
  }
}
