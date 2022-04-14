import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/user';
import { LoginService } from 'src/app/services/login.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  userInfo?: User;
  constructor(private loginService : LoginService) { }

 



  ngOnInit(): void {
    
    this.loginService.userProfile.subscribe((data) =>
    {

    this.userInfo = data;
    

   })
    
  }



}
