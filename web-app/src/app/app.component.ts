import { Component, OnInit } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { User } from './entities/user';
import { LoginService } from './services/login.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'web-app';
  userInfo?: User;
  constructor(private router : Router,private toastr : ToastrService,private loginService : LoginService)
  {

  }


  ngOnInit(): void {

    this.loginService.refreshUser().subscribe({next : (data:any) =>{

      this.userInfo = data;
      this.loginService.userProfile.next(data);
    },
  error : ()=>{
  
    this.router.navigate(["/login"]);
  }})
    
    this.loginService.userProfile.subscribe( (data) =>
    {
     
      this.userInfo= data;
    })
  }

  
 
}

