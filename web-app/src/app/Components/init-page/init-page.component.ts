import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/entities/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-init-page',
  templateUrl: './init-page.component.html',
  styleUrls: ['./init-page.component.css']
})
export class InitPageComponent implements OnInit {

  constructor(private loginService : LoginService,private router : Router) { }
  user? : User;
  ngOnInit(): void {
    this.loginService.userProfile.subscribe(data => this.user=data)
  }

  logout()
  {
    localStorage.removeItem("token");
    //this.loginService.switchData(new User('invalid','invalid','invalid','invalid','invalid','invalid',new Date(),'invalid','invalid',false));
    window.location.reload();
   // this.router.navigate(['login']);
    

  }


}
