import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { Proizvod } from '../entities/proizvod';
import { ProizvodPorudzbina } from '../entities/proizvod-porudzbina';

@Injectable({
  providedIn: 'root'
})
export class ProizvodService {
  baseUrl = "https://localhost:44332/api/Proizvods";
  proizvodsKorpa : Subject<Proizvod[]> =  new ReplaySubject<Proizvod[]>();
  cena :Subject<number> = new ReplaySubject<number>(); // Cena Dostave
  constructor(private http : HttpClient) { }


  postProizvod(proizvod : Proizvod)
  {
     return this.http.post(this.baseUrl,proizvod);

  }
  getAllProizvods()
  {
    return this.http.get<Proizvod[]>(this.baseUrl);
  }
  getProizvod(id : number)
  {
    return this.http.get<Proizvod>(this.baseUrl+"/"+id.toString());
  }

  updateKorpa(proizvods : Proizvod[])
  {
    this.proizvodsKorpa.next(proizvods);
  }
  updateCena(cena : number)
  {
    this.cena.next(cena);
  }
  
}
