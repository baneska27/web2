import { Component, OnInit } from '@angular/core';
import { User, UserWithoutPass } from 'src/app/entities/user';
import { LoginService } from 'src/app/services/login.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-verifikacija',
  templateUrl: './verifikacija.component.html',
  styleUrls: ['./verifikacija.component.css']
})
export class VerifikacijaComponent implements OnInit {
  userInfo?: User;
  users : UserWithoutPass[] = [];
  constructor(private loginService : LoginService, private toastr : ToastrService) { }

  ngOnInit(): void {
    this.loginService.getAllUsers().subscribe((data : User[]) =>
    {
     this.users = data;

    

    });
    
    
  }

  checkUser()
  {
    if(this.userInfo?.type==='admin')
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  getAllUsers()
  {
    this.loginService.getAllUsers().subscribe((data : UserWithoutPass[]) =>
    {
     this.users = data;
     this.toastr.success('Uspesno ste se verifikovali korisnika','Success');
    

    });

  }

  VerificationRequest(user : UserWithoutPass,to : boolean)
  {
    
    let subscriber =this.loginService.requestVerification(user,to);
    
   
  
    subscriber.subscribe({
      next: () =>
      {
  
        
        

        
        this.toastr.success('Uspesno ste promenili status korsinika ' + user.username ,'Success');


  
      },
  
      error: () =>
      {
                this.toastr.error('Greska pri promeni statusa korisnika ' + user.username,'Error');

      }
      
  
    });










  }
















}
