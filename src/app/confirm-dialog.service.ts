import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ConfirmOptions {
  title: string;
  message: string;
  hightlight: string;
  confirmText: string;
  cancelText: string;
}

@Injectable({ providedIn: 'root' })
export class ConfirmDialogService {
  private confirmRequest$ = new BehaviorSubject<ConfirmOptions | null>(null);
  private response$ = new BehaviorSubject<boolean | null>(null);

  get confirm$(): Observable<ConfirmOptions | null> {
    return this.confirmRequest$.asObservable();
  }

  request(options: ConfirmOptions): Promise<boolean> {
    this.confirmRequest$.next(options);

    return new Promise(resolve => {
      const sub = this.response$.subscribe(value => {
        if (value !== null) {
          resolve(value);
          this.response$.next(null);
          sub.unsubscribe();
        }
      });
    });
  }

  respond(result: boolean) {
    this.response$.next(result);
    this.confirmRequest$.next(null);
  }
}
