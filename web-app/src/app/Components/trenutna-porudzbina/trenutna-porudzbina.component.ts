import { Component, OnInit } from '@angular/core';
import { interval, take, timer } from 'rxjs';
@Component({
  selector: 'app-trenutna-porudzbina',
  templateUrl: './trenutna-porudzbina.component.html',
  styleUrls: ['./trenutna-porudzbina.component.css']
})
export class TrenutnaPorudzbinaComponent implements OnInit {
  
  
  constructor() { }

  ngOnInit(): void {
    const timerInterval$ = interval(1000); //1s
    const timer$ = timer(30000); //30s
    const times = 30;
    const countDown$ = timerInterval$.pipe(take(times));

    const sub = countDown$.subscribe(val =>console.log(times - val));
    const sub1 = timer$.subscribe(val => {
      console.log("Gotovo")

    });
    
  }


  

  

}
