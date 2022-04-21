import { Component, OnInit } from '@angular/core';
import { Porudzbina } from 'src/app/entities/porudzbina';
import { Proizvod } from 'src/app/entities/proizvod';
import { PorudzbinaService } from 'src/app/services/porudzbina.service';

@Component({
  selector: 'app-sve-porudzbine',
  templateUrl: './sve-porudzbine.component.html',
  styleUrls: ['./sve-porudzbine.component.css']
})
export class SvePorudzbineComponent implements OnInit {
  porudzbinas : Porudzbina[] = [];
  constructor(private porudzbinaService : PorudzbinaService) { }
  
  ngOnInit(): void {
    this.porudzbinaService.dobaviPorudzbine().subscribe({next: (data : Porudzbina[])  =>{
      this.porudzbinas = data;
      console.log(data)
    }})
      
  }


  




}
