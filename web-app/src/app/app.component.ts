import { Component, OnInit } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { User } from './entities/user';
import { LoginService } from './services/login.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'web-app';
  userInfo?: User

  constructor(private loginService : LoginService)
  {

  }


  ngOnInit(): void {

    
    this.loginService.userProfile.subscribe( (data) =>
    {
     
      this.userInfo= data;
    })
  }
 
}

