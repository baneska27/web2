import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Porudzbina } from 'src/app/entities/porudzbina';
import { DostavaService } from 'src/app/services/dostava.service';
import { PorudzbinaService } from 'src/app/services/porudzbina.service';

@Component({
  selector: 'app-nove-porudzbine',
  templateUrl: './nove-porudzbine.component.html',
  styleUrls: ['./nove-porudzbine.component.css']
})
export class NovePorudzbineComponent implements OnInit {
  porudzbinas : Porudzbina[] = []
  constructor(private dostavaService : DostavaService,private router : Router,private porudzbinaService : PorudzbinaService,private toastr : ToastrService) { }
  zauzet= true;
  timer$!: number;
  ngOnInit(): void {

    

        this.dostavaService.proveriZauzetost().subscribe({next : (zauzet : boolean)=>{
          this.zauzet=zauzet;
        }})

        if(this.zauzet==true)
        {
          this.porudzbinaService.dobaviPorudzbineDostavljac().subscribe({next : (data:Porudzbina[]) =>{

            this.porudzbinas = data;
            
           
          },
        error : ()=>{
          this.toastr.error("Niste u ulozi dostavljaca.","Error");
          this.zauzet=true;
        }
      })
        }

  }

  probaClick()
  {
  
  }


  preuzmiDostavu(porudzbina : Porudzbina,stanje : number)
  {
    console.log("Usao u f-ju");
    porudzbina.stanje=stanje;
    this.porudzbinaService.preuzmiDostavu(porudzbina).subscribe({
      next : () =>  {
        this.toastr.success("Uspesno te preuzeli dostavu","Success");
        this.dostavaService.startTimer();
        this.router.navigate(["home/trenutnaPorudzbina"]);
        
        console.log("Izvrsio fju");
      }
    })

  }

}
