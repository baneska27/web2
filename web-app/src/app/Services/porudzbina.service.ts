import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, ReplaySubject, Subject, take, timer } from 'rxjs';
import { Porudzbina } from '../entities/porudzbina';
import { Proizvod } from '../entities/proizvod';
import { ProizvodPorudzbina } from '../entities/proizvod-porudzbina';
import { ProizvodService } from './proizvod.service';

@Injectable({
  providedIn: 'root'
})
export class PorudzbinaService {
  cena :Subject<number> = new ReplaySubject<number>(); // Cena Dostave
  porudzbina : Subject<Porudzbina> =  new ReplaySubject<Porudzbina>();

  baseUrl = "https://localhost:44332/api/Poruzbinas";


  constructor(private proizvodService : ProizvodService,private http : HttpClient) { }

  updatePorudzbina(porudzbina : Porudzbina){
    let cena = this.updateCena(porudzbina);
    this.cena.next(cena);
    console.log(cena);
    porudzbina.cena = cena;
    this.porudzbina.next(porudzbina);
    
   
  }

  preuzmiDostavu(porudzbina : Porudzbina){
    return this.http.put((this.baseUrl+"/"+porudzbina.idDostave),porudzbina);
  }

  updateCena(porudzbina : Porudzbina)
  {
    let cena=0;
    for(let i=0;i<porudzbina.proizvods.length;i++)
    {
      cena += porudzbina.proizvods[i].kolicina * porudzbina.proizvods[i].cena;
    }
    return cena;
  }

  postPoruzbina(porudzbina : Porudzbina)
  {
    return this.http.post(this.baseUrl,porudzbina);
  }

  pocniOdbrojavanje()
  {
    const timerInterval$ = interval(1000); //1s
    const timer$ = timer(30000); //30s
    const times = 30;
    const countDown$ = timerInterval$.pipe(take(times));

    const sub = countDown$.subscribe(val =>console.log(times - val));
    const sub1 = timer$.subscribe(val => {
      

    });
  }

  dobaviPorudzbine()
  {
    return this.http.get<Porudzbina[]>(this.baseUrl);
  }

  dobaviPorudzbineDostavljac()
  {
    return this.http.get<Porudzbina[]>('https://localhost:44332/zaDostavu');
  }

  dobaviMoje()
  {
    return this.http.get<Porudzbina[]>("https://localhost:44332/api/Poruzbinas/sveMoje");
  }

 

}
