import { Injectable } from '@angular/core';
import { interval } from 'rxjs/internal/observable/interval';
import { timer } from 'rxjs/internal/observable/timer';
import { map } from 'rxjs/internal/operators/map';
import { shareReplay } from 'rxjs/internal/operators/shareReplay';
import { take } from 'rxjs/internal/operators/take';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
 
  constructor() { }

private odbrojavanje()
{
  this.timeLeft$ = interval(1000).pipe(
    map(x => calcDateDiff()),
    shareReplay(1)
}

  
}
