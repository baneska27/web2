import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventEmitter } from '@angular/core';
import { Proizvod } from 'src/app/entities/proizvod';
import { ProizvodService } from 'src/app/services/proizvod.service';
import { PorudzbinaService } from 'src/app/services/porudzbina.service';
import { Porudzbina } from 'src/app/entities/porudzbina';
import { ProizvodPorudzbina } from 'src/app/entities/proizvod-porudzbina';
import { delay, timeout } from 'rxjs';
import { User } from 'src/app/entities/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-nova-porudzbina',
  templateUrl: './nova-porudzbina.component.html',
  styleUrls: ['./nova-porudzbina.component.css']
})
export class NovaPorudzbinaComponent implements OnInit {

  proizvods : Proizvod[] = [];
  user! : User;
  
  porudzbinaPostoji! : Porudzbina;
  proizvodiKorpa : ProizvodPorudzbina[] = [];
  poruzbina : Porudzbina = new Porudzbina(this.proizvodiKorpa);
  porudzbinaPostojiBoolean=false;

  constructor(private loginServ : LoginService, private proizvodService : ProizvodService,private router : Router, private toastr : ToastrService,private porudzbinaService : PorudzbinaService) { }

  ngOnInit(): void {
    
    this.loginServ.userProfile.subscribe({next : (data : User) =>{
      this.user = data;

      this.porudzbinaService.dobaviMojuPorudzbinu(data.email).subscribe({next : (data)=>{

        this.porudzbinaPostoji = data;
        this.porudzbinaPostojiBoolean=true;
      }})
    }})
    
    this.proizvodService.getAllProizvods().subscribe((data : Proizvod[]) =>
   {
    this.proizvods = data;
    this.toastr.info("Hej, imamo sjajne ponude. Sta kazes na " + this.proizvods[this.randomNumber(0,this.proizvods.length)].ime + "?","Welcome", {timeOut:7500,closeButton:true});
   }
  )}
 



  dodajProizvod(proizvod : Proizvod)
  {
    let dodaj : Boolean = new Boolean(true);
    for(let i=0;i<this.poruzbina.proizvods.length;i++)
    {
      if(this.poruzbina.proizvods[i].id == proizvod.id)
      {
        dodaj = false;
      }
    }
    if(dodaj)
    {
      
      let proPor = new ProizvodPorudzbina(proizvod.id,1,proizvod.ime,proizvod.cena,proizvod.sastojaks);
      this.poruzbina.proizvods.push(proPor);
      this.toastr.success("Uspesno ste dodali " + proizvod.ime + " u Vasu porudzbinu.","Updated Cart",{timeOut:4500,closeButton:true});
      this.porudzbinaService.updatePorudzbina(this.poruzbina);
    }
    else{
      this.toastr.warning('Vec imate ' + proizvod.ime + ' u korpi.',"Warning",{timeOut:5500,closeButton:true});
      
    }
   
   
    
  }

   randomNumber(min : number, max : number) {
    return Math.floor( Math.random() * (max - min) + min);
  }


  nastaviKupovinu()
  {
    
    if(this.poruzbina.proizvods.length===0)
    {
      this.poruzbina.cena=0;
      return false;
    }
    else
    {
      this.porudzbinaService.porudzbina.next(this.poruzbina); 
      
      return true;
    }
  }



}
