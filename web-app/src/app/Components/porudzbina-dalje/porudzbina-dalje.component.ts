import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Porudzbina } from 'src/app/entities/porudzbina';
import { Proizvod } from 'src/app/entities/proizvod';
import { ProizvodPorudzbina } from 'src/app/entities/proizvod-porudzbina';
import { User } from 'src/app/entities/user';
import { LoginService } from 'src/app/services/login.service';
import { PorudzbinaService } from 'src/app/services/porudzbina.service';
import { ProizvodService } from 'src/app/services/proizvod.service';

@Component({
  selector: 'app-porudzbina-dalje',
  templateUrl: './porudzbina-dalje.component.html',
  styleUrls: ['./porudzbina-dalje.component.css']
})
export class PorudzbinaDaljeComponent implements OnInit {
  porudzbina! : Porudzbina;
  cena=0;
  kolicina=1;
  user! : User

  porudzbinaForm = new FormGroup({

    adresa : new FormControl('',[Validators.required]),
    komentar : new FormControl('Nemam Komentar',[Validators.required])
  })
  
  selectChangeHandler (event: any,proizvod : Proizvod) {
  
  }




  constructor(private router : Router,private toastr : ToastrService,private proizvodService : ProizvodService,public porudzbinaService : PorudzbinaService, private loginService : LoginService) { }

  ngOnInit(): void {
    //this.proizvodService.proizvodsKorpa.subscribe(data => this.proizvods = data);  
    this.loginService.userProfile.subscribe({next : (data : User) =>{
      this.user = data;
      console.log(data);
    }});
    
    this.porudzbinaService.porudzbina.subscribe(data => this.porudzbina =data);    
    this.porudzbinaService.cena.subscribe(data =>this.cena = data );
  }

  incrementProizvod(proizvodID : number) {
    let indx = this.porudzbina.proizvods.findIndex(id => id.id == proizvodID);
    this.porudzbina.proizvods[indx].kolicina+=1;
    this.porudzbinaService.updatePorudzbina(this.porudzbina);
    console.log(this.porudzbina);
  }
  decrementProizvod(proizvodID : number) {
  
    let indx = this.porudzbina.proizvods.findIndex(id => id.id == proizvodID);
    if(this.porudzbina.proizvods[indx].kolicina-1 != 0 )
    {
       
      this.porudzbina.proizvods[indx].kolicina-=1;
      this.porudzbinaService.updatePorudzbina(this.porudzbina);
      console.log(this.porudzbina);
    }
    else{
      this.toastr.info("Smanjili ste kolicinu " + this.porudzbina.proizvods[indx].ime + " proizvoda na 0. Obrisali smo ga za Vas." ,"Not so hungry",{timeOut:5000});
      this.obrisiIzKorpe(proizvodID);
    }
   
  }

 
  obrisiIzKorpe(id : number)
  {
   
    const objIndex = this.porudzbina.proizvods.findIndex(item => item.id === id);
    if(objIndex>-1)
    {
      let name = this.porudzbina.proizvods[objIndex].ime;
      this.porudzbina.proizvods.splice(objIndex,1);
      this.porudzbinaService.updatePorudzbina(this.porudzbina);
      this.toastr.success("Uspesno obrisan " +name + " artikal iz korpe.","Removed",{timeOut:5000})
      
      
    }
  }
  
  posaljiPoruzbinu()
  {
    this.porudzbina.idKorisnika = this.user.email;
    this.porudzbina.adresa = this.porudzbinaForm.get('adresa')?.value;
    this.porudzbina.komentar = this.porudzbinaForm.get('komentar')?.value;
    this.porudzbinaService.porudzbina.next(this.porudzbina);
    this.porudzbinaService.postPoruzbina(this.porudzbina).subscribe({
      next: () => {
        this.toastr.success("Uspesno ste porucili proizvode.","Success");
        window.location.reload();
      },
      error:() =>
      {
        this.toastr.error("Greska pri slanju porudzbine","Error");
      }
    })
  }





 

}
