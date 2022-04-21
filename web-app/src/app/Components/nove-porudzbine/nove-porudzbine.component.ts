import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Porudzbina } from 'src/app/entities/porudzbina';
import { PorudzbinaService } from 'src/app/services/porudzbina.service';

@Component({
  selector: 'app-nove-porudzbine',
  templateUrl: './nove-porudzbine.component.html',
  styleUrls: ['./nove-porudzbine.component.css']
})
export class NovePorudzbineComponent implements OnInit {
  porudzbinas : Porudzbina[] = []
  constructor(private porudzbinaService : PorudzbinaService,private toastr : ToastrService) { }

  ngOnInit(): void {
      this.porudzbinaService.dobaviPorudzbineDostavljac().subscribe({next : (data:any) =>{

        this.porudzbinas = data;
      },
    error : ()=>{
      this.toastr.error("Niste u ulozi dostavljaca.","Error");

    }})
  }

}
