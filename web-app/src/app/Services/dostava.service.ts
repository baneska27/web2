import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, map, Observable, ReplaySubject, share, Subject, Subscription, take, timer } from 'rxjs';
import { Porudzbina } from '../entities/porudzbina';

@Injectable({
  providedIn: 'root'
})
export class DostavaService {
  time = 30;

  timer$!: Observable<number>;
  timerSub!: Subscription;

  porudzbinaPostoji : Subject<Porudzbina> =  new ReplaySubject<Porudzbina>();
  porudzbinaPostojiBoolean :Subject<boolean>= new BehaviorSubject<boolean>(false);
  
  constructor(private http : HttpClient) { }


  dobaviMojuPorudzbinu()
  {
    
    return this.http.get<Porudzbina>("https://localhost:44332/dobaviMoju");
  }

  proveriZauzetost()
  {
    return this.http.get<boolean>("https://localhost:44332/zauzetDostavljac");
  }

 
  startTimer() {
   // this.timerSub && this.timerSub.unsubscribe();
    this.timer$ = timer(0, 1000).pipe(
      map(i => {
        console.log(this.time - i);
        return this.time - i;
      }),
      take(this.time + 1),
      finalize(() => console.log("DONE")),
      share()
    );
    this.timerSub = this.timer$.subscribe();
  }

 
  
}
