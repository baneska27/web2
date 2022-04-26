import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { Porudzbina } from 'src/app/entities/porudzbina';
import { User } from 'src/app/entities/user';
import { DostavaService } from 'src/app/services/dostava.service';
import { LoginService } from 'src/app/services/login.service';
import { PorudzbinaService } from 'src/app/services/porudzbina.service';

@Component({
  selector: 'app-dostava',
  templateUrl: './dostava.component.html',
  styleUrls: ['./dostava.component.css']
})
export class DostavaComponent implements OnInit {
user! : User;
porudzbinaPostoji! : Porudzbina;
porudzbinaPostojiBoolean =false;
timer$! : number
  constructor(private loginServ : LoginService,private dostavaService : DostavaService,private router : Router) { }

  ngOnInit(): void {
  
   
    this.dostavaService.dobaviMojuPorudzbinu().subscribe({next : (data)=>{

      this.dostavaService.porudzbinaPostojiBoolean.next(true);
      this.porudzbinaPostoji = data;
      this.porudzbinaPostojiBoolean=true;
      

    },
    error :() =>{
      this.dostavaService.porudzbinaPostojiBoolean.next(false);
     
    }
  })

 

    /* 
    this.dostavaService.proveriZauzetost().subscribe({next : (data : boolean)=>{

      console.log("Usao u proveru");
      this.dostavaService.porudzbinaPostojiBoolean.next(data)
     
       
      }

    });*/
    

   
    this.loginServ.userProfile.subscribe({next : (data : User) =>{
      this.user = data;


      


    }})

    this.dostavaService.timer$.subscribe( {next : (data : any) =>{
      this.timer$ = data
  
    }});
   

  }
 

}
