import { Component, OnInit } from '@angular/core';
import { Porudzbina } from 'src/app/entities/porudzbina';
import { PorudzbinaService } from 'src/app/services/porudzbina.service';

@Component({
  selector: 'app-moje',
  templateUrl: './moje.component.html',
  styleUrls: ['./moje.component.css']
})
export class MojeComponent implements OnInit {

  porudzbinas : Porudzbina[] = []

  constructor(private poruzbinaService : PorudzbinaService) { }

  ngOnInit(): void {

    this.poruzbinaService.dobaviMoje().subscribe(data => this.porudzbinas = data);
  }

}
