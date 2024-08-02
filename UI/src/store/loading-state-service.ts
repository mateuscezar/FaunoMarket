import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingStateService {
  private loading$ = new BehaviorSubject<boolean>(false);

  show() {
    this.loading$.next(true);
  }

  hide() {
    this.loading$.next(false);
  }

  get() {
    return this.loading$.pipe();
  }
}