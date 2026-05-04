import { Injectable } from '@angular/core';
import { fromEvent, map, merge, Observable, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionStatusService {
  isOnline$: Observable<boolean> = merge(
    fromEvent(window, 'online'),
    fromEvent(window, 'offline')
  ).pipe(
    map(() => navigator.onLine),
    startWith(navigator.onLine)
  )
}